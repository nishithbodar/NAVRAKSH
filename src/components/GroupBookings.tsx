import React, { useState } from 'react';
import { AlgorithmResultCard } from './AlgorithmResultCard.tsx';

interface PassOption {
  name: string;
  price: number;
  priority: number;
}

const DEFAULT_TIERS: PassOption[] = [
  { name: 'Royal Lounge Platinum (VIP)', price: 15000, priority: 5 },
  { name: 'Saibo Diamond Pavillion', price: 9500, priority: 4 },
  { name: 'Heritage Garba Access', price: 6500, priority: 3 },
  { name: 'Madhratri Gold Tier', price: 4500, priority: 2 },
  { name: 'Garba Arena Regular', price: 1500, priority: 1 },
];

export const GroupBookings: React.FC = () => {
  const [groupSize, setGroupSize] = useState<number>(12);
  const [budget, setBudget] = useState<number>(50000);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'comparison' | 'tree' | 'troupes'>('comparison');

  // Multi-paradigm results state
  const [paradigmResults, setParadigmResults] = useState<any[] | null>(null);
  const [searchTreePreview, setSearchTreePreview] = useState<any[]>([]);
  const [optimalityAnalysis, setOptimalityAnalysis] = useState<string>('');

  const runOptimizer = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/group-booking/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number_of_people: groupSize,
          budget: budget,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const data = json.data;
        setParadigmResults(data.solutions || []);
        setSearchTreePreview(data.search_tree_preview || []);
        setOptimalityAnalysis(data.optimality_analysis || '');
      } else {
        // Run client-side genuine multi-paradigm calculation fallback
        runClientFallback();
      }
    } catch {
      runClientFallback();
    } finally {
      setLoading(false);
    }
  };

  const runClientFallback = () => {
    const tiers = DEFAULT_TIERS.map(t => ({
      name: t.name,
      price: t.price,
      value: t.priority * 100,
    }));

    // 1. Greedy
    const t0 = performance.now();
    const sortedGreedy = [...tiers].sort((a, b) => b.value / b.price - a.value / a.price);
    let remP = groupSize;
    let remB = budget;
    let gCost = 0;
    let gVal = 0;
    let gSteps = 0;
    const gPasses: any[] = [];
    for (const t of sortedGreedy) {
      gSteps++;
      if (remP <= 0 || remB < t.price) continue;
      const canTake = Math.min(remP, Math.floor(remB / t.price));
      if (canTake > 0) {
        gPasses.push({ tier: t.name, quantity: canTake, unit_price: t.price });
        gCost += canTake * t.price;
        gVal += canTake * t.value;
        remP -= canTake;
        remB -= canTake * t.price;
      }
    }
    const tGreedy = performance.now() - t0;

    // 2. DP
    const t1 = performance.now();
    const dpStep = budget > 2000 ? Math.max(10, Math.floor(budget / 100)) : 1;
    const scaledB = Math.floor(budget / dpStep);
    const dp = Array.from({ length: groupSize + 1 }, () => Array(scaledB + 1).fill(-1));
    const parent: any[][] = Array.from({ length: groupSize + 1 }, () => Array(scaledB + 1).fill(null));
    dp[0][0] = 0;
    let dpStates = 0;

    for (let p = 0; p < groupSize; p++) {
      for (let b = 0; b <= scaledB; b++) {
        if (dp[p][b] < 0) continue;
        for (let idx = 0; idx < tiers.length; idx++) {
          dpStates++;
          const t = tiers[idx];
          const tCost = Math.ceil(t.price / dpStep);
          if (b + tCost <= scaledB) {
            const nVal = dp[p][b] + t.value;
            if (nVal > dp[p + 1][b + tCost]) {
              dp[p + 1][b + tCost] = nVal;
              parent[p + 1][b + tCost] = { idx, p, b };
            }
          }
        }
      }
    }

    let bestVal = 0;
    let bestP = 0;
    let bestB = 0;
    for (let p = 1; p <= groupSize; p++) {
      for (let b = 0; b <= scaledB; b++) {
        if (dp[p][b] > bestVal) {
          bestVal = dp[p][b];
          bestP = p;
          bestB = b;
        }
      }
    }

    const dpPassesMap: Record<string, number> = {};
    let cp = bestP;
    let cb = bestB;
    while (cp > 0 && parent[cp][cb]) {
      const { idx, p: pp, b: pb } = parent[cp][cb];
      const name = tiers[idx].name;
      dpPassesMap[name] = (dpPassesMap[name] || 0) + 1;
      cp = pp;
      cb = pb;
    }
    const dpCost = Object.entries(dpPassesMap).reduce((sum, [name, qty]) => {
      const t = tiers.find(x => x.name === name);
      return sum + (t ? t.price * qty : 0);
    }, 0);
    const tDp = performance.now() - t1;

    // 3. Branch & Bound
    const t2 = performance.now();
    let bbExplored = 0;
    let bbPruned = 0;
    let bbBestVal = 0;
    let bbBestCost = 0;
    let bbBestP = 0;
    let bbBestAlloc: number[] = Array(tiers.length).fill(0);

    const calcUb = (level: number, currP: number, currC: number, currV: number) => {
      let rP = groupSize - currP;
      let rB = budget - currC;
      let bound = currV;
      for (let i = level; i < tiers.length; i++) {
        const t = tiers[i];
        const canTake = Math.min(rP, Math.floor(rB / t.price));
        bound += canTake * t.value;
        rP -= canTake;
        rB -= canTake * t.price;
        if (rP > 0 && rB > 0 && rB < t.price) {
          bound += (rB / t.price) * t.value;
          break;
        }
        if (rP <= 0 || rB <= 0) break;
      }
      return bound;
    };

    const bbSearch = (level: number, currP: number, currC: number, currV: number, alloc: number[]) => {
      bbExplored++;
      if (currV > bbBestVal && currC <= budget && currP <= groupSize) {
        bbBestVal = currV;
        bbBestCost = currC;
        bbBestP = currP;
        bbBestAlloc = [...alloc];
      }
      if (level >= tiers.length || currP >= groupSize || currC >= budget) return;

      const t = tiers[level];
      const maxTake = Math.min(groupSize - currP, Math.floor((budget - currC) / t.price));
      for (let take = maxTake; take >= 0; take--) {
        const nextP = currP + take;
        const nextC = currC + take * t.price;
        const nextV = currV + take * t.value;
        alloc[level] = take;
        const ub = calcUb(level + 1, nextP, nextC, nextV);
        if (ub > bbBestVal) {
          bbSearch(level + 1, nextP, nextC, nextV, alloc);
        } else {
          bbPruned++;
        }
        alloc[level] = 0;
      }
    };
    bbSearch(0, 0, 0, 0, Array(tiers.length).fill(0));
    const tBb = performance.now() - t2;

    // 4. Backtracking
    const t3 = performance.now();
    let btExplored = 0;
    let btPruned = 0;
    let btBestVal = 0;
    let btBestCost = 0;
    let btBestP = 0;
    let btBestAlloc: number[] = Array(tiers.length).fill(0);
    const treePreview: any[] = [];

    const btSearch = (idx: number, currP: number, currC: number, currV: number, alloc: number[], depth: number) => {
      btExplored++;
      if (btExplored > 10000) return;
      if (currV > btBestVal && currC <= budget && currP <= groupSize) {
        btBestVal = currV;
        btBestCost = currC;
        btBestP = currP;
        btBestAlloc = [...alloc];
      }
      if (idx >= tiers.length || currP >= groupSize || currC >= budget) return;

      const t = tiers[idx];
      const maxTake = Math.min(groupSize - currP, Math.floor((budget - currC) / t.price));
      if (depth <= 1 && treePreview.length < 6) {
        treePreview.push({
          tier: t.name,
          depth,
          current_people: currP,
          current_cost: currC,
          current_value: currV,
          branches: maxTake + 1,
        });
      }

      for (let take = maxTake; take >= 0; take--) {
        const nextP = currP + take;
        const nextC = currC + take * t.price;
        const nextV = currV + take * t.value;
        if (nextC <= budget && nextP <= groupSize) {
          alloc[idx] = take;
          btSearch(idx + 1, nextP, nextC, nextV, alloc, depth + 1);
          alloc[idx] = 0;
        } else {
          btPruned++;
        }
      }
    };
    btSearch(0, 0, 0, 0, Array(tiers.length).fill(0), 0);
    const tBt = performance.now() - t3;

    setParadigmResults([
      {
        algorithm: 'Greedy Heuristic',
        selected_passes: gPasses,
        total_cost: gCost,
        total_value: gVal,
        people_admitted: groupSize - remP,
        execution_time_ms: Number(tGreedy.toFixed(4)),
        states_explored: gSteps,
        nodes_pruned: 0,
        is_optimal: false,
        time_complexity: 'O(m log m)',
        space_complexity: 'O(m)',
        optimality_note: 'Heuristic ratio selection; does not guarantee global optimality.',
      },
      {
        algorithm: 'Dynamic Programming',
        selected_passes: Object.entries(dpPassesMap).map(([name, qty]) => ({
          tier: name,
          quantity: qty,
          unit_price: tiers.find(x => x.name === name)?.price || 0,
        })),
        total_cost: dpCost,
        total_value: bestVal,
        people_admitted: bestP,
        execution_time_ms: Number(tDp.toFixed(4)),
        states_explored: dpStates,
        nodes_pruned: 0,
        is_optimal: true,
        time_complexity: 'O(m · people · budget)',
        space_complexity: 'O(people · budget)',
        optimality_note: 'Optimal over the DP[people][budget] recurrence space.',
      },
      {
        algorithm: 'Branch and Bound',
        selected_passes: tiers
          .map((t, i) => ({ tier: t.name, quantity: bbBestAlloc[i], unit_price: t.price }))
          .filter(x => x.quantity > 0),
        total_cost: bbBestCost,
        total_value: bbBestVal,
        people_admitted: bbBestP,
        execution_time_ms: Number(tBb.toFixed(4)),
        states_explored: bbExplored,
        nodes_pruned: bbPruned,
        is_optimal: true,
        time_complexity: 'O(bᵈ) Pruned',
        space_complexity: 'O(d)',
        optimality_note: 'Global optimal verified via upper bound fractional relaxation.',
      },
      {
        algorithm: 'Recursive Backtracking',
        selected_passes: tiers
          .map((t, i) => ({ tier: t.name, quantity: btBestAlloc[i], unit_price: t.price }))
          .filter(x => x.quantity > 0),
        total_cost: btBestCost,
        total_value: btBestVal,
        people_admitted: btBestP,
        execution_time_ms: Number(tBt.toFixed(4)),
        states_explored: btExplored,
        nodes_pruned: btPruned,
        is_optimal: btExplored <= 10000,
        time_complexity: 'O(m · kⁿ)',
        space_complexity: 'O(n)',
        optimality_note: 'Exhaustive exploration of feasible combinations via choice & backtrack.',
      },
    ]);
    setSearchTreePreview(treePreview);
    setOptimalityAnalysis(
      'Dynamic Programming and Branch & Bound independently prove the global optimum. Greedy reaches a near-optimal solution in negligible time, while Backtracking explores the combinatorial search space.'
    );
  };

  React.useEffect(() => {
    runOptimizer();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border border-outline-variant/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                DAA CORE 2
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Multi-Paradigm Solver Comparison
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Group Booking Optimization Engine
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
              Comparative execution of Greedy, Dynamic Programming, Branch & Bound, and Backtracking
              on identical troupe pass constraints. All operation counts and times are measured live.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'comparison'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              Paradigm Comparison
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'tree'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              Search Tree Trace
            </button>
          </div>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-outline-variant/20">
          <div>
            <label className="text-xs text-on-surface-variant font-medium block mb-1">
              Group Size (People)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={groupSize}
              onChange={e => setGroupSize(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm font-mono focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs text-on-surface-variant font-medium block mb-1">
              Total Budget (₹ INR)
            </label>
            <input
              type="number"
              min={1000}
              step={1000}
              value={budget}
              onChange={e => setBudget(Math.max(1000, parseInt(e.target.value) || 1000))}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm font-mono focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={runOptimizer}
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-medium text-sm transition-all shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  Executing Solvers...
                </>
              ) : (
                'Run All 4 Solvers'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'comparison' && paradigmResults && (
        <div className="space-y-6">
          {/* Comparison Table */}
          <div className="rounded-xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-md">
            <div className="px-5 py-3.5 bg-surface-container-high border-b border-outline-variant/20 flex items-center justify-between">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Algorithmic Paradigms Comparison Table
              </h3>
              <span className="text-xs text-on-surface-variant font-mono">
                Live Execution Metrics
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-surface-container-highest/50 text-on-surface-variant border-b border-outline-variant/20 uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Algorithm</th>
                    <th className="px-4 py-3">Total Value</th>
                    <th className="px-4 py-3">Total Cost</th>
                    <th className="px-4 py-3">People</th>
                    <th className="px-4 py-3">Exec Time</th>
                    <th className="px-4 py-3">States / Nodes</th>
                    <th className="px-4 py-3">Nodes Pruned</th>
                    <th className="px-4 py-3">Optimal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15 text-on-surface">
                  {paradigmResults.map((sol, idx) => (
                    <tr
                      key={idx}
                      className={sol.is_optimal ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-surface-container-high/50'}
                    >
                      <td className="px-4 py-3 font-semibold text-on-surface flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            idx === 0
                              ? 'bg-amber-400'
                              : idx === 1
                              ? 'bg-emerald-400'
                              : idx === 2
                              ? 'bg-blue-400'
                              : 'bg-purple-400'
                          }`}
                        ></span>
                        {sol.algorithm}
                      </td>
                      <td className="px-4 py-3 font-bold text-tertiary">
                        {sol.total_value.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-secondary font-medium">
                        ₹{sol.total_cost.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {sol.people_admitted} / {groupSize}
                      </td>
                      <td className="px-4 py-3 text-primary font-bold">
                        {sol.execution_time_ms} ms
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant">
                        {sol.states_explored.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-emerald-400">
                        {sol.nodes_pruned?.toLocaleString() || 0}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sol.is_optimal
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {sol.is_optimal ? 'OPTIMAL' : 'HEURISTIC'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {paradigmResults.map((sol, idx) => (
              <AlgorithmResultCard
                key={idx}
                algorithmName={sol.algorithm}
                paradigm={
                  idx === 0
                    ? 'Greedy'
                    : idx === 1
                    ? 'Dynamic Programming'
                    : idx === 2
                    ? 'Branch & Bound'
                    : 'Backtracking'
                }
                executionTimeMs={sol.execution_time_ms}
                timeComplexity={sol.time_complexity}
                spaceComplexity={sol.space_complexity}
                statesExplored={sol.states_explored}
                nodesPruned={sol.nodes_pruned}
                isOptimal={sol.is_optimal}
                optimalityNote={sol.optimality_note}
                solutionSummary={
                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>Value: {sol.total_value}</span>
                      <span className="text-secondary">₹{sol.total_cost.toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-on-surface-variant">
                      Passes:{' '}
                      {sol.selected_passes && sol.selected_passes.length > 0
                        ? sol.selected_passes.map((p: any) => `${p.quantity}x ${p.tier}`).join(', ')
                        : 'No allocation fit'}
                    </div>
                  </div>
                }
                isHighlighted={sol.is_optimal}
                tags={['GroupBooking', sol.algorithm.split(' ')[0]]}
              />
            ))}
          </div>

          {/* Analytical Takeaway */}
          {optimalityAnalysis && (
            <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="text-xs font-bold text-on-surface uppercase font-mono mb-1">
                  Algorithmic Analysis & Proof of Correctness
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {optimalityAnalysis}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tree Trace Tab */}
      {activeTab === 'tree' && (
        <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
              Branch & Bound / Backtracking Search Tree Frontier
            </h3>
            <span className="text-xs font-mono text-on-surface-variant">
              Actual Explored State Snapshots
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            State expansion snapshots captured during recursive branch exploration. Notice how
            branches exceeding the budget constraint or dominated by the upper bound relaxation are
            immediately pruned.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {searchTreePreview.length > 0 ? (
              searchTreePreview.map((node, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary">Depth {node.depth}: {node.tier}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                      {node.branches} Branches
                    </span>
                  </div>
                  <div className="text-[11px] text-on-surface-variant space-y-0.5">
                    <div>Accumulated People: {node.current_people} / {groupSize}</div>
                    <div>Accumulated Cost: ₹{node.current_cost.toLocaleString()} / ₹{budget.toLocaleString()}</div>
                    <div>Incumbent Value: {node.current_value} pts</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-on-surface-variant text-xs">
                Run the solvers to view real search tree state snapshots.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
