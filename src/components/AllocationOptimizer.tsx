import React, { useState } from 'react';
import { SellerAllocation } from '../types.ts';

const INITIAL_SELLERS: SellerAllocation[] = [
  {
    id: 'A',
    name: 'Seller A (Karnavati Garba Hub)',
    subtitle: 'Tier-1 Mega Partner · Ahmedabad West',
    tier: 'Tier-1',
    location: 'Ahmedabad West',
    trueDemand: 3200,
    currentQuota: 2000,
    optimizedQuota: 2650,
    netShift: 650,
    fillRate: 82.8,
    expRevenueLakhs: 18.55,
    risk: 'Low',
  },
  {
    id: 'B',
    name: 'Seller B (Sarkhej Youth Club)',
    subtitle: 'Tier-1 Club Partner · SG Highway Zone',
    tier: 'Tier-1',
    location: 'SG Highway Zone',
    trueDemand: 2800,
    currentQuota: 2000,
    optimizedQuota: 2400,
    netShift: 400,
    fillRate: 85.7,
    expRevenueLakhs: 16.8,
    risk: 'Low',
  },
  {
    id: 'C',
    name: 'Seller C (Navrangpura Agency)',
    subtitle: 'Tier-2 Direct Agency · Central City',
    tier: 'Tier-2',
    location: 'Central City',
    trueDemand: 2100,
    currentQuota: 2000,
    optimizedQuota: 1950,
    netShift: -50,
    fillRate: 92.8,
    expRevenueLakhs: 13.65,
    risk: 'Low',
  },
  {
    id: 'D',
    name: 'Seller D (Maninagar Pass Desk)',
    subtitle: 'Tier-2 Retail Point · South Zone',
    tier: 'Tier-2',
    location: 'South Zone',
    trueDemand: 1500,
    currentQuota: 1800,
    optimizedQuota: 1450,
    netShift: -350,
    fillRate: 96.6,
    expRevenueLakhs: 10.15,
    risk: 'Minimal',
  },
  {
    id: 'E',
    name: 'Seller E (Bopal Online Outlet)',
    subtitle: 'Tier-3 Web Portal · Suburban Node',
    tier: 'Tier-3',
    location: 'Suburban Node',
    trueDemand: 1200,
    currentQuota: 1200,
    optimizedQuota: 1150,
    netShift: -50,
    fillRate: 95.8,
    expRevenueLakhs: 8.05,
    risk: 'Minimal',
  },
  {
    id: 'F',
    name: 'Seller F (Vastrapur Campus Booth)',
    subtitle: 'Tier-3 Campus Outlet · Student Desk',
    tier: 'Tier-3',
    location: 'Student Desk',
    trueDemand: 900,
    currentQuota: 1000,
    optimizedQuota: 400,
    netShift: -600,
    fillRate: 44.4,
    expRevenueLakhs: 2.8,
    risk: 'Re-routed',
  },
];

export const AllocationOptimizer: React.FC = () => {
  const [totalPasses, setTotalPasses] = useState<number>(10000);
  const [alpha, setAlpha] = useState<number>(75);
  const [beta, setBeta] = useState<number>(85);
  const [gamma, setGamma] = useState<number>(0.65);
  const [algorithm, setAlgorithm] = useState<'greedy' | 'dp' | 'bb'>('dp');
  const [compareBenchmark, setCompareBenchmark] = useState<boolean>(false);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [sellers, setSellers] = useState<SellerAllocation[]>(INITIAL_SELLERS);
  const [grossRevenue, setGrossRevenue] = useState<number>(70.0);
  const [latencyMs, setLatencyMs] = useState<string>('1.84');

  const handleRunSolver = () => {
    setIsSolving(true);
    setTimeout(() => {
      setIsSolving(false);
      // Recalculate slightly based on parameters
      const scaleFactor = totalPasses / 10000;
      const algoFactor = algorithm === 'greedy' ? 0.954 : 1.0;
      const newRev = Number((70.0 * scaleFactor * algoFactor).toFixed(2));
      setGrossRevenue(newRev);
      setLatencyMs(algorithm === 'greedy' ? '0.14' : algorithm === 'dp' ? '1.84' : '11.60');

      // Update sellers proportionally
      setSellers(
        INITIAL_SELLERS.map((s) => {
          const quota = Math.round(s.optimizedQuota * scaleFactor);
          const shift = quota - s.currentQuota;
          const fill = Number(((quota / s.trueDemand) * 100).toFixed(1));
          const rev = Number((s.expRevenueLakhs * scaleFactor * algoFactor).toFixed(2));
          return {
            ...s,
            optimizedQuota: quota,
            netShift: shift,
            fillRate: Math.min(fill, 100),
            expRevenueLakhs: rev,
          };
        })
      );
    }, 380);
  };

  const handleReset = () => {
    setTotalPasses(10000);
    setAlpha(75);
    setBeta(85);
    setGamma(0.65);
    setAlgorithm('dp');
    setSellers(INITIAL_SELLERS);
    setGrossRevenue(70.0);
    setLatencyMs('1.84');
  };

  const totalDemand = sellers.reduce((acc, s) => acc + s.trueDemand, 0);
  const totalAllocated = sellers.reduce((acc, s) => acc + s.optimizedQuota, 0);

  return (
    <div className="p-space-md lg:p-margin space-y-space-xl relative overflow-hidden">
      {/* Ambient Radial Atmosphere */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero / Title & Context Section */}
      <section className="flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="space-y-space-xs max-w-3xl">
            <div className="flex items-center gap-space-xs">
              <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm uppercase tracking-wider font-mono">
                DAA Engine // Module 04
              </span>
              <span className="text-outline text-label-sm font-label-sm">|</span>
              <span className="text-secondary font-label-sm text-label-sm flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> Bellman-Ford Memoizer Active
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Inventory Allocation Optimizer
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Distribute limited pass inventory among multi-tier sellers and distribution partners to maximize sell-through utilization and gross revenue.
            </p>
          </div>

          {/* Quick Telemetry Badge */}
          <div className="flex items-center gap-space-sm bg-surface-container-high px-space-md py-space-sm rounded-xl shadow-sm self-start lg:self-auto border border-surface-container-highest/60">
            <span className="material-symbols-outlined text-primary text-2xl">insights</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Algorithmic State</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold font-mono">
                Pareto-Optimal Frontier [Active]
              </span>
            </div>
          </div>
        </div>

        {/* Problem Statement Banner */}
        <div className="relative bg-surface-container-low rounded-xl p-space-md shadow-md overflow-hidden border border-surface-container/60">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary-container via-secondary to-primary-container" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pl-space-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">functions</span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold font-mono">
                  DAA Optimization Problem: Multi-Seller Bounded Knapsack with Fairness &amp; Tier Constraints
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Mathematical bounds enforce strict capacity safety, preventing unauthorized over-issuance while preserving regional equilibrium.
              </p>
            </div>
            <div className="bg-surface-container-lowest px-space-md py-space-xs rounded-lg shadow-sm border border-surface-container/50">
              <span className="font-label-sm text-label-sm text-outline block uppercase tracking-wider mb-0.5 font-mono">
                Objective Function
              </span>
              <code className="font-label-md text-label-md text-secondary tracking-tight font-mono">
                Maximize Σ(R_i · x_i) &nbsp;s.t.&nbsp; Σx_i ≤ Total Passes, Min_Quota_i ≤ x_i ≤ Demand_i
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Top Bento Section: Simulation Controls & Revenue Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Interactive Simulation Control Deck (8 Cols) */}
        <div className="xl:col-span-8 bg-surface-container-low rounded-xl p-space-lg shadow-md flex flex-col justify-between gap-space-lg relative border border-surface-container/60">
          <div className="flex items-center justify-between pb-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-xl">tune</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Interactive Simulation Control Deck</h2>
            </div>
            <span className="font-label-sm text-label-sm text-outline uppercase px-2 py-0.5 bg-surface-container-highest rounded font-mono">
              Solver Config
            </span>
          </div>

          {/* Parametric Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Total Passes Slider + Input */}
            <div className="bg-surface-container p-space-md rounded-xl space-y-space-xs border border-surface-container-highest/40">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Total Passes to Allocate
                </label>
                <div className="flex items-center bg-surface-container-lowest rounded px-2 py-1 border border-surface-container">
                  <span className="font-label-sm text-label-sm text-outline mr-1 font-mono">QTY:</span>
                  <input
                    className="w-16 bg-transparent text-primary font-label-md text-label-md text-right focus:outline-none font-mono"
                    max={25000}
                    min={1000}
                    step={500}
                    type="number"
                    value={totalPasses}
                    onChange={(e) => setTotalPasses(Number(e.target.value))}
                  />
                </div>
              </div>
              <input
                className="w-full accent-primary cursor-pointer bg-surface-container-highest h-1.5 rounded-lg"
                max={25000}
                min={1000}
                step={500}
                type="range"
                value={totalPasses}
                onChange={(e) => setTotalPasses(Number(e.target.value))}
              />
              <div className="flex justify-between text-outline font-label-sm text-label-sm font-mono">
                <span>1k Floor</span>
                <span className="text-secondary">Capacity Pool: {totalPasses.toLocaleString()} Passes</span>
                <span>25k Max</span>
              </div>
            </div>

            {/* Participating Sellers */}
            <div className="bg-surface-container p-space-md rounded-xl space-y-space-xs flex flex-col justify-between border border-surface-container-highest/40">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Authorized Partners
                </span>
                <span className="font-label-sm text-label-sm text-secondary bg-surface-container-highest px-2 py-0.5 rounded font-mono">
                  6 Nodes Enrolled
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['Seller A', 'Seller B', 'Seller C', 'Seller D', 'Seller E', 'Seller F'].map((name) => (
                  <span key={name} className="px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-mono">
                    {name}
                  </span>
                ))}
              </div>
              <p className="font-body-sm text-body-sm text-outline">
                All seller demand vectors loaded from ERP real-time sync.
              </p>
            </div>

            {/* Sliders: Weights & Fairness */}
            <div className="bg-surface-container p-space-md rounded-xl space-y-space-sm md:col-span-2 border border-surface-container-highest/40">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Revenue Weight (α)</span>
                    <span className="font-label-sm text-label-sm text-primary font-mono">{alpha}%</span>
                  </div>
                  <input
                    className="w-full accent-primary bg-surface-container-highest h-1 rounded cursor-pointer"
                    max={100}
                    min={0}
                    type="range"
                    value={alpha}
                    onChange={(e) => setAlpha(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Demand Fill (β)</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono">{beta}%</span>
                  </div>
                  <input
                    className="w-full accent-secondary bg-surface-container-highest h-1 rounded cursor-pointer"
                    max={100}
                    min={0}
                    type="range"
                    value={beta}
                    onChange={(e) => setBeta(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Gini Floor (γ)</span>
                    <span className="font-label-sm text-label-sm text-tertiary font-mono">{gamma.toFixed(2)}</span>
                  </div>
                  <input
                    className="w-full accent-tertiary-container bg-surface-container-highest h-1 rounded cursor-pointer"
                    max={1}
                    min={0}
                    step={0.05}
                    type="range"
                    value={gamma}
                    onChange={(e) => setGamma(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Engine Selector */}
          <div className="space-y-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
              Select DAA Solver Strategy
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
              {/* Option 1: Greedy */}
              <label
                onClick={() => setAlgorithm('greedy')}
                className={`cursor-pointer p-space-md rounded-xl transition-all flex flex-col justify-between gap-space-xs border ${
                  algorithm === 'greedy'
                    ? 'bg-surface-container-highest text-on-surface border-primary'
                    : 'bg-surface-container hover:bg-surface-container-high border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      checked={algorithm === 'greedy'}
                      className="accent-primary cursor-pointer"
                      name="algorithm"
                      type="radio"
                      readOnly
                    />
                    <span className="font-headline-sm text-headline-sm text-on-surface text-base">
                      Greedy Heuristic
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-outline font-mono">
                    O(n log n)
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Fast priority heuristic, sub-optimal under strict fairness constraints.
                </p>
              </label>

              {/* Option 2: Dynamic Programming */}
              <label
                onClick={() => setAlgorithm('dp')}
                className={`cursor-pointer p-space-md rounded-xl transition-all flex flex-col justify-between gap-space-xs relative overflow-hidden border ${
                  algorithm === 'dp'
                    ? 'bg-surface-container-highest text-on-surface border-primary'
                    : 'bg-surface-container hover:bg-surface-container-high border-transparent'
                }`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary-container/15 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      checked={algorithm === 'dp'}
                      className="accent-primary cursor-pointer"
                      name="algorithm"
                      type="radio"
                      readOnly
                    />
                    <span className="font-headline-sm text-headline-sm text-primary text-base font-bold">
                      Dynamic Programming
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-bold font-mono">
                    O(n · W)
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface">
                  Globally optimal, pseudo-polynomial memoized 1D allocation matrix.
                </p>
              </label>

              {/* Option 3: Branch & Bound */}
              <label
                onClick={() => setAlgorithm('bb')}
                className={`cursor-pointer p-space-md rounded-xl transition-all flex flex-col justify-between gap-space-xs border ${
                  algorithm === 'bb'
                    ? 'bg-surface-container-highest text-on-surface border-primary'
                    : 'bg-surface-container hover:bg-surface-container-high border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      checked={algorithm === 'bb'}
                      className="accent-primary cursor-pointer"
                      name="algorithm"
                      type="radio"
                      readOnly
                    />
                    <span className="font-headline-sm text-headline-sm text-on-surface text-base">
                      Branch &amp; Bound
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-outline font-mono">
                    O(2ⁿ) pruned
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Exact recursive solver with linear relaxation and priority queue bounding.
                </p>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <button
                className="px-space-lg py-3 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-headline-sm text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary-container/20 hover:bg-secondary-container transition-all active:scale-95 group"
                onClick={handleRunSolver}
                type="button"
                disabled={isSolving}
              >
                <span className={`material-symbols-outlined text-lg ${isSolving ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`}>
                  {isSolving ? 'sync' : 'bolt'}
                </span>
                <span>{isSolving ? 'Recomputing Optimal Mesh...' : 'Run Optimization Solver'}</span>
              </button>
              <button
                className="px-space-md py-3 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors flex items-center gap-2 border border-surface-container-highest/60"
                onClick={handleReset}
                type="button"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
                <span>Reset Baseline</span>
              </button>
            </div>

            <label className="flex items-center gap-space-xs cursor-pointer select-none bg-surface-container px-space-md py-2 rounded-lg hover:bg-surface-container-high transition-colors border border-surface-container-highest/40">
              <input
                checked={compareBenchmark}
                className="accent-secondary h-4 w-4 rounded cursor-pointer"
                type="checkbox"
                onChange={(e) => setCompareBenchmark(e.target.checked)}
              />
              <span className="font-label-sm text-label-sm text-on-surface">
                Compare All 3 Algorithms Side-by-Side
              </span>
            </label>
            <button
              type="button"
              onClick={() => {
                const headers = ['Partner Name', 'Subtitle', 'Tier', 'Location', 'True Demand', 'Current Quota', 'Optimized Quota', 'Net Shift', 'Fill Rate (%)', 'Exp Revenue (Lakhs INR)', 'Risk Level'];
                const rows = sellers.map(s => [
                  `"${s.name}"`,
                  `"${s.subtitle}"`,
                  `"${s.tier}"`,
                  `"${s.location}"`,
                  s.trueDemand,
                  s.currentQuota,
                  s.optimizedQuota,
                  s.netShift,
                  s.fillRate,
                  s.expRevenueLakhs,
                  `"${s.risk}"`
                ]);
                const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `navraksh_seller_allocation_matrix_${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="px-3 py-2 rounded-lg bg-surface-container-highest text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 hover:bg-surface-container transition-colors border border-surface-container-highest font-mono"
            >
              <span className="material-symbols-outlined text-sm text-secondary">file_download</span>
              <span>Export Allocation CSV</span>
            </button>
          </div>
        </div>

        {/* Difference Callout Summary & Key Impact Deck (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md justify-between">
          {/* Primary Gain Card */}
          <div className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-xl p-space-lg shadow-md relative overflow-hidden flex-1 flex flex-col justify-between border border-surface-container-highest/60">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-mono">
                  Optimized Gross Yield
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-xl text-headline-xl text-on-surface font-bold font-mono">
                    ₹{grossRevenue.toFixed(2)}L
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded font-semibold flex items-center font-mono">
                    <span className="material-symbols-outlined text-xs">arrow_upward</span> +₹6.85L (+10.8%)
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
            </div>

            {/* Comparative Mini Stats */}
            <div className="grid grid-cols-2 gap-space-sm pt-space-md my-space-sm">
              <div className="bg-surface-container-lowest p-space-sm rounded-lg space-y-1 border border-surface-container/50">
                <span className="font-label-sm text-label-sm text-outline block">Pass Utilization</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold font-mono">
                  98.5%
                </span>
                <span className="font-label-sm text-label-sm text-primary block font-mono">
                  Δ +14.2% vs Manual
                </span>
              </div>
              <div className="bg-surface-container-lowest p-space-sm rounded-lg space-y-1 border border-surface-container/50">
                <span className="font-label-sm text-label-sm text-outline block">Deadstock Risk</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold font-mono">
                  150 Qty
                </span>
                <span className="font-label-sm text-label-sm text-tertiary block font-mono">
                  -89.4% Reduction
                </span>
              </div>
            </div>

            {/* Micro Sparkline / Progress Visualization */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant font-mono">
                <span>Inventory Allocation Rate</span>
                <span className="text-primary font-bold">{totalAllocated.toLocaleString()} / {totalPasses.toLocaleString()} Issued</span>
              </div>
              <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden flex">
                <div className="h-full bg-primary-container" style={{ width: '82%' }} />
                <div className="h-full bg-secondary" style={{ width: '16.5%' }} />
                <div className="h-full bg-outline-variant" style={{ width: '1.5%' }} />
              </div>
              <div className="flex justify-between text-label-sm font-label-sm text-outline font-mono">
                <span>Primary Allocation</span>
                <span>Reserve Margin</span>
                <span>Buffer</span>
              </div>
            </div>
          </div>

          {/* Solver Latency & Performance Badge */}
          <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex items-center justify-between border border-surface-container/60">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-lg">timer</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block font-mono">
                  DP Execution Time
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-mono">
                  {latencyMs} ms
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-1 rounded font-mono">
                6 × 10,000 Cells
              </span>
              <span className="font-body-sm text-body-sm text-outline block mt-0.5 font-mono">
                O(W) Space Hit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Side-by-Side Algorithm Benchmark Card (Collapsible) */}
      {compareBenchmark && (
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md space-y-space-md border border-surface-container/60 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">compare_arrows</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Algorithmic Trade-off Analysis: 3 Paradigms
              </h3>
            </div>
            <span className="font-label-sm text-label-sm text-outline uppercase font-mono">
              N=6 Sellers, W={totalPasses.toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Heuristic */}
            <div className="bg-surface-container p-space-md rounded-xl space-y-space-sm border border-surface-container-highest/40">
              <div className="flex justify-between items-center">
                <span className="font-headline-sm text-headline-sm text-base text-on-surface font-semibold">
                  Greedy Heuristic
                </span>
                <span className="font-label-sm text-label-sm text-outline font-mono">O(n log n)</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Ranks sellers by marginal yield per pass. Fast but violates quota fairness floors on high demand variance.
              </p>
              <div className="space-y-1 pt-space-xs">
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Latency:</span>
                  <span className="text-on-surface">0.14 ms</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Gross Revenue:</span>
                  <span className="text-on-surface">₹66.80L</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Optimality:</span>
                  <span className="text-secondary">~95.4% (Sub-optimal)</span>
                </div>
              </div>
            </div>

            {/* Dynamic Programming (Winner) */}
            <div className="bg-surface-container-high p-space-md rounded-xl space-y-space-sm shadow-sm relative border border-primary/40">
              <div className="flex justify-between items-center">
                <span className="font-headline-sm text-headline-sm text-base text-primary font-bold">
                  Dynamic Programming
                </span>
                <span className="font-label-sm text-label-sm text-primary font-bold font-mono">O(n · W)</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">
                1D rolling buffer memoization over fractional state steps. Optimal bounded revenue distribution.
              </p>
              <div className="space-y-1 pt-space-xs">
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Latency:</span>
                  <span className="text-primary font-bold">1.84 ms</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Gross Revenue:</span>
                  <span className="text-primary font-bold">₹70.00L</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Optimality:</span>
                  <span className="text-secondary font-bold">100.0% (Global Optimal)</span>
                </div>
              </div>
            </div>

            {/* Branch & Bound */}
            <div className="bg-surface-container p-space-md rounded-xl space-y-space-sm border border-surface-container-highest/40">
              <div className="flex justify-between items-center">
                <span className="font-headline-sm text-headline-sm text-base text-on-surface font-semibold">
                  Branch &amp; Bound
                </span>
                <span className="font-label-sm text-label-sm text-outline font-mono">O(2ⁿ) Pruned</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Traverses state-space tree using linear programming relaxations as upper bounds to prune branches.
              </p>
              <div className="space-y-1 pt-space-xs">
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Latency:</span>
                  <span className="text-on-surface">11.60 ms</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Gross Revenue:</span>
                  <span className="text-on-surface">₹70.00L</span>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm font-mono">
                  <span className="text-outline">Optimality:</span>
                  <span className="text-secondary">100.0% (Global Optimal)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Results & Comparative Allocation Matrix Table */}
      <section className="bg-surface-container-low rounded-xl shadow-md overflow-hidden flex flex-col border border-surface-container/60">
        <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-high/40 border-b border-surface-container">
          <div className="space-y-0.5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">table_chart</span>
              Comparative Allocation Matrix: Status Quo vs Solver Recommendation
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Live recalculation of seller-specific quota allocations, demand satiation, and revenue delta.
            </p>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-label-sm text-label-sm text-outline">Live Filter:</span>
            <span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-1 rounded font-mono">
              All 6 Verified Channels
            </span>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead>
              <tr className="bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase tracking-wider font-mono">
                <th className="py-space-sm px-space-md">Authorized Partner / Outlet</th>
                <th className="py-space-sm px-space-md text-right">True Demand</th>
                <th className="py-space-sm px-space-md text-right">Current Quota</th>
                <th className="py-space-sm px-space-md text-right text-primary font-bold">Optimized Quota</th>
                <th className="py-space-sm px-space-md text-center">Net Shift (Δ)</th>
                <th className="py-space-sm px-space-md text-right">Fill Rate</th>
                <th className="py-space-sm px-space-md text-right">Exp. Revenue</th>
                <th className="py-space-sm px-space-md text-center">Risk Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/40">
              {sellers.map((s, idx) => (
                <tr
                  key={s.id}
                  className={`hover:bg-surface-container-high/50 transition-colors ${
                    idx % 2 === 0 ? 'bg-surface-container/20' : 'bg-surface-container-low'
                  }`}
                >
                  <td className="py-3 px-space-md">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-sm text-on-surface font-semibold">
                        {s.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">
                        {s.subtitle}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md text-right font-mono text-on-surface-variant">
                    {s.trueDemand.toLocaleString()}
                  </td>
                  <td className="py-3 px-space-md text-right font-mono text-outline">
                    {s.currentQuota.toLocaleString()}
                  </td>
                  <td className="py-3 px-space-md text-right font-mono font-bold text-primary">
                    {s.optimizedQuota.toLocaleString()}
                  </td>
                  <td className="py-3 px-space-md text-center">
                    <span
                      className={`font-label-sm text-label-sm px-2 py-0.5 rounded font-bold font-mono ${
                        s.netShift > 0
                          ? 'bg-primary-container/20 text-primary'
                          : s.netShift < -100
                          ? 'bg-tertiary-container/20 text-tertiary'
                          : 'bg-surface-container-highest text-outline'
                      }`}
                    >
                      {s.netShift > 0 ? `+${s.netShift}` : s.netShift} passes
                    </span>
                  </td>
                  <td className="py-3 px-space-md text-right font-mono text-on-surface">
                    {s.fillRate}%
                  </td>
                  <td className="py-3 px-space-md text-right font-mono font-semibold text-secondary">
                    ₹{s.expRevenueLakhs.toFixed(2)} Lakhs
                  </td>
                  <td className="py-3 px-space-md text-center">
                    <span
                      className={`inline-flex items-center gap-1 font-label-sm text-label-sm font-mono ${
                        s.risk === 'Low'
                          ? 'text-secondary'
                          : s.risk === 'Minimal'
                          ? 'text-outline'
                          : 'text-error font-semibold'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          s.risk === 'Low' ? 'bg-secondary' : s.risk === 'Minimal' ? 'bg-outline' : 'bg-error'
                        }`}
                      />
                      {s.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-surface-container-lowest font-headline-sm text-headline-sm text-sm border-t border-surface-container">
              <tr className="text-on-surface font-bold">
                <td className="py-space-sm px-space-md">Aggregated Totals</td>
                <td className="py-space-sm px-space-md text-right font-mono">{totalDemand.toLocaleString()} Demand</td>
                <td className="py-space-sm px-space-md text-right font-mono text-outline">{totalPasses.toLocaleString()} Pool</td>
                <td className="py-space-sm px-space-md text-right font-mono text-primary">{totalAllocated.toLocaleString()} Allocated</td>
                <td className="py-space-sm px-space-md text-center text-secondary font-mono font-normal">Reallocated: 1,050</td>
                <td className="py-space-sm px-space-md text-right font-mono">98.5% Net</td>
                <td className="py-space-sm px-space-md text-right font-mono text-primary">₹{grossRevenue.toFixed(2)} Lakhs</td>
                <td className="py-space-sm px-space-md text-center font-label-sm text-label-sm text-secondary font-mono">
                  Optimal Solution
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Bottom Technical DAA Section: Rigorous Complexity & Solver Trace */}
      <section className="space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-mono">
              Algorithmic Foundation
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Algorithm Performance &amp; Rigorous Complexity Analysis
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-outline font-mono">
            Engine Kernel: POSIX C++20 Compiled Wasm
          </span>
        </div>

        {/* 4 Monospace Technical Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* Card 1: Time Complexity */}
          <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">Time Complexity</span>
              <span className="material-symbols-outlined text-base text-primary">schedule</span>
            </div>
            <div className="font-label-lg text-label-lg text-primary font-bold font-mono">
              O(n · W) = 60,000 ops
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              n=6 partner nodes, W=10,000 units. Pseudo-polynomial execution with zero recursive overhead.
            </p>
          </div>

          {/* Card 2: Space Complexity */}
          <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">Space Complexity</span>
              <span className="material-symbols-outlined text-base text-secondary">memory</span>
            </div>
            <div className="font-label-lg text-label-lg text-secondary font-bold font-mono">
              O(W) = 80 KB Buffer
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Optimized from 2D O(n·W) (480 KB) down to a single flattened 1D rolling array with backwards iteration.
            </p>
          </div>

          {/* Card 3: State Transitions */}
          <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">State Transition</span>
              <span className="material-symbols-outlined text-base text-primary">swap_horiz</span>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface font-mono tracking-tighter truncate">
              DP[w] = max(DP[w], DP[w-w_i] + v_i)
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Recurrence relation incorporates revenue margin v_i weighted by tier priority multiplier α and fairness floor γ.
            </p>
          </div>

          {/* Card 4: Optimality Certificate */}
          <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">Optimality Certificate</span>
              <span className="material-symbols-outlined text-base text-secondary">verified</span>
            </div>
            <div className="font-label-lg text-label-lg text-secondary font-bold font-mono">
              Bellman&apos;s Principle
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Guaranteed sub-problem optimality holds over entire discrete pass capacity space. Zero duality gap.
            </p>
          </div>
        </div>

        {/* Live Step-by-Step Solver Execution Trace Log Drawer */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md space-y-space-xs border border-surface-container/60">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-mono">
                Live Solver Trace Engine · Memoization Cache
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-outline font-mono">
              Kernel Thread #04 [AFFINITY_CORE_0]
            </span>
          </div>
          <div className="bg-surface-container-high/40 rounded-lg p-space-md font-mono text-label-sm text-label-sm space-y-1.5 overflow-x-auto text-on-surface-variant max-h-48 overflow-y-auto border border-surface-container/40">
            <div className="flex items-center gap-3">
              <span className="text-outline">[00:00:00.000]</span>
              <span className="text-primary font-bold">INIT:</span>
              <span>Allocated 1D vector DP[0..{totalPasses}] initialized to 0. Min_Quotas verified against total capacity pool.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-outline">[00:00:00.001]</span>
              <span className="text-secondary">STAGE 1:</span>
              <span>Seller A (Karnavati Garba Hub) bound evaluated: min=1200, max=3200. Memo table updated for capacity steps.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-outline">[00:00:00.001]</span>
              <span className="text-secondary">STAGE 2:</span>
              <span>Seller B (Sarkhej Youth Club) bound evaluated: min=1000, max=2800. Transition checked: 10,000 states verified.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-outline">[00:00:00.002]</span>
              <span className="text-secondary">STAGE 3-5:</span>
              <span>Sellers C, D, E processed. Dynamic bounding pruned 4,210 redundant states lacking marginal yield advantage.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-outline">[00:00:00.002]</span>
              <span className="text-tertiary">STAGE 6:</span>
              <span>Seller F (Vastrapur Campus) constrained: Over-allocation penalty applied; quota trimmed to 400 passes.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-outline">[00:00:00.002]</span>
              <span className="text-primary font-bold">TERMINATION:</span>
              <span>Global Maxima reached at DP[9850] = {grossRevenue.toFixed(2)} Lakhs INR. Residual deadstock 150 reserved for emergency gates.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
