import React, { useState } from 'react';

const PRESET_RECURRENCES = [
  { label: 'Merge Sort / Karatsuba Half', expr: 'T(n) = 2T(n/2) + n' },
  { label: 'Binary Search (Work per level)', expr: 'T(n) = T(n/2) + 1' },
  { label: 'Karatsuba Large Integer', expr: 'T(n) = 3T(n/2) + n' },
  { label: 'Strassen Matrix Mult', expr: 'T(n) = 7T(n/2) + n^2' },
  { label: 'Standard 2x2 Matrix Mult', expr: 'T(n) = 8T(n/2) + n^2' },
  { label: 'Selection / Insertion Sort Worst', expr: 'T(n) = T(n-1) + n' },
  { label: 'Linear Search Recursive', expr: 'T(n) = T(n-1) + 1' },
  { label: 'Towers of Hanoi', expr: 'T(n) = 2T(n-1) + 1' },
];

export const ComplexityAnalyzer: React.FC = () => {
  const [expression, setExpression] = useState<string>('T(n) = 2T(n/2) + n');
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (exprToRun?: string) => {
    const expr = exprToRun || expression;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/complexity/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: expr }),
      });
      if (res.ok) {
        const json = await res.json();
        setAnalysis(json.data);
      } else {
        setError('Failed to analyze recurrence. Please verify format.');
      }
    } catch (e: any) {
      setError(e.message || 'Error connecting to complexity analyzer endpoint.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    analyze();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border border-outline-variant/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                DAA RECURRENCE ENGINE
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Master Method & Recursion Tree Solver
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Asymptotic Complexity & Recurrence Analyzer
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
              Parse and solve Divide-and-Conquer and Subtract-and-Conquer recurrence relations.
              Calculates critical parameters, identifies Master Theorem cases, and constructs recursion tree metrics.
            </p>
          </div>
        </div>

        {/* Input Bar */}
        <div className="mt-6 pt-5 border-t border-outline-variant/20 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={expression}
            onChange={e => setExpression(e.target.value)}
            placeholder="e.g. T(n) = 2T(n/2) + n"
            className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm font-mono focus:outline-none focus:border-primary"
          />
          <button
            onClick={() => analyze()}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-medium text-sm transition-all shadow flex items-center justify-center gap-2"
          >
            {loading ? 'Solving...' : 'Analyze Recurrence'}
          </button>
        </div>

        {/* Presets */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-on-surface-variant font-mono">Quick Presets:</span>
          {PRESET_RECURRENCES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setExpression(p.expr);
                analyze(p.expr);
              }}
              className="text-xs px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-highest text-on-surface font-mono border border-outline-variant/20 transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Output */}
      {error && (
        <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error text-xs font-mono">
          {error}
        </div>
      )}

      {analysis && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Asymptotic Result */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-4">
                <div>
                  <span className="text-xs text-on-surface-variant font-mono uppercase block">
                    Mathematical Formulation
                  </span>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface font-mono">
                    {analysis.expression}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-on-surface-variant font-mono uppercase block">
                    Asymptotic Bound
                  </span>
                  <span className="font-headline-sm text-headline-sm font-extrabold text-primary font-mono">
                    {analysis.asymptotic_complexity}
                  </span>
                </div>
              </div>

              {/* Step by Step Explanation */}
              <div className="space-y-4 text-xs font-mono text-on-surface leading-relaxed">
                <div className="p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <span className="font-bold text-tertiary block mb-1">
                    Theorem Classification & Case:
                  </span>
                  <p className="text-on-surface-variant">{analysis.explanation}</p>
                </div>

                {/* Master Method Parameters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] text-on-surface-variant uppercase block">Subproblems (a)</span>
                    <span className="font-bold text-sm text-on-surface">{analysis.a}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] text-on-surface-variant uppercase block">Division Factor (b)</span>
                    <span className="font-bold text-sm text-on-surface">{analysis.b}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] text-on-surface-variant uppercase block">Split Work f(n)</span>
                    <span className="font-bold text-sm text-amber-300">{analysis.fn}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] text-on-surface-variant uppercase block">Critical Log_b(a)</span>
                    <span className="font-bold text-sm text-emerald-400">
                      {analysis.log_b_a !== undefined ? analysis.log_b_a : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recursion Tree Breakdown */}
            <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 space-y-4 shadow-md font-mono text-xs">
              <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
                Recursion Tree Geometry & Work Distribution
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Tree Depth</span>
                  <span className="font-bold text-secondary text-sm">{analysis.recursion_tree_depth}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Leaves Work</span>
                  <span className="font-bold text-primary text-sm">{analysis.work_at_leaves}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Total Leaves Count</span>
                  <span className="font-bold text-tertiary text-sm">{analysis.total_leaves || '1'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Sidebar */}
          <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 space-y-4 shadow-md text-xs font-mono">
            <h4 className="font-title-sm text-title-sm font-bold text-on-surface">
              Master Theorem Reference
            </h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              For recurrences of the form:
              <br />
              <span className="text-primary font-bold">T(n) = a·T(n/b) + f(n)</span>
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant/20">
                <span className="font-bold text-emerald-400 block mb-0.5">Case 1 (Leaf Dominant):</span>
                <span className="text-[11px] text-on-surface-variant">
                  If f(n) = O(n^(log_b a - ε)) then T(n) = Θ(n^(log_b a)).
                </span>
              </div>
              <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant/20">
                <span className="font-bold text-amber-300 block mb-0.5">Case 2 (Balanced Work):</span>
                <span className="text-[11px] text-on-surface-variant">
                  If f(n) = Θ(n^(log_b a)) then T(n) = Θ(n^(log_b a) · log n).
                </span>
              </div>
              <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant/20">
                <span className="font-bold text-cyan-400 block mb-0.5">Case 3 (Root Dominant):</span>
                <span className="text-[11px] text-on-surface-variant">
                  If f(n) = Ω(n^(log_b a + ε)) then T(n) = Θ(f(n)).
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
