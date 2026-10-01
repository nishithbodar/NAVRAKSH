import React, { useState } from 'react';
import { PriorityRequest } from '../types.ts';

const SAMPLE_REQUESTS: PriorityRequest[] = [
  {
    id: 'REQ-901',
    category: 'VIP Pass',
    requestor: 'Rajya Sabha Secretariat',
    details: 'Urgent 4x Royal Lounge Platinum passes for Parliamentary delegation.',
    priorityScore: 5,
    timestamp: '20:12:10 IST',
    status: 'PENDING',
  },
  {
    id: 'REQ-902',
    category: 'Seller Quota',
    requestor: 'Karnavati Garba Hub (Seller A)',
    details: 'Emergency +150 pass quota release due to queue surge at West Counter.',
    priorityScore: 4,
    timestamp: '20:13:40 IST',
    status: 'PENDING',
  },
  {
    id: 'REQ-903',
    category: 'Emergency Access',
    requestor: 'Ahmedabad Police Commissionerate',
    details: 'Escort vehicle & quick-turnstile RFID passes for Zone 4 patrol team.',
    priorityScore: 5,
    timestamp: '20:14:00 IST',
    status: 'PENDING',
  },
  {
    id: 'REQ-904',
    category: 'Troupe Bulk',
    requestor: 'Bhavin Goswami (Khelaiya Troupe)',
    details: 'Requesting 2 additional accompanist musician passes for evening stage entry.',
    priorityScore: 3,
    timestamp: '20:10:15 IST',
    status: 'PENDING',
  },
  {
    id: 'REQ-905',
    category: 'VIP Pass',
    requestor: 'Gujarat Chamber of Commerce',
    details: 'Presidential guest couple passes for Night 6 Maha Aarti.',
    priorityScore: 4,
    timestamp: '20:08:50 IST',
    status: 'DISPATCHED',
  },
  {
    id: 'REQ-906',
    category: 'Seller Quota',
    requestor: 'Sarkhej Youth Club (Seller B)',
    details: '+100 passes for highway corporate sponsors.',
    priorityScore: 2,
    timestamp: '20:05:12 IST',
    status: 'DISPATCHED',
  },
];

export const PriorityQueue: React.FC = () => {
  const [requests, setRequests] = useState<PriorityRequest[]>(SAMPLE_REQUESTS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Request modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newRequestor, setNewRequestor] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'VIP Pass' | 'Seller Quota' | 'Emergency Access' | 'Troupe Bulk'>('VIP Pass');
  const [newScore, setNewScore] = useState<number>(5);
  const [newDetails, setNewDetails] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sort queue by priority score (descending) and timestamp (earliest first)
  const sortedRequests = [...requests].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'PENDING' ? -1 : 1;
    }
    return b.priorityScore - a.priorityScore;
  });

  const filteredRequests = sortedRequests.filter((r) =>
    filterCategory === 'all' || r.category === filterCategory
  );

  const handleDispatchTop = () => {
    const topPending = sortedRequests.find((r) => r.status === 'PENDING');
    if (!topPending) {
      showToast('All pending priority requests have been dispatched.');
      return;
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === topPending.id ? { ...r, status: 'DISPATCHED' } : r))
    );
    showToast(`Highest priority request #${topPending.id} (${topPending.requestor}) approved & dispatched!`);
  };

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'DISPATCHED' } : r))
    );
    showToast(`Request #${id} approved.`);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestor.trim()) return;

    const nextId = `REQ-${Math.floor(910 + Math.random() * 80)}`;
    const newReq: PriorityRequest = {
      id: nextId,
      category: newCategory,
      requestor: newRequestor.trim(),
      details: newDetails.trim() || 'Priority issuance requested by operations desk.',
      priorityScore: newScore,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
      status: 'PENDING',
    };

    setRequests((prev) => [newReq, ...prev]);
    setShowAddModal(false);
    setNewRequestor('');
    setNewDetails('');
    showToast(`Priority request #${nextId} placed in queue with Rank ${newScore}!`);
  };

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const highPriorityCount = requests.filter((r) => r.status === 'PENDING' && r.priorityScore >= 4).length;

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg">
      {/* Toast */}
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
              Priority Dispatch Engine
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs text-primary font-mono">{pendingCount} Requests Pending</span>
          </div>
          <h1 className="font-headline-xl text-on-surface">VIP Priority &amp; Rush Queue</h1>
          <p className="font-body-md text-on-surface-variant">
            Automated priority ranking for urgent VIP delegations, emergency quotas, and expedited gate credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDispatchTop}
            className="px-3.5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/90 transition-all shadow-md font-mono"
          >
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>Dispatch Highest Priority</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors border border-surface-container-highest/60"
          >
            <span className="material-symbols-outlined text-sm text-secondary">add_circle</span>
            <span>+ New Request</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-outline font-mono uppercase block">Active Queue Size</span>
            <span className="font-headline-xl text-on-surface font-bold font-mono">{pendingCount}</span>
            <span className="text-xs text-primary block mt-0.5 font-medium">Rank-ordered dispatcher</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">format_list_numbered</span>
          </div>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-outline font-mono uppercase block">Urgent (Rank 4-5)</span>
            <span className="font-headline-xl text-secondary font-bold font-mono">{highPriorityCount}</span>
            <span className="text-xs text-secondary block mt-0.5 font-medium">Expedited turnstile pass</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined">priority_high</span>
          </div>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-outline font-mono uppercase block">Dispatch Latency</span>
            <span className="font-headline-xl text-primary font-bold font-mono">&lt; 0.1s</span>
            <span className="text-xs text-outline block mt-0.5 font-mono">Immediate token issuance</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-outline">
            <span className="material-symbols-outlined">speed</span>
          </div>
        </div>
      </div>

      {/* Priority Queue Table */}
      <div className="bg-surface-container-low rounded-xl border border-surface-container/60 overflow-hidden shadow-md space-y-0">
        <div className="p-space-md bg-surface-container-high/40 border-b border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">stacked_line_chart</span>
            <h2 className="font-headline-sm text-sm font-semibold text-on-surface">
              Live Priority Dispatch Register
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-outline font-mono">Filter Category:</span>
            <select
              className="bg-surface-container-lowest px-2.5 py-1.5 rounded-lg text-xs border border-surface-container text-on-surface focus:outline-none"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="VIP Pass">VIP Pass</option>
              <option value="Seller Quota">Seller Quota</option>
              <option value="Emergency Access">Emergency Access</option>
              <option value="Troupe Bulk">Troupe Bulk</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-surface-container/40">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm transition-colors ${
                req.status === 'PENDING'
                  ? req.priorityScore >= 5
                    ? 'bg-primary-container/10 hover:bg-primary-container/20'
                    : 'bg-surface-container-lowest hover:bg-surface-container-high/30'
                  : 'bg-surface-container-low opacity-75'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-primary">#{req.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-surface-container font-mono text-outline">
                    {req.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                      req.priorityScore >= 5
                        ? 'bg-error-container/30 text-error'
                        : req.priorityScore === 4
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    Priority Rank {req.priorityScore}
                  </span>
                  <span className="text-[11px] text-outline font-mono">{req.timestamp}</span>
                </div>
                <div className="font-bold text-sm text-on-surface">{req.requestor}</div>
                <p className="text-xs text-on-surface-variant max-w-2xl">{req.details}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {req.status === 'PENDING' ? (
                  <button
                    type="button"
                    onClick={() => handleApprove(req.id)}
                    className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold font-mono hover:bg-secondary-container transition-colors shadow-sm flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                    <span>Approve &amp; Issue</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-secondary/10 text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">done_all</span>
                    <span>Dispatched</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-surface-container max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                Queue High-Priority Request
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-outline block mb-1 font-mono">Requesting Entity / Leader *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Protocol Desk / Zone Officer"
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                  value={newRequestor}
                  onChange={(e) => setNewRequestor(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-outline block mb-1 font-mono">Category</label>
                  <select
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none text-xs"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                  >
                    <option value="VIP Pass">VIP Pass</option>
                    <option value="Seller Quota">Seller Quota</option>
                    <option value="Emergency Access">Emergency Access</option>
                    <option value="Troupe Bulk">Troupe Bulk</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-outline block mb-1 font-mono">Priority Score</label>
                  <select
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none text-xs font-mono"
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                  >
                    <option value={5}>Rank 5 (Urgent / VVIP)</option>
                    <option value={4}>Rank 4 (High Priority)</option>
                    <option value={3}>Rank 3 (Standard Review)</option>
                    <option value={2}>Rank 2 (Low / Backlog)</option>
                    <option value={1}>Rank 1 (Waitlist)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-outline block mb-1 font-mono">Details / Justification</label>
                <textarea
                  rows={3}
                  placeholder="Reason for expedited credential issuance..."
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg hover:bg-surface-container text-outline text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Queue Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
