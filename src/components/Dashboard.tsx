import React from 'react';
import { ScreenId } from '../types.ts';

interface DashboardProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="p-space-md lg:p-margin space-y-space-xl">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="space-y-space-xs max-w-3xl">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm uppercase tracking-wider font-mono">
              Live Operations Control
            </span>
            <span className="text-outline text-label-sm font-label-sm">•</span>
            <span className="text-secondary font-label-sm text-label-sm flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> All 4 Gates Online
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Navratri Mahotsav 2026 Overview
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Real-time festival monitoring, pass inventory optimization, and instantaneous turnstile gate security for Ahmedabad&apos;s premier 9-night celebration.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            onClick={() => onNavigate('pass-inventory')}
            className="px-3.5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 border border-surface-container-highest/60 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-primary text-base">confirmation_number</span>
            <span>Pass Directory</span>
          </button>
          <button
            onClick={() => onNavigate('allocation-optimizer')}
            className="px-3.5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-2 border border-surface-container-highest/60 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-secondary text-base">tune</span>
            <span>Quota Optimizer</span>
          </button>
          <button
            onClick={() => onNavigate('qr-verification')}
            className="px-3.5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold flex items-center gap-2 shadow-md hover:bg-secondary-container transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-base">qr_code_scanner</span>
            <span>Gate Scanner</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Metric 1 */}
        <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">Gross Pass Yield</span>
            <span className="material-symbols-outlined text-base text-primary">payments</span>
          </div>
          <div className="font-headline-xl text-headline-xl text-on-surface font-bold font-mono">
            ₹4.82 Cr
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span className="text-secondary font-semibold">+10.8% with Smart Allocation</span>
            <span>Target: ₹4.50 Cr</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">Total Passes Issued</span>
            <span className="material-symbols-outlined text-base text-secondary">confirmation_number</span>
          </div>
          <div className="font-headline-xl text-headline-xl text-secondary font-bold font-mono">
            24,890
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Capacity: 25,000</span>
            <span className="text-primary font-semibold">99.56% Fill</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">Turnstile Throughput</span>
            <span className="material-symbols-outlined text-base text-primary">speed</span>
          </div>
          <div className="font-headline-xl text-headline-xl text-primary font-bold font-mono">
            412/min
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Avg Latency: &lt; 0.1ms</span>
            <span className="text-secondary font-semibold">Sub-Millisecond Verification</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs shadow-md border border-surface-container/60">
          <div className="flex items-center justify-between text-outline">
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-mono">Replays Blocked</span>
            <span className="material-symbols-outlined text-base text-error">security</span>
          </div>
          <div className="font-headline-xl text-headline-xl text-on-surface font-bold font-mono">
            47 Intercepted
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span className="text-secondary font-semibold">100% Intercepted</span>
            <span>0 Breaches</span>
          </div>
        </div>
      </div>

      {/* Navratri 9 Nights Calendar & Attendance Grid */}
      <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md border border-surface-container/60 space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-surface-container pb-space-sm">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              9-Night Festival Schedule &amp; Capacity Health
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              October 10 – October 19, 2026 • Shath Sangath Festival Complex, Ahmedabad
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-surface-container-high text-secondary font-mono text-xs">
            Night 6 in Progress (Sharad Purnima)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {[
            { night: 'Night 1', date: 'Oct 10', title: 'Prathama', status: 'Completed', cap: '100%' },
            { night: 'Night 2', date: 'Oct 11', title: 'Dvitiya', status: 'Completed', cap: '98%' },
            { night: 'Night 3', date: 'Oct 12', title: 'Tritiya', status: 'Completed', cap: '99%' },
            { night: 'Night 4', date: 'Oct 13', title: 'Chaturthi', status: 'Completed', cap: '97%' },
            { night: 'Night 5', date: 'Oct 14', title: 'Panchami', status: 'Completed', cap: '100%' },
            { night: 'Night 6', date: 'Oct 15', title: 'Shashthi', status: 'LIVE NOW', cap: '99.6%', current: true },
            { night: 'Night 7', date: 'Oct 16', title: 'Saptami', status: 'Sold Out', cap: '100%' },
            { night: 'Night 8', date: 'Oct 17', title: 'Ashtami', status: 'Sold Out', cap: '100%' },
            { night: 'Night 9', date: 'Oct 18', title: 'Navami', status: 'Sold Out', cap: '100%' },
          ].map((item) => (
            <div
              key={item.night}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                item.current
                  ? 'bg-primary-container/20 border-primary-container shadow-md'
                  : 'bg-surface-container-lowest border-surface-container/60 hover:border-surface-container-highest'
              }`}
            >
              <div>
                <span className="text-[10px] text-outline font-mono block">{item.date}</span>
                <span className="font-headline-sm text-sm font-bold text-on-surface block">
                  {item.night}
                </span>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">{item.title}</span>
              </div>
              <div className="mt-2 pt-1 border-t border-surface-container/40">
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase ${
                    item.current
                      ? 'bg-primary text-on-primary'
                      : item.status === 'Completed'
                      ? 'bg-surface-container-highest text-outline'
                      : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Turnstile Activity Log & Regional Sellers Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Live Gate Feed (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-space-md shadow-md border border-surface-container/60 space-y-space-sm">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-base">sensors</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Live Turnstile Scan Log
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-mono">Auto-Syncing: 1.0s</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {[
              { id: 'NAV-84291', holder: 'Rahul Patel', gate: 'Gate 02 • B', time: '20:14:08 IST', tier: 'Gold Couple', status: 'GRANTED', latency: '0.04 ms' },
              { id: 'NAV-10328', holder: 'Aarav Joshi', gate: 'Gate 01 • VIP', time: '20:14:02 IST', tier: 'Royal Lounge', status: 'GRANTED', latency: '0.04 ms' },
              { id: 'NAV-84291', holder: 'REPLAY ATTEMPT', gate: 'Gate 02 • A', time: '20:13:59 IST', tier: 'Gold Couple', status: 'DUPLICATE_ALERT', latency: '0.04 ms' },
              { id: 'NAV-99120', holder: 'Priya Shah', gate: 'Gate 01 • VIP', time: '20:13:45 IST', tier: 'Saibo Diamond', status: 'GRANTED', latency: '0.04 ms' },
              { id: 'NAV-44219', holder: 'Nirav Trivedi', gate: 'Gate 03 • Concourse', time: '20:13:30 IST', tier: 'Heritage Deluxe', status: 'GRANTED', latency: '0.04 ms' },
              { id: 'NAV-65102', holder: 'Kavita Dave', gate: 'Gate 02 • B', time: '20:13:12 IST', tier: 'Garba Arena', status: 'GRANTED', latency: '0.04 ms' },
            ].map((scan, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40 flex items-center justify-between text-body-sm font-mono"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`material-symbols-outlined text-sm ${
                      scan.status === 'GRANTED' ? 'text-secondary' : 'text-error'
                    }`}
                  >
                    {scan.status === 'GRANTED' ? 'check_circle' : 'gpp_bad'}
                  </span>
                  <div>
                    <span className="font-bold text-on-surface">{scan.holder}</span>
                    <span className="text-outline text-xs block font-sans">
                      #{scan.id} • {scan.gate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold ${
                      scan.status === 'GRANTED'
                        ? 'bg-secondary/10 text-secondary'
                        : 'bg-error-container/30 text-error'
                    }`}
                  >
                    {scan.status}
                  </span>
                  <span className="text-[11px] text-outline block mt-0.5">{scan.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sellers & Quota Summary (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-md shadow-md border border-surface-container/60 space-y-space-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-base">storefront</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Regional Partner Quotas
              </span>
            </div>
            <button
              onClick={() => onNavigate('allocation-optimizer')}
              className="text-primary text-xs hover:underline font-mono"
              type="button"
            >
              Optimize &rarr;
            </button>
          </div>

          <div className="space-y-2">
            {[
              { name: 'Karnavati Garba Hub', quota: '2,650 / 3,200', fill: '82.8%', rev: '₹18.55L' },
              { name: 'Sarkhej Youth Club', quota: '2,400 / 2,800', fill: '85.7%', rev: '₹16.80L' },
              { name: 'Navrangpura Agency', quota: '1,950 / 2,100', fill: '92.8%', rev: '₹13.65L' },
              { name: 'Maninagar Pass Desk', quota: '1,450 / 1,500', fill: '96.6%', rev: '₹10.15L' },
            ].map((seller) => (
              <div
                key={seller.name}
                className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40 flex items-center justify-between text-body-sm"
              >
                <div>
                  <span className="font-semibold text-on-surface block text-xs">{seller.name}</span>
                  <span className="text-outline text-[11px] font-mono">{seller.quota} allocated</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-primary font-bold text-xs">{seller.rev}</span>
                  <span className="text-secondary text-[11px] block">{seller.fill} Fill</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-high/60 border border-surface-container-highest flex items-center justify-between text-xs font-mono">
            <span className="text-outline">Optimization Status:</span>
            <span className="text-secondary font-bold">Yield Maximized (Global Optimal)</span>
          </div>
        </div>
      </div>

      {/* Compact Algorithm Intelligence Section */}
      <div className="rounded-xl p-5 bg-surface-container-low border border-surface-container/60 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <h3 className="font-title-sm text-title-sm font-bold text-on-surface">
              Algorithm Intelligence Status
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-medium">
              DAA Engine Active
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('benchmark-lab')}
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
            >
              Benchmark Lab &rarr;
            </button>
            <button
              onClick={() => onNavigate('complexity-analyzer')}
              className="text-xs font-mono text-tertiary hover:underline flex items-center gap-1"
            >
              Complexity Analyzer &rarr;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          <button
            onClick={() => onNavigate('allocation-optimizer')}
            className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container/40 text-left hover:border-primary/50 transition-all"
          >
            <span className="text-[10px] text-on-surface-variant block uppercase">Bounded Knapsack</span>
            <span className="font-bold text-primary block mt-0.5">DP Solver</span>
            <span className="text-[10px] text-emerald-400 block mt-1">O(n·W) Optimal</span>
          </button>

          <button
            onClick={() => onNavigate('group-booking')}
            className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container/40 text-left hover:border-primary/50 transition-all"
          >
            <span className="text-[10px] text-on-surface-variant block uppercase">Group Quota</span>
            <span className="font-bold text-amber-300 block mt-0.5">Greedy Ratio</span>
            <span className="text-[10px] text-on-surface-variant block mt-1">O(m log m) Fast</span>
          </button>

          <button
            onClick={() => onNavigate('dsa-visualizer')}
            className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container/40 text-left hover:border-primary/50 transition-all"
          >
            <span className="text-[10px] text-on-surface-variant block uppercase">Pass Indexing</span>
            <span className="font-bold text-cyan-400 block mt-0.5">Red-Black Tree</span>
            <span className="text-[10px] text-emerald-400 block mt-1">O(log n) Balanced</span>
          </button>

          <button
            onClick={() => onNavigate('event-conflicts')}
            className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container/40 text-left hover:border-primary/50 transition-all"
          >
            <span className="text-[10px] text-on-surface-variant block uppercase">Slot Conflict</span>
            <span className="font-bold text-secondary block mt-0.5">Interval Tree</span>
            <span className="text-[10px] text-emerald-400 block mt-1">O(log n + k) Detect</span>
          </button>

          <button
            onClick={() => onNavigate('heap-comparison')}
            className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container/40 text-left hover:border-primary/50 transition-all"
          >
            <span className="text-[10px] text-on-surface-variant block uppercase">VIP Dispatch</span>
            <span className="font-bold text-tertiary block mt-0.5">Binary & Fib Heap</span>
            <span className="text-[10px] text-on-surface-variant block mt-1">O(1) / O(log n)</span>
          </button>

          <button
            onClick={() => onNavigate('benchmark-lab')}
            className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container/40 text-left hover:border-primary/50 transition-all"
          >
            <span className="text-[10px] text-on-surface-variant block uppercase">System Health</span>
            <span className="font-bold text-emerald-400 block mt-0.5">All 9 Labs Ready</span>
            <span className="text-[10px] text-on-surface-variant block mt-1">Empirical Verified</span>
          </button>
        </div>
      </div>
    </div>
  );
};
