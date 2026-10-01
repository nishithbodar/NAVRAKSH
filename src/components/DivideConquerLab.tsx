import React, { useState } from 'react';
import { AlgorithmResultCard } from './AlgorithmResultCard.tsx';

export const DivideConquerLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'karatsuba' | 'exponentiation' | 'strassen' | 'sorting'>('karatsuba');

  // Karatsuba State
  const [numA, setNumA] = useState<string>('9876543210987654');
  const [numB, setNumB] = useState<string>('1234567890123456');
  const [karatsubaResult, setKaratsubaResult] = useState<any | null>(null);
  const [loadingKarat, setLoadingKarat] = useState<boolean>(false);

  // Exponentiation State
  const [base, setBase] = useState<number>(7);
  const [exp, setExp] = useState<number>(256);
  const [modulus, setModulus] = useState<number>(1000000007);
  const [expResult, setExpResult] = useState<any | null>(null);
  const [loadingExp, setLoadingExp] = useState<boolean>(false);

  // Strassen State
  const [matrixDim, setMatrixDim] = useState<number>(4);
  const [strassenResult, setStrassenResult] = useState<any | null>(null);
  const [loadingStrassen, setLoadingStrassen] = useState<boolean>(false);

  // Sorting State
  const [sortSize, setSortSize] = useState<number>(1000);
  const [sortResult, setSortResult] = useState<any | null>(null);
  const [loadingSort, setLoadingSort] = useState<boolean>(false);

  // Run Karatsuba
  const runKaratsuba = async () => {
    setLoadingKarat(true);
    try {
      const res = await fetch('/api/algorithms/karatsuba', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number_a: parseInt(numA) || 1, number_b: parseInt(numB) || 1 }),
      });
      if (res.ok) {
        const json = await res.json();
        setKaratsubaResult(json.data);
      }
    } finally {
      setLoadingKarat(false);
    }
  };

  // Run Exponentiation
  const runExponentiation = async () => {
    setLoadingExp(true);
    try {
      const res = await fetch('/api/algorithms/exponentiation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base, exponent: exp, modulus: modulus || undefined }),
      });
      if (res.ok) {
        const json = await res.json();
        setExpResult(json.data);
      }
    } finally {
      setLoadingExp(false);
    }
  };

  // Run Strassen
  const runStrassen = async () => {
    setLoadingStrassen(true);
    try {
      const n = matrixDim;
      const A = Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1));
      const B = Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1));

      const res = await fetch('/api/algorithms/strassen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrix_a: A, matrix_b: B }),
      });
      if (res.ok) {
        const json = await res.json();
        setStrassenResult(json.data);
      }
    } finally {
      setLoadingStrassen(false);
    }
  };

  // Run Sorting
  const runSort = async () => {
    setLoadingSort(true);
    try {
      const res = await fetch('/api/benchmark/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          algorithm_category: 'sorting',
          algorithms: ['quick_sort', 'merge_sort'],
          dataset_size: sortSize,
          dataset_type: 'random',
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setSortResult(json.data?.results || []);
      }
    } finally {
      setLoadingSort(false);
    }
  };

  React.useEffect(() => {
    runKaratsuba();
    runExponentiation();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border border-outline-variant/30 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                DAA LAB MODULE
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Divide & Conquer Paradigm
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Divide & Conquer Algorithmic Suite
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
              Deconstruct problems into independent subproblems, solve recursively, and recombine.
              Demonstrates Karatsuba Multiplication, Strassen Matrix Multiplication, Binary Exponentiation,
              and Merge Sort.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'karatsuba', label: 'Karatsuba Int' },
              { id: 'exponentiation', label: 'Fast Exponentiation' },
              { id: 'strassen', label: 'Strassen Matrix' },
              { id: 'sorting', label: 'Merge vs Quick Sort' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KARATSUBA SUB-LAB */}
      {activeTab === 'karatsuba' && (
        <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 space-y-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Karatsuba Fast Large Integer Multiplication
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Reduces standard 4 multiplications to 3 recursive multiplications via algebraic formulation:
                (a+b)(c+d) - ac - bd.
              </p>
            </div>
            <span className="text-xs font-mono text-primary font-bold">O(n^1.585) vs O(n²)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">
                Multiplicand A (Arbitrary Precision)
              </label>
              <input
                type="text"
                value={numA}
                onChange={e => setNumA(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">
                Multiplicand B (Arbitrary Precision)
              </label>
              <input
                type="text"
                value={numB}
                onChange={e => setNumB(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono text-sm"
              />
            </div>
          </div>

          <button
            onClick={runKaratsuba}
            disabled={loadingKarat}
            className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-medium text-xs shadow"
          >
            {loadingKarat ? 'Multiplying...' : 'Execute Karatsuba Multiplication'}
          </button>

          {karatsubaResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
              <AlgorithmResultCard
                algorithmName="Karatsuba Multiplication"
                paradigm="Divide and Conquer"
                executionTimeMs={karatsubaResult.karatsuba_time_ms}
                timeComplexity="O(n^log₂3) ≈ O(n^1.585)"
                spaceComplexity="O(n)"
                statesExplored={karatsubaResult.karatsuba_recursive_calls}
                isOptimal={true}
                solutionSummary={
                  <div className="font-mono text-xs break-all">
                    Product: {karatsubaResult.karatsuba_result}
                  </div>
                }
                tags={['Karatsuba', 'LargeInt']}
              />

              <AlgorithmResultCard
                algorithmName="Traditional Multiplication"
                paradigm="Naive Schoolbook"
                executionTimeMs={karatsubaResult.traditional_time_ms}
                timeComplexity="O(n²)"
                spaceComplexity="O(1)"
                isOptimal={false}
                solutionSummary={
                  <div className="font-mono text-xs break-all">
                    Digits: {karatsubaResult.number_a_digits} × {karatsubaResult.number_b_digits}
                  </div>
                }
                tags={['Schoolbook', 'O(n^2)']}
              />
            </div>
          )}
        </div>
      )}

      {/* FAST EXPONENTIATION SUB-LAB */}
      {activeTab === 'exponentiation' && (
        <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 space-y-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Fast Exponentiation by Squaring
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Computes base^exp in O(log n) multiplications instead of O(n) linear steps.
              </p>
            </div>
            <span className="text-xs font-mono text-tertiary font-bold">O(log n) vs O(n)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">Base (x)</label>
              <input
                type="number"
                value={base}
                onChange={e => setBase(parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">Exponent (n)</label>
              <input
                type="number"
                value={exp}
                onChange={e => setExp(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">Modulus (m, optional)</label>
              <input
                type="number"
                value={modulus}
                onChange={e => setModulus(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono text-sm"
              />
            </div>
          </div>

          <button
            onClick={runExponentiation}
            disabled={loadingExp}
            className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-medium text-xs shadow"
          >
            {loadingExp ? 'Calculating...' : 'Compute Power by Squaring'}
          </button>

          {expResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
              <AlgorithmResultCard
                algorithmName="Fast Exponentiation (Squaring)"
                paradigm="Divide and Conquer / Binary"
                executionTimeMs={expResult.fast_time_ms}
                timeComplexity="O(log n)"
                spaceComplexity="O(1)"
                comparisons={expResult.fast_multiplications}
                isOptimal={true}
                solutionSummary={
                  <div className="font-mono text-xs">
                    Multiplications: {expResult.fast_multiplications} ops
                    <br />
                    Result: {expResult.fast_result}
                  </div>
                }
                tags={['BinaryExponentiation', 'O(log n)']}
              />

              <AlgorithmResultCard
                algorithmName="Naive Linear Exponentiation"
                paradigm="Brute Force Iteration"
                executionTimeMs={expResult.naive_time_ms}
                timeComplexity="O(n)"
                spaceComplexity="O(1)"
                comparisons={expResult.naive_multiplications}
                isOptimal={false}
                solutionSummary={
                  <div className="font-mono text-xs">
                    Multiplications: {expResult.naive_multiplications} ops
                    <br />
                    Result: {expResult.naive_result}
                  </div>
                }
                tags={['LinearPower', 'O(n)']}
              />
            </div>
          )}
        </div>
      )}

      {/* STRASSEN SUB-LAB */}
      {activeTab === 'strassen' && (
        <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 space-y-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Strassen Sub-Cubic Matrix Multiplication
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Reduces 8 recursive submatrix multiplications to 7 using Strassen identities.
              </p>
            </div>
            <span className="text-xs font-mono text-primary font-bold">O(n^2.807) vs O(n³)</span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">
                Matrix Dimension (2ⁿ x 2ⁿ)
              </label>
              <select
                value={matrixDim}
                onChange={e => setMatrixDim(parseInt(e.target.value))}
                className="px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono text-sm"
              >
                <option value={2}>2 × 2 Matrix</option>
                <option value={4}>4 × 4 Matrix</option>
                <option value={8}>8 × 8 Matrix</option>
                <option value={16}>16 × 16 Matrix</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={runStrassen}
                disabled={loadingStrassen}
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-medium text-xs shadow"
              >
                {loadingStrassen ? 'Computing...' : 'Run Strassen vs Naive Mult'}
              </button>
            </div>
          </div>

          {strassenResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
              <AlgorithmResultCard
                algorithmName="Strassen 7-Product Mult"
                paradigm="Divide and Conquer"
                executionTimeMs={strassenResult.strassen_time_ms}
                timeComplexity="O(n^log₂7) ≈ O(n^2.807)"
                spaceComplexity="O(n²)"
                comparisons={strassenResult.strassen_multiplications}
                isOptimal={true}
                solutionSummary={
                  <div className="font-mono text-xs">
                    Dimension: {strassenResult.matrix_size}
                    <br />
                    Scalar Multiplications: {strassenResult.strassen_multiplications}
                  </div>
                }
                tags={['Strassen', 'SubCubic']}
              />

              <AlgorithmResultCard
                algorithmName="Naive Matrix Multiplication"
                paradigm="Triple Nested Loops"
                executionTimeMs={strassenResult.naive_time_ms}
                timeComplexity="O(n³)"
                spaceComplexity="O(1)"
                comparisons={strassenResult.naive_multiplications}
                isOptimal={false}
                solutionSummary={
                  <div className="font-mono text-xs">
                    Dimension: {strassenResult.matrix_size}
                    <br />
                    Scalar Multiplications: {strassenResult.naive_multiplications}
                  </div>
                }
                tags={['Naive', 'O(n^3)']}
              />
            </div>
          )}
        </div>
      )}

      {/* MERGE VS QUICK SORT */}
      {activeTab === 'sorting' && (
        <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 space-y-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
                Merge Sort vs Quick Sort Divide & Conquer Benchmark
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Merge Sort divides evenly (T(n)=2T(n/2)+n); Quick Sort partitions in-place around a pivot.
              </p>
            </div>
            <span className="text-xs font-mono text-secondary font-bold">O(n log n)</span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">
                Array Size (N Elements)
              </label>
              <select
                value={sortSize}
                onChange={e => setSortSize(parseInt(e.target.value))}
                className="px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-mono text-sm"
              >
                <option value={500}>500 elements</option>
                <option value={1000}>1,000 elements</option>
                <option value={5000}>5,000 elements</option>
                <option value={20000}>20,000 elements</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={runSort}
                disabled={loadingSort}
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-medium text-xs shadow"
              >
                {loadingSort ? 'Sorting...' : 'Profile Merge vs Quick Sort'}
              </button>
            </div>
          </div>

          {sortResult && sortResult.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
              {sortResult.map((r: any, i: number) => (
                <AlgorithmResultCard
                  key={i}
                  algorithmName={r.algorithm}
                  paradigm="Divide and Conquer"
                  executionTimeMs={r.execution_time_ms}
                  timeComplexity={r.time_complexity}
                  spaceComplexity={r.space_complexity}
                  comparisons={r.comparisons}
                  swapsOrRotations={r.swaps_or_rotations}
                  isOptimal={true}
                  solutionSummary={`Dataset Size: ${r.dataset_size.toLocaleString()} items · Memory: ${r.memory_estimate}`}
                  tags={['Sorting', r.algorithm.split(' ')[0]]}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
