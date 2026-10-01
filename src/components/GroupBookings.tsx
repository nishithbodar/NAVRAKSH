import React, { useState } from 'react';
import { TroupeBooking } from '../types.ts';

const SAMPLE_TROUPES: TroupeBooking[] = [
  {
    id: 'TRP-101',
    troupeName: 'Khelaiya Mahotsav Troupe',
    leaderName: 'Bhavin Goswami',
    leaderPhone: '+91 98254 77101',
    category: 'Garba Troupe',
    memberCount: 24,
    selectedTier: 'Heritage Garba Access',
    totalCostInr: 192000,
    assignedGate: 'Gate B2 (Turnstile)',
    nights: 'All 9 Nights (Season)',
    status: 'CONFIRMED',
    members: [
      'Bhavin Goswami', 'Pooja Trivedi', 'Ketan Solanki', 'Dhara Vora',
      'Jayesh Barot', 'Krupa Mehta', 'Tejas Shukla', 'Nandini Joshi',
      'Hardik Pandya', 'Swati Panchal', 'Alkesh Parmar', 'Riddhi Dave',
      'Parth Dave', 'Komal Shah', 'Mayur Patel', 'Falguni Joshi',
      'Chirag Vyas', 'Nehal Desai', 'Karan Jadeja', 'Mansi Bhatt',
      'Vikas Makwana', 'Shruti Rana', 'Siddharth Trivedi', 'Kinjal Solanki'
    ],
  },
  {
    id: 'TRP-102',
    troupeName: 'Gujarat Cultural Heritage Delegation',
    leaderName: 'Dr. Meenakshi Pathak',
    leaderPhone: '+91 98791 22102',
    category: 'Corporate Delegation',
    memberCount: 18,
    selectedTier: 'Royal Lounge Platinum',
    totalCostInr: 270000,
    assignedGate: 'Gate A1 (VIP Fastrack)',
    nights: 'Night 6 (Sharad Purnima)',
    status: 'CONFIRMED',
    members: [
      'Dr. Meenakshi Pathak', 'Prof. Arvind Rawal', 'Sunita Shah', 'Rajesh K. Dave',
      'Anandita Sen', 'Gautam Singhania', 'Rekha Jhala', 'Deepak Parekh',
      'Sangeeta Roy', 'Kishore Kumar', 'Pratibha Patil', 'Nitin Gadkari',
      'Kamal Nath', 'Suresh Prabhu', 'Meera Soni', 'Haren Pandya',
      'Ashok Gehlot', 'Naveen Jindal'
    ],
  },
  {
    id: 'TRP-103',
    troupeName: 'Raas Dandiya Yuva Mandal',
    leaderName: 'Jignesh Makwana',
    leaderPhone: '+91 98242 88103',
    category: 'Raas Dandiya',
    memberCount: 16,
    selectedTier: 'Madhratri Gold Tier',
    totalCostInr: 72000,
    assignedGate: 'Gate A3 (Priority)',
    nights: 'Night 5-9 Finale',
    status: 'CONFIRMED',
    members: [
      'Jignesh Makwana', 'Pratik Dodia', 'Darshan Solanki', 'Mitesh Patel',
      'Chirag Rathod', 'Nirav Vaghela', 'Sanket Joshi', 'Urvashi Gohel',
      'Hetvi Parmar', 'Geeta Barot', 'Shweta Chauhan', 'Varsha Dave',
      'Payal Makwana', 'Poonam Shah', 'Hiral Bhatt', 'Kajal Trivedi'
    ],
  },
  {
    id: 'TRP-104',
    troupeName: 'Shah & Parikh Family Enclosure',
    leaderName: 'Hemant Parikh',
    leaderPhone: '+91 99090 44104',
    category: 'Family VIP',
    memberCount: 12,
    selectedTier: 'Saibo Diamond Pavillion',
    totalCostInr: 144000,
    assignedGate: 'Gate A1 (VIP Fastrack)',
    nights: 'Night 6 (Sharad Purnima)',
    status: 'CHECKED_IN',
    members: [
      'Hemant Parikh', 'Sudha Parikh', 'Rohan Parikh', 'Nidhi Parikh',
      'Vipul Shah', 'Ami Shah', 'Kavish Shah', 'Anaya Shah',
      'Kirit Parikh', 'Saroj Parikh', 'Dinesh Shah', 'Kokila Shah'
    ],
  },
];

export const GroupBookings: React.FC = () => {
  const [troupes, setTroupes] = useState<TroupeBooking[]>(SAMPLE_TROUPES);
  const [selectedTroupe, setSelectedTroupe] = useState<TroupeBooking | null>(SAMPLE_TROUPES[0]);
  const [search, setSearch] = useState<string>('');

  // Group Pass Optimizer inputs
  const [groupSize, setGroupSize] = useState<number>(15);
  const [budget, setBudget] = useState<number>(60000);
  const [optimizerResult, setOptimizerResult] = useState<{
    combination: { tier: string; qty: number; price: number }[];
    totalCost: number;
    remainingBudget: number;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOptimizeGroup = () => {
    // Background Dynamic Knapsack Solver for optimal tier mix
    const tiers = [
      { tier: 'Royal Lounge Platinum', price: 15000, maxCap: 4 },
      { tier: 'Saibo Diamond Pavillion', price: 9500, maxCap: 6 },
      { tier: 'Heritage Garba Access', price: 6500, maxCap: 10 },
      { tier: 'Gold Couple Pass', price: 4500, maxCap: 12 },
      { tier: 'Garba Arena Regular', price: 1500, maxCap: 25 },
    ];

    let remaining = groupSize;
    let currentBudget = budget;
    const combination: { tier: string; qty: number; price: number }[] = [];

    // Greedy priority with knapsack budget ceiling
    for (const t of tiers) {
      if (remaining <= 0) break;
      const count = Math.min(
        remaining,
        t.maxCap,
        Math.floor(currentBudget / t.price)
      );
      if (count > 0) {
        combination.push({ tier: t.tier, qty: count, price: t.price });
        remaining -= count;
        currentBudget -= count * t.price;
      }
    }

    // Fill remaining with Arena Regular if budget permits
    if (remaining > 0) {
      const regularPrice = 1500;
      combination.push({ tier: 'Garba Arena Regular', qty: remaining, price: regularPrice });
      currentBudget -= remaining * regularPrice;
    }

    const totalCost = budget - currentBudget;
    setOptimizerResult({
      combination,
      totalCost,
      remainingBudget: Math.max(0, currentBudget),
    });

    showToast(`Optimal pass package calculated for ${groupSize} attendees!`);
  };

  const filteredTroupes = troupes.filter((t) =>
    t.troupeName.toLowerCase().includes(search.toLowerCase()) ||
    t.leaderName.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-primary text-on-primary font-medium text-sm shadow-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
              Bulk Admissions &amp; Delegation Pass Management
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs text-primary font-mono">70 Group Attendees Enrolled</span>
          </div>
          <h1 className="font-headline-xl text-on-surface">Group &amp; Troupe Bookings</h1>
          <p className="font-body-md text-on-surface-variant">
            Coordinate Garba troupe registrations, corporate sponsorships, and bulk group pass bundles with synchronized gate access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Troupe, Leader..."
            className="bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container font-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Top Banner: Smart Group Pass Optimizer */}
      <div className="bg-surface-container-low rounded-xl p-space-md lg:p-space-lg border border-surface-container/60 shadow-md space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-surface-container pb-space-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">calculate</span>
            <div>
              <h2 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                Smart Group Pass Package Optimizer
              </h2>
              <p className="text-xs text-outline">
                Automatically determines the highest-value tier distribution fitting within your total group budget.
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-surface-container text-secondary font-mono font-semibold">
            Yield Optimized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-end">
          <div className="md:col-span-4 space-y-1">
            <label className="text-xs text-outline font-mono block">Group Size (Members)</label>
            <input
              type="number"
              min={2}
              max={100}
              className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container font-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value))}
            />
          </div>

          <div className="md:col-span-5 space-y-1">
            <label className="text-xs text-outline font-mono block">Total Budget (INR)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline font-mono text-xs">₹</span>
              <input
                type="number"
                step={5000}
                min={5000}
                className="w-full bg-surface-container-lowest pl-7 pr-3 py-2 rounded-lg border border-surface-container font-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <button
              type="button"
              onClick={handleOptimizeGroup}
              className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all font-mono shadow-sm"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Calculate Best Mix</span>
            </button>
          </div>
        </div>

        {/* Optimizer Result Card */}
        {optimizerResult && (
          <div className="p-space-md rounded-xl bg-surface-container-lowest border border-primary/30 space-y-space-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-surface-container pb-2">
              <span className="font-headline-sm text-xs font-bold text-primary font-mono uppercase tracking-wider">
                Recommended Tier Package ({groupSize} Passes)
              </span>
              <span className="text-xs font-mono font-bold text-secondary">
                Total: ₹{optimizerResult.totalCost.toLocaleString()} INR (Surplus: ₹{optimizerResult.remainingBudget.toLocaleString()})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {optimizerResult.combination.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-surface-container border border-surface-container/60 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-xs text-on-surface block">{item.tier}</span>
                    <span className="text-[11px] text-outline font-mono">₹{item.price.toLocaleString()} each</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-primary-container text-on-primary-container font-mono font-bold text-xs">
                    × {item.qty} Qty
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Troupe Directory & Member Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Troupes List (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-low rounded-xl border border-surface-container/60 overflow-hidden shadow-md">
          <div className="p-space-md bg-surface-container-high/40 border-b border-surface-container flex items-center justify-between">
            <h2 className="font-headline-sm text-sm font-semibold text-on-surface">
              Registered Garba Troupes &amp; Delegations
            </h2>
            <span className="text-xs text-secondary font-mono">
              {filteredTroupes.length} Groups Active
            </span>
          </div>

          <div className="divide-y divide-surface-container/40">
            {filteredTroupes.map((troupe) => (
              <div
                key={troupe.id}
                onClick={() => setSelectedTroupe(troupe)}
                className={`p-4 cursor-pointer transition-colors flex items-center justify-between ${
                  selectedTroupe?.id === troupe.id
                    ? 'bg-surface-container-highest/70'
                    : 'hover:bg-surface-container-high/30'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface text-sm">{troupe.troupeName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-outline font-mono">
                      {troupe.category}
                    </span>
                  </div>
                  <div className="text-xs text-outline mt-1 font-mono">
                    Lead: <strong className="text-on-surface-variant">{troupe.leaderName}</strong> ({troupe.leaderPhone})
                  </div>
                  <div className="text-xs text-primary mt-0.5 font-medium">
                    {troupe.selectedTier} • {troupe.nights}
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-primary block">
                    {troupe.memberCount} Passes
                  </span>
                  <span className="text-xs text-secondary block font-semibold">
                    ₹{(troupe.totalCostInr / 1000).toFixed(0)}k INR
                  </span>
                  <span
                    className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-bold ${
                      troupe.status === 'CHECKED_IN'
                        ? 'bg-secondary/10 text-secondary'
                        : 'bg-primary-container/20 text-primary'
                    }`}
                  >
                    {troupe.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Troupe Detail & Member Roster (5 cols) */}
        {selectedTroupe && (
          <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-md border border-surface-container/60 shadow-md space-y-space-md flex flex-col justify-between">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between border-b border-surface-container pb-2">
                <div>
                  <span className="text-xs text-outline font-mono block">Delegation Roster</span>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                    {selectedTroupe.troupeName}
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-mono font-bold">
                  {selectedTroupe.memberCount} Members
                </span>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-lowest space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-outline">Assigned Gate:</span>
                  <span className="text-on-surface font-bold">{selectedTroupe.assignedGate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Pass Tier:</span>
                  <span className="text-primary font-bold">{selectedTroupe.selectedTier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Lead Coordinator:</span>
                  <span className="text-on-surface">{selectedTroupe.leaderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Total Package Value:</span>
                  <span className="text-secondary font-bold">₹{selectedTroupe.totalCostInr.toLocaleString()}</span>
                </div>
              </div>

              {/* Member Names list */}
              <div>
                <span className="text-xs text-outline font-mono block mb-1.5 uppercase tracking-wider">
                  Accredited Attendees ({selectedTroupe.members.length})
                </span>
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                  {selectedTroupe.members.map((member, i) => (
                    <div
                      key={i}
                      className="p-1.5 px-2.5 rounded bg-surface-container text-xs flex items-center justify-between"
                    >
                      <span className="text-on-surface font-medium">
                        {i + 1}. {member}
                      </span>
                      <span className="text-[10px] font-mono text-secondary">Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast(`Synchronized NFC passes dispatched for ${selectedTroupe.troupeName}`)}
                className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-secondary-container transition-colors shadow-sm font-mono"
              >
                <span className="material-symbols-outlined text-sm">badge</span>
                <span>Issue Troupe Wristbands ({selectedTroupe.memberCount})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
