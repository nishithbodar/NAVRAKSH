import React, { useState } from 'react';
import { AlgorithmResultCard } from './AlgorithmResultCard.tsx';

export const TopKSalesIntelligence: React.FC = () => {
  const [kVal, setKVal] = useState<number>(5);
  const [datasetSize, setDatasetSize] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(false);
  const [topKData, setTopKData] = useState<any | null>(null);

  const runTopKComparison = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/top-k/compare?k=${kVal}&dataset_size=${datasetSize}`);
      if (res.ok) {
        const json = await res.json();
        setTopKData(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    runTopKComparison();
  }, [kVal, datasetSize]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border border-outline-variant/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                DAA SELECTION ALGORITHMS
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Order Statistics & Top-K Retrieval
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Top-K Sales Intelligence & High-Value Attendee Selection
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
              Compare 4 fundamental selection paradigms: Full Sorting, Min-Heap of size K,
              Quickselect (Hoare), and Deterministic Median of Medians (BFPRT).
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">K Elements</label>
              <select
                value={kVal}
                onChange={e => setKVal(parseInt(e.target.value))}
                className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface font-mono text-xs"
              >
                <option value={5}>K = 5</option>
                <option value={10}>K = 10</option>
                <option value={20}>K = 20</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">Dataset Size</label>
              <select
                value={datasetSize}
                onChange={e => setDatasetSize(parseInt(e.target.value))}
                className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface font-mono text-xs"
              >
                <option value={500}>500 Records</option>
                <option value={1000}>1,000 Records</option>
                <option value={5000}>5,000 Records</option>
                <option value={20000}>20,000 Records</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-on-surface-variant space-y-2">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono">Running Top-K Selection Solvers...</p>
        </div>
      ) : topKData ? (
        <div className="space-y-6">
          {/* Comparison Table */}
          <div className="rounded-xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-md">
            <div className="px-5 py-3.5 bg-surface-container-high border-b border-outline-variant/20 flex items-center justify-between">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Selection Paradigm Performance (N = {datasetSize.toLocaleString()}, K = {kVal})
              </h3>
              <span className="text-xs font-mono text-on-surface-variant">Live Comparison</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-surface-container-highest/50 text-on-surface-variant border-b border-outline-variant/20 uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Paradigm</th>
                    <th className="px-4 py-3">Time (ms)</th>
                    <th className="px-4 py-3">Comparisons</th>
                    <th className="px-4 py-3">Time Complexity</th>
                    <th className="px-4 py-3">Space Complexity</th>
                    <th className="px-4 py-3">Top Value Selected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15 text-on-surface">
                  {topKData.comparison.map((r: any, idx: number) => (
                    <tr key={idx} className="hover:bg-surface-container-high/50">
                      <td className="px-4 py-3 font-semibold text-primary">{r.algorithm}</td>
                      <td className="px-4 py-3 font-bold text-on-surface">{r.execution_time_ms} ms</td>
                      <td className="px-4 py-3 text-on-surface-variant">{r.comparisons.toLocaleString()}</td>
                      <td className="px-4 py-3 text-tertiary font-bold">{r.time_complexity}</td>
                      <td className="px-4 py-3 text-secondary">{r.space_complexity}</td>
                      <td className="px-4 py-3 text-emerald-400 font-bold">
                        {r.top_k_values ? r.top_k_values[0]?.toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {topKData.comparison.map((r: any, idx: number) => (
              <AlgorithmResultCard
                key={idx}
                algorithmName={r.algorithm}
                paradigm="Selection"
                executionTimeMs={r.execution_time_ms}
                timeComplexity={r.time_complexity}
                spaceComplexity={r.space_complexity}
                comparisons={r.comparisons}
                isOptimal={true}
                solutionSummary={
                  <div className="font-mono text-xs">
                    Top-{kVal} Scores:
                    <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-on-surface-variant">
                      {r.top_k_values?.slice(0, 5).map((v: number, i: number) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/20">
                          {v.toLocaleString()}
                        </span>
                      ))}
                    </div>
                  </div>
                }
                tags={['TopK', r.algorithm.split(' ')[0]]}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
