import React, { useState } from 'react';
import { AlgorithmResultCard } from './AlgorithmResultCard.tsx';

export const ExactVsApproxLab: React.FC = () => {
  const [nItems, setNItems] = useState<number>(16);
  const [capacity, setCapacity] = useState<number>(500);
  const [loading, setLoading] = useState<boolean>(false);
  const [demoData, setDemoData] = useState<any | null>(null);

  const runDemo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/exact-vs-approx?n_items=${nItems}&capacity=${capacity}`);
      if (res.ok) {
        const json = await res.json();
        setDemoData(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    runDemo();
  }, [nItems, capacity]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border border-outline-variant/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                DAA COMPUTATIONAL COMPLEXITY
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                NP-Hard Optimization & Approximation Theory
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Exact vs Approximate Optimization (Combinatorial Explosion)
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
              Observe how exhaustive branch search state space doubles with every added item (2ⁿ exponential
              explosion) versus polynomial-time greedy ratio heuristics.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">
                Items (N): {nItems}
              </label>
              <input
                type="range"
                min={6}
                max={22}
                value={nItems}
                onChange={e => setNItems(parseInt(e.target.value))}
                className="w-32 accent-primary"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">
                Capacity: {capacity}
              </label>
              <input
                type="number"
                min={100}
                step={100}
                value={capacity}
                onChange={e => setCapacity(parseInt(e.target.value) || 100)}
                className="w-24 px-2 py-1 rounded bg-surface-container border border-outline-variant/40 text-on-surface font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-on-surface-variant space-y-2">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono">Evaluating exponential state space...</p>
        </div>
      ) : demoData ? (
        <div className="space-y-6">
          {/* Combinatorial Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl p-5 bg-surface-container border border-outline-variant/30 text-center font-mono">
              <span className="text-xs text-on-surface-variant uppercase block">Theoretical Search Space</span>
              <span className="text-2xl font-extrabold text-primary block my-1">
                2^{demoData.n_items} = {demoData.total_theoretical_states.toLocaleString()}
              </span>
              <span className="text-[11px] text-on-surface-variant">Exponential subsets</span>
            </div>

            <div className="rounded-xl p-5 bg-surface-container border border-outline-variant/30 text-center font-mono">
              <span className="text-xs text-on-surface-variant uppercase block">Exact States Evaluated</span>
              <span className="text-2xl font-extrabold text-amber-300 block my-1">
                {demoData.exact_algorithm.states_explored.toLocaleString()}
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Execution time: {demoData.exact_algorithm.execution_time_ms} ms
              </span>
            </div>

            <div className="rounded-xl p-5 bg-surface-container border border-outline-variant/30 text-center font-mono">
              <span className="text-xs text-on-surface-variant uppercase block">Greedy Solution Quality</span>
              <span className="text-2xl font-extrabold text-emerald-400 block my-1">
                {demoData.greedy_heuristic.solution_quality_percent}%
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Completed in {demoData.greedy_heuristic.execution_time_ms} ms
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlgorithmResultCard
              algorithmName="Exact Combinatorial Search (0-1 Knapsack)"
              paradigm="Exhaustive Branching / Backtracking"
              executionTimeMs={demoData.exact_algorithm.execution_time_ms}
              timeComplexity="O(2ⁿ) Exponential"
              spaceComplexity="O(n)"
              statesExplored={demoData.exact_algorithm.states_explored}
              isOptimal={true}
              optimalityNote="Finds the exact maximum revenue allocation at exponential computational cost."
              solutionSummary={`Optimal Revenue: ₹${demoData.exact_algorithm.optimal_value.toLocaleString()}`}
              tags={['Exact', 'NP-Hard', 'Exponential']}
              isHighlighted={true}
            />

            <AlgorithmResultCard
              algorithmName="Value-to-Weight Greedy Heuristic"
              paradigm="Polynomial-Time Heuristic"
              executionTimeMs={demoData.greedy_heuristic.execution_time_ms}
              timeComplexity="O(n log n) Polynomial"
              spaceComplexity="O(1)"
              statesExplored={demoData.greedy_heuristic.states_explored}
              isOptimal={false}
              optimalityNote="Fast polynomial approximation; trades optimality for sub-millisecond execution."
              solutionSummary={`Achieved Value: ₹${demoData.greedy_heuristic.achieved_value.toLocaleString()} (${demoData.greedy_heuristic.solution_quality_percent}% of optimal)`}
              tags={['Greedy', 'Approximation', 'Polynomial']}
            />
          </div>

          {/* Explanation Box */}
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex items-start gap-3">
            <span className="text-xl">📊</span>
            <div>
              <h4 className="text-xs font-bold text-on-surface uppercase font-mono mb-1">
                Why Approximation is Essential for Large-Scale Navratri Passes
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-mono">
                {demoData.analysis}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
