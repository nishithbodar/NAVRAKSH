import React, { useState } from 'react';
import { AlgorithmResultCard } from './AlgorithmResultCard.tsx';

export const HeapComparisonLab: React.FC = () => {
  const [opsCount, setOpsCount] = useState<number>(500);
  const [loading, setLoading] = useState<boolean>(false);
  const [heapData, setHeapData] = useState<any | null>(null);

  const runHeapBenchmark = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/algorithms/heaps/compare?operations_count=${opsCount}`);
      if (res.ok) {
        const json = await res.json();
        setHeapData(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    runHeapBenchmark();
  }, [opsCount]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border border-outline-variant/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                DAA DATA STRUCTURES LAB
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Advanced Heap Architectures
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Priority Heap Benchmark: Binary vs Binomial vs Fibonacci
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
              Compare asymptotic and empirical performance across Binary Heap (flat array), Binomial Heap
              (forest of binomial trees), and Fibonacci Heap (lazy amortized O(1) insertion & merge).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-mono text-on-surface-variant">Operations:</label>
            <select
              value={opsCount}
              onChange={e => setOpsCount(parseInt(e.target.value))}
              className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface font-mono text-xs"
            >
              <option value={100}>100 Ops</option>
              <option value={500}>500 Ops</option>
              <option value={1000}>1,000 Ops</option>
              <option value={2000}>2,000 Ops</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {loading ? (
        <div className="py-16 text-center text-on-surface-variant space-y-2">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono">Executing priority heap operations...</p>
        </div>
      ) : heapData ? (
        <div className="space-y-6">
          <div className="rounded-xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-md">
            <div className="px-5 py-3.5 bg-surface-container-high border-b border-outline-variant/20 flex items-center justify-between">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Heap Architecture Asymptotic & Empirical Comparison
              </h3>
              <span className="text-xs font-mono text-on-surface-variant">
                Ops Count: {heapData.operations_count}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-surface-container-highest/50 text-on-surface-variant border-b border-outline-variant/20 uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Heap Structure</th>
                    <th className="px-4 py-3">Exec Time</th>
                    <th className="px-4 py-3">Comparisons</th>
                    <th className="px-4 py-3">Swaps / Merges</th>
                    <th className="px-4 py-3">Insert Complexity</th>
                    <th className="px-4 py-3">Extract-Min Complexity</th>
                    <th className="px-4 py-3">Merge / Union</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15 text-on-surface">
                  {heapData.results.map((r: any, idx: number) => (
                    <tr key={idx} className="hover:bg-surface-container-high/50">
                      <td className="px-4 py-3 font-semibold text-primary">{r.heap_type}</td>
                      <td className="px-4 py-3 font-bold text-on-surface">{r.execution_time_ms} ms</td>
                      <td className="px-4 py-3 text-on-surface-variant">{r.comparisons.toLocaleString()}</td>
                      <td className="px-4 py-3 text-cyan-400">{r.swaps_or_consolidations?.toLocaleString() || 0}</td>
                      <td className="px-4 py-3 text-secondary font-medium">{r.insert_complexity}</td>
                      <td className="px-4 py-3 text-tertiary font-medium">{r.extract_min_complexity}</td>
                      <td className="px-4 py-3 text-emerald-400 font-bold">{r.merge_complexity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {heapData.results.map((r: any, idx: number) => (
              <AlgorithmResultCard
                key={idx}
                algorithmName={r.heap_type}
                paradigm="Priority Queue"
                executionTimeMs={r.execution_time_ms}
                timeComplexity={`Insert ${r.insert_complexity}, Extract ${r.extract_min_complexity}`}
                spaceComplexity="O(n)"
                comparisons={r.comparisons}
                swapsOrRotations={r.swaps_or_consolidations}
                isOptimal={true}
                solutionSummary={
                  <div className="text-xs">
                    <span className="text-on-surface-variant block font-mono text-[10px] uppercase">
                      Navratri Pass Application
                    </span>
                    <span className="font-semibold text-on-surface">{r.use_case}</span>
                  </div>
                }
                tags={['Heap', r.heap_type.split(' ')[0]]}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
