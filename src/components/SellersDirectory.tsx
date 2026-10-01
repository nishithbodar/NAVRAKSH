import React, { useState } from 'react';
import { SellerAllocation } from '../types.ts';

const SELLERS_DATA: SellerAllocation[] = [
  {
    id: 'A',
    name: 'Karnavati Garba Hub',
    subtitle: 'Tier-1 Mega Partner · Ahmedabad West',
    tier: 'Tier-1',
    location: 'Ahmedabad West (Drive-In / SG Road)',
    trueDemand: 3200,
    currentQuota: 2000,
    optimizedQuota: 2650,
    netShift: 650,
    fillRate: 82.8,
    expRevenueLakhs: 18.55,
    risk: 'Low',
    contactPerson: 'Suresh V. Patel',
    phone: '+91 98251 33001',
  },
  {
    id: 'B',
    name: 'Sarkhej Youth Club',
    subtitle: 'Tier-1 Club Partner · SG Highway Zone',
    tier: 'Tier-1',
    location: 'SG Highway Zone (South Corridor)',
    trueDemand: 2800,
    currentQuota: 2000,
    optimizedQuota: 2400,
    netShift: 400,
    fillRate: 85.7,
    expRevenueLakhs: 16.8,
    risk: 'Low',
    contactPerson: 'Jaydeep Vaghela',
    phone: '+91 98790 44002',
  },
  {
    id: 'C',
    name: 'Navrangpura Agency',
    subtitle: 'Tier-2 Direct Agency · Central City',
    tier: 'Tier-2',
    location: 'Central City (Stadium Crossroad)',
    trueDemand: 2100,
    currentQuota: 2000,
    optimizedQuota: 1950,
    netShift: -50,
    fillRate: 92.8,
    expRevenueLakhs: 13.65,
    risk: 'Low',
    contactPerson: 'Maheshwari Dave',
    phone: '+91 97230 55003',
  },
  {
    id: 'D',
    name: 'Maninagar Pass Desk',
    subtitle: 'Tier-2 Retail Point · South Zone',
    tier: 'Tier-2',
    location: 'South Zone (Kankaria Lake Gate)',
    trueDemand: 1500,
    currentQuota: 1800,
    optimizedQuota: 1450,
    netShift: -350,
    fillRate: 96.6,
    expRevenueLakhs: 10.15,
    risk: 'Minimal',
    contactPerson: 'Hitesh Chauhan',
    phone: '+91 99099 66004',
  },
  {
    id: 'E',
    name: 'Bopal Online Outlet',
    subtitle: 'Tier-3 Web Portal · Suburban Node',
    tier: 'Tier-3',
    location: 'Suburban Node (South Bopal Ring Road)',
    trueDemand: 1200,
    currentQuota: 1200,
    optimizedQuota: 1150,
    netShift: -50,
    fillRate: 95.8,
    expRevenueLakhs: 8.05,
    risk: 'Minimal',
    contactPerson: 'Priyanka Shah',
    phone: '+91 98240 77005',
  },
  {
    id: 'F',
    name: 'Vastrapur Campus Booth',
    subtitle: 'Tier-3 Campus Outlet · Student Desk',
    tier: 'Tier-3',
    location: 'Student Desk (IIM-A Corridor)',
    trueDemand: 900,
    currentQuota: 1000,
    optimizedQuota: 400,
    netShift: -600,
    fillRate: 44.4,
    expRevenueLakhs: 2.8,
    risk: 'Re-routed',
    contactPerson: 'Tanmay Mehta',
    phone: '+91 98252 88006',
  },
];

interface SellersDirectoryProps {
  onNavigateToOptimizer?: () => void;
}

export const SellersDirectory: React.FC<SellersDirectoryProps> = ({ onNavigateToOptimizer }) => {
  const [sellers] = useState<SellerAllocation[]>(SELLERS_DATA);
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = sellers.filter((s) => {
    const matchesTier = tierFilter === 'all' || s.tier === tierFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      (s.contactPerson && s.contactPerson.toLowerCase().includes(search.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  const totalDemand = sellers.reduce((acc, s) => acc + s.trueDemand, 0);
  const totalAllocated = sellers.reduce((acc, s) => acc + s.optimizedQuota, 0);
  const totalRev = sellers.reduce((acc, s) => acc + s.expRevenueLakhs, 0);

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
              Authorized Distribution Network
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs text-primary font-mono">6 Certified Regional Hubs</span>
          </div>
          <h1 className="font-headline-xl text-on-surface">Seller &amp; Partner Network</h1>
          <p className="font-body-md text-on-surface-variant">
            Manage regional partner quotas, verified point-of-sale desks, real-time demand fill rates, and revenue yields.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToOptimizer && (
            <button
              type="button"
              onClick={onNavigateToOptimizer}
              className="px-3.5 py-2 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold flex items-center gap-1.5 hover:bg-secondary-container transition-all shadow-sm font-mono"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Open Quota Optimizer</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 shadow-md">
          <span className="text-xs text-outline font-mono uppercase block">Aggregated Demand</span>
          <div className="font-headline-xl text-on-surface font-bold font-mono">{totalDemand.toLocaleString()} Passes</div>
          <span className="text-xs text-secondary font-mono block mt-1">Verified partner interest</span>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 shadow-md">
          <span className="text-xs text-outline font-mono uppercase block">Active Allocated Pool</span>
          <div className="font-headline-xl text-primary font-bold font-mono">{totalAllocated.toLocaleString()} Passes</div>
          <span className="text-xs text-primary font-mono block mt-1">98.5% Sell-through capacity</span>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 shadow-md">
          <span className="text-xs text-outline font-mono uppercase block">Total Channel Yield</span>
          <div className="font-headline-xl text-secondary font-bold font-mono">₹{totalRev.toFixed(2)} Lakhs</div>
          <span className="text-xs text-secondary font-mono block mt-1">+10.8% optimal distribution gain</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Hub, Location, Contact..."
            className="w-full bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container font-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none"
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
          >
            <option value="all">All Partner Tiers</option>
            <option value="Tier-1">Tier-1 (Mega Partners)</option>
            <option value="Tier-2">Tier-2 (Direct Agencies)</option>
            <option value="Tier-3">Tier-3 (Outlets &amp; Booths)</option>
          </select>
        </div>
      </div>

      {/* Sellers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filtered.map((seller) => (
          <div
            key={seller.id}
            className="bg-surface-container-low rounded-xl p-space-md border border-surface-container/60 shadow-md flex flex-col justify-between space-y-space-md hover:border-primary/40 transition-colors"
          >
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary-container text-on-primary-container">
                  {seller.tier}
                </span>
                <span
                  className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    seller.risk === 'Low'
                      ? 'bg-secondary/10 text-secondary'
                      : seller.risk === 'Minimal'
                      ? 'bg-surface-container text-outline'
                      : 'bg-error-container/20 text-error'
                  }`}
                >
                  {seller.risk} Risk
                </span>
              </div>

              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  {seller.name}
                </h3>
                <p className="text-xs text-outline font-medium mt-0.5">{seller.location}</p>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-lowest space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-outline">True Demand:</span>
                  <span className="font-bold text-on-surface">{seller.trueDemand.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Optimized Quota:</span>
                  <span className="text-primary font-bold">{seller.optimizedQuota.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Net Shift:</span>
                  <span className={seller.netShift >= 0 ? 'text-secondary font-bold' : 'text-outline font-bold'}>
                    {seller.netShift >= 0 ? `+${seller.netShift}` : seller.netShift}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Fill Rate:</span>
                  <span className="text-on-surface">{seller.fillRate}%</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-surface-container">
                  <span className="text-outline">Expected Revenue:</span>
                  <span className="text-secondary font-bold">₹{seller.expRevenueLakhs.toFixed(2)} Lakhs</span>
                </div>
              </div>

              <div className="text-xs text-outline space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>{seller.contactPerson}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>{seller.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-surface-container flex items-center justify-between text-xs font-mono">
              <span className="text-outline">Channel #{seller.id}</span>
              <span className="text-secondary font-semibold">Active &amp; Synced</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
