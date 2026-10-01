import React, { useState } from 'react';
import { AlgorithmResultCard } from './AlgorithmResultCard.tsx';

interface CategoryOption {
  id: string;
  name: string;
  algorithms: string[];
}

const CATEGORIES: CategoryOption[] = [
  { id: 'sorting', name: 'Sorting', algorithms: ['quick_sort', 'merge_sort', 'heap_sort'] },
  { id: 'searching', name: 'Searching & Lookup', algorithms: ['linear_search', 'binary_search', 'red_black_tree', 'hash_table'] },
  { id: 'heaps', name: 'Priority Heaps', algorithms: ['binary_heap', 'binomial_heap', 'fibonacci_heap'] },
  { id: 'trees', name: 'Balanced Trees', algorithms: ['red_black_tree', 'interval_tree'] },
  { id: 'dynamic_programming', name: 'Dynamic Programming', algorithms: ['bounded_knapsack', 'lcs', 'matrix_chain'] },
  { id: 'greedy', name: 'Greedy Heuristics', algorithms: ['greedy_allocation', 'fractional_knapsack'] },
  { id: 'branch_bound', name: 'Branch & Bound', algorithms: ['branch_and_bound_allocation'] },
  { id: 'backtracking', name: 'Backtracking', algorithms: ['pass_combinations'] },
  { id: 'divide_and_conquer', name: 'Divide & Conquer', algorithms: ['merge_sort', 'karatsuba', 'fast_exponentiation'] },
];

const DATASET_SIZES = [100, 500, 1000, 5000, 10000, 50000];

export const BenchmarkLab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('sorting');
  const [selectedSize, setSelectedSize] = useState<number>(1000);
  const [datasetType, setDatasetType] = useState<string>('random');
  const [loading, setLoading] = useState<boolean>(false);
  const [benchmarkResults, setBenchmarkResults] = useState<any[]>([]);
  const [multiSizeResults, setMultiSizeResults] = useState<any[]>([]);
  const [mode, setMode] = useState<'single' | 'multi'>('single');

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  const runBenchmark = async () => {
    setLoading(true);
    try {
      const payload: any = {
        algorithm_category: selectedCategory,
        algorithms: currentCategory.algorithms,
        dataset_type: datasetType,
      };

      if (mode === 'single') {
        payload.dataset_size = selectedSize;
      } else {
        // Multi-size curve
        const curveSizes = selectedCategory === 'backtracking' || selectedCategory === 'branch_bound'
          ? [5, 10, 15, 20]
          : [100, 500, 1000, 5000];
        payload.input_sizes = curveSizes;
      }

      const res = await fetch('/api/benchmark/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        const results = json.data?.results || [];
        if (mode === 'single') {
          setBenchmarkResults(results);
        } else {
          setMultiSizeResults(results);
        }
      }
    } catch (e) {
      console.error('Benchmark fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    runBenchmark();
  }, [selectedCategory, selectedSize, datasetType, mode]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border border-outline-variant/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                DAA BENCHMARK LAB
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Real-Time Execution & Complexity Profiler
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Empirical Complexity & Performance Engine
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
              Benchmark real execution times, memory footprints, comparisons, swaps, and state counts
              across all syllabus algorithmic paradigms. No simulated numbers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'single'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              Fixed Size Profiler
            </button>
            <button
              onClick={() => setMode('multi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'multi'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              Input Size vs Time Curve
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-outline-variant/20">
          <div>
            <label className="text-xs text-on-surface-variant font-medium block mb-1">
              Algorithmic Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm font-mono focus:outline-none focus:border-primary"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {mode === 'single' ? (
            <div>
              <label className="text-xs text-on-surface-variant font-medium block mb-1">
                Dataset Size (N Elements)
              </label>
              <select
                value={selectedSize}
                onChange={e => setSelectedSize(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm font-mono focus:outline-none focus:border-primary"
              >
                {DATASET_SIZES.map(s => (
                  <option key={s} value={s}>
                    {s.toLocaleString()} items
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-xs text-on-surface-variant font-medium block mb-1">
                Scaling Range
              </label>
              <div className="text-xs font-mono py-2 text-primary font-bold">
                100 → 500 → 1,000 → 5,000
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-on-surface-variant font-medium block mb-1">
              Data Distribution
            </label>
            <select
              value={datasetType}
              onChange={e => setDatasetType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm font-mono focus:outline-none focus:border-primary"
            >
              <option value="random">Random Uniform</option>
              <option value="sorted">Already Sorted (Best Case)</option>
              <option value="reverse_sorted">Reverse Sorted (Worst Case)</option>
              <option value="nearly_sorted">Nearly Sorted (5% Displaced)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Rendering */}
      {loading ? (
        <div className="py-16 text-center text-on-surface-variant space-y-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono">Running genuine benchmark profiler in backend...</p>
        </div>
      ) : mode === 'single' ? (
        <div className="space-y-6">
          {/* Comparative Table */}
          <div className="rounded-xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-md">
            <div className="px-5 py-3.5 bg-surface-container-high border-b border-outline-variant/20 flex items-center justify-between">
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Empirical Measurements ({selectedCategory.replace('_', ' ').toUpperCase()} · N = {selectedSize.toLocaleString()})
              </h3>
              <span className="text-xs text-on-surface-variant font-mono">
                Distribution: {datasetType}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-surface-container-highest/50 text-on-surface-variant border-b border-outline-variant/20 uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Algorithm</th>
                    <th className="px-4 py-3">Exec Time (ms)</th>
                    <th className="px-4 py-3">Comparisons</th>
                    <th className="px-4 py-3">Swaps / Rotations</th>
                    <th className="px-4 py-3">Estimated Memory</th>
                    <th className="px-4 py-3">Time Complexity</th>
                    <th className="px-4 py-3">Space Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15 text-on-surface">
                  {benchmarkResults.map((r, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-high/50">
                      <td className="px-4 py-3 font-semibold text-primary">{r.algorithm}</td>
                      <td className="px-4 py-3 font-bold text-on-surface">{r.execution_time_ms} ms</td>
                      <td className="px-4 py-3 text-on-surface-variant">{r.comparisons.toLocaleString()}</td>
                      <td className="px-4 py-3 text-cyan-400">{r.swaps_or_rotations?.toLocaleString() || 0}</td>
                      <td className="px-4 py-3 text-secondary">{r.memory_estimate}</td>
                      <td className="px-4 py-3 text-tertiary font-bold">{r.time_complexity}</td>
                      <td className="px-4 py-3 text-on-surface-variant">{r.space_complexity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {benchmarkResults.map((r, idx) => (
              <AlgorithmResultCard
                key={idx}
                algorithmName={r.algorithm}
                paradigm={selectedCategory.replace('_', ' ')}
                executionTimeMs={r.execution_time_ms}
                timeComplexity={r.time_complexity}
                spaceComplexity={r.space_complexity}
                comparisons={r.comparisons}
                swapsOrRotations={r.swaps_or_rotations}
                statesExplored={r.states_explored}
                nodesPruned={r.nodes_pruned}
                isOptimal={true}
                solutionSummary={
                  <div className="flex justify-between text-xs">
                    <span>Memory: {r.memory_estimate}</span>
                    <span className="text-primary font-bold">N = {r.dataset_size}</span>
                  </div>
                }
                tags={[selectedCategory, 'Empirical']}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Multi-Size Scaling Curve Visualization */
        <div className="rounded-xl bg-surface-container border border-outline-variant/30 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
              Input Size vs Execution Time Scaling
            </h3>
            <span className="text-xs font-mono text-on-surface-variant">
              Asymptotic Growth Curve
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {multiSizeResults.map((r, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary text-xs">{r.algorithm}</span>
                  <span className="text-xs font-mono font-bold text-secondary">
                    N = {r.dataset_size.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Time:</span>
                    <span className="font-bold text-amber-300">{r.execution_time_ms} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Comparisons:</span>
                    <span>{r.comparisons.toLocaleString()}</span>
                  </div>
                  {/* Visual Bar Indicator */}
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(5, (r.execution_time_ms / 10) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
