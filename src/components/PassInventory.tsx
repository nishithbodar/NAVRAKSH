import React, { useState } from 'react';
import { PassRecord } from '../types.ts';

const SAMPLE_PASSES: PassRecord[] = [
  { id: '1032', holder: 'Aarav Joshi', phone: '+91 98251 10328', tier: 'Royal Lounge Platinum', nights: 'All 9 Nights', gate: 'Gate A1 (VIP Fastrack)', hash: '0x99F4A7C1', status: 'ACTIVE', seller: 'Karnavati Garba Hub', priceInr: 15000, rfidToken: 'RFID-10328-PL' },
  { id: '1016', holder: 'Kavita Dave', phone: '+91 98790 10164', tier: 'Heritage Garba Access', nights: 'Night 1-4 Suite', gate: 'Gate B2 (Turnstile)', hash: '0x88B3E42D', status: 'SCANNED', seller: 'Sarkhej Youth Club', priceInr: 8000, rfidToken: 'RFID-10164-HG' },
  { id: '1008', holder: 'Devang Parikh', phone: '+91 97230 10082', tier: 'Garba Arena Regular', nights: 'Night 5 (Maha Garba)', gate: 'Gate C4 (General)', hash: '0x17A9F091', status: 'ACTIVE', seller: 'Navrangpura Agency', priceInr: 1200, rfidToken: 'RFID-10082-AR' },
  { id: '1024', holder: 'Rahul Patel', phone: '+91 98250 84291', tier: 'Madhratri Gold Tier', nights: 'Night 1 to 9 Season', gate: 'Gate A3 (Priority)', hash: '0x43D211BA', status: 'SCANNED', seller: 'Karnavati Garba Hub', priceInr: 4500, rfidToken: 'RFID-84291-C2' },
  { id: '1056', holder: 'Nirav Trivedi', phone: '+91 99099 44219', tier: 'Heritage Pass Deluxe', nights: 'Night 7-9 Finale', gate: 'Gate B1 (VIP)', hash: '0x22F43C09', status: 'ACTIVE', seller: 'Maninagar Pass Desk', priceInr: 7000, rfidToken: 'RFID-44219-DL' },
  { id: '1040', holder: 'Priya Shah', phone: '+91 98240 99120', tier: 'Saibo Diamond Pavillion', nights: 'Night 6 (Sharad Purnima)', gate: 'Gate A1 (VIP Fastrack)', hash: '0xDF8109EA', status: 'ACTIVE', seller: 'Bopal Online Outlet', priceInr: 12000, rfidToken: 'RFID-99120-DM' },
  { id: '1036', holder: 'Ananya Vyas', phone: '+91 98980 10360', tier: 'Swara Mandir Premium', nights: 'Night 3 Festive', gate: 'Gate B3 (Turnstile)', hash: '0x55E90288', status: 'ACTIVE', seller: 'Vastrapur Campus Booth', priceInr: 3500, rfidToken: 'RFID-10360-SM' },
  { id: '1048', holder: 'Hardik Chauhan', phone: '+91 98255 10488', tier: 'Mahotsav VIP Club', nights: 'Night 8 Special', gate: 'Gate A2 (Priority)', hash: '0x66AB4510', status: 'ACTIVE', seller: 'Karnavati Garba Hub', priceInr: 6000, rfidToken: 'RFID-10488-VC' },
  { id: '1072', holder: 'Bina Vora', phone: '+91 99740 10724', tier: 'Khelaiya Gold Access', nights: 'Night 9 Dussehra Eve', gate: 'Gate C1 (Standard)', hash: '0x44CD117E', status: 'ACTIVE', seller: 'Sarkhej Youth Club', priceInr: 3000, rfidToken: 'RFID-10724-KG' },
  { id: '1088', holder: 'Tanmay Mehta', phone: '+91 98252 10889', tier: 'Aangan Regular Pass', nights: 'Night 4 Mid-Week', gate: 'Gate C2 (Standard)', hash: '0x99238FF0', status: 'QUARANTINED', seller: 'Vastrapur Campus Booth', priceInr: 1000, rfidToken: 'RFID-10889-AG' },
  { id: '1042', holder: 'Rohan Deshmukh', phone: '+91 98241 10422', tier: 'FastTrack Festive Pass', nights: 'Night 6 Special', gate: 'Gate B1 (VIP)', hash: '0xAA84FD12', status: 'ACTIVE', seller: 'Navrangpura Agency', priceInr: 5500, rfidToken: 'RFID-10422-FT' },
  { id: '1065', holder: 'Meera Desai', phone: '+91 98244 65102', tier: 'Garba Arena Regular', nights: 'Night 6 (Sharad Purnima)', gate: 'Gate 02 (Main Entry)', hash: '0x65102ABC', status: 'SCANNED', seller: 'Navrangpura Agency', priceInr: 1500, rfidToken: 'RFID-65102-AR' },
  { id: '1031', holder: 'Sanjay Rawal', phone: '+91 98791 31994', tier: 'Heritage Pass Deluxe', nights: 'Night 1 to 9 Season', gate: 'Gate 03 (East Concourse)', hash: '0x31994FED', status: 'SCANNED', seller: 'Sarkhej Youth Club', priceInr: 9500, rfidToken: 'RFID-31994-HD' },
];

export const PassInventory: React.FC = () => {
  const [passes, setPasses] = useState<PassRecord[]>(SAMPLE_PASSES);
  const [search, setSearch] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPass, setSelectedPass] = useState<PassRecord | null>(SAMPLE_PASSES[0]);
  const [showIssueModal, setShowIssueModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Pass Form state
  const [newHolder, setNewHolder] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newTier, setNewTier] = useState<string>('Royal Lounge Platinum');
  const [newNights, setNewNights] = useState<string>('All 9 Nights');
  const [newGate, setNewGate] = useState<string>('Gate A1 (VIP Fastrack)');
  const [newSeller, setNewSeller] = useState<string>('Karnavati Garba Hub');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredPasses = passes.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.holder.toLowerCase().includes(search.toLowerCase()) ||
      p.hash.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchesTier = tierFilter === 'all' || p.tier.toLowerCase().includes(tierFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleUpdateStatus = (newStatus: 'ACTIVE' | 'SCANNED' | 'QUARANTINED') => {
    if (!selectedPass) return;
    setPasses((prev) =>
      prev.map((p) => (p.id === selectedPass.id ? { ...p, status: newStatus } : p))
    );
    setSelectedPass((prev) => (prev ? { ...prev, status: newStatus } : null));
    showToast(`Pass #${selectedPass.id} status updated to ${newStatus}.`);
  };

  const handleIssuePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolder.trim()) return;

    const nextId = String(Math.floor(1000 + Math.random() * 9000));
    const randomHash = '0x' + Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase();
    const createdPass: PassRecord = {
      id: nextId,
      holder: newHolder.trim(),
      phone: newPhone.trim() || '+91 98000 ' + nextId,
      tier: newTier,
      nights: newNights,
      gate: newGate,
      hash: randomHash,
      status: 'ACTIVE',
      seller: newSeller,
      priceInr: newTier.includes('Platinum') ? 15000 : newTier.includes('Diamond') ? 12000 : 4500,
      rfidToken: `RFID-${nextId}-NF`,
    };

    setPasses((prev) => [createdPass, ...prev]);
    setSelectedPass(createdPass);
    setShowIssueModal(false);
    setNewHolder('');
    setNewPhone('');
    showToast(`Digital Pass #${nextId} issued successfully for ${createdPass.holder}!`);
  };

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-primary text-on-primary font-medium text-sm shadow-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
              Pass Registry &amp; Inventory
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs text-primary font-mono">24,890 Total Issued</span>
          </div>
          <h1 className="font-headline-xl text-on-surface">Pass Inventory Management</h1>
          <p className="font-body-md text-on-surface-variant">
            Comprehensive digital pass records with cryptographic tamper-proofing and gate assignment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search Pass ID, Holder, Phone..."
            className="bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container font-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none"
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
          >
            <option value="all">All Tiers</option>
            <option value="platinum">Platinum / VIP</option>
            <option value="gold">Gold Tiers</option>
            <option value="heritage">Heritage Tiers</option>
            <option value="regular">Regular Arena</option>
          </select>
          <select
            className="bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="SCANNED">Scanned</option>
            <option value="QUARANTINED">Quarantined</option>
          </select>

          <button
            type="button"
            onClick={() => setShowIssueModal(true)}
            className="px-3 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/90 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Issue Pass</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const headers = ['Pass ID', 'Holder', 'Phone', 'Tier', 'Access Nights', 'Gate', 'Hash', 'Status', 'Seller', 'Price INR'];
              const rows = filteredPasses.map((p) => [
                `"${p.id}"`,
                `"${p.holder}"`,
                `"${p.phone}"`,
                `"${p.tier}"`,
                `"${p.nights}"`,
                `"${p.gate}"`,
                `"${p.hash}"`,
                `"${p.status}"`,
                `"${p.seller}"`,
                p.priceInr,
              ]);
              const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `navraksh_pass_inventory_${new Date().toISOString().slice(0, 10)}.csv`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              showToast('Pass inventory CSV exported successfully.');
            }}
            className="px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-mono font-medium flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Table of Passes (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl border border-surface-container/60 overflow-hidden shadow-md">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md">
              <thead>
                <tr className="bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase font-mono border-b border-surface-container">
                  <th className="py-3 px-4">Pass ID</th>
                  <th className="py-3 px-4">Holder</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Access Nights</th>
                  <th className="py-3 px-4">Gate</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/40">
                {filteredPasses.map((pass) => (
                  <tr
                    key={pass.id}
                    onClick={() => setSelectedPass(pass)}
                    className={`cursor-pointer transition-colors ${
                      selectedPass?.id === pass.id
                        ? 'bg-surface-container-highest/80'
                        : 'hover:bg-surface-container-high/40'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-primary">#{pass.id}</td>
                    <td className="py-3 px-4 font-semibold text-on-surface">{pass.holder}</td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">{pass.tier}</td>
                    <td className="py-3 px-4 text-xs font-mono text-outline">{pass.nights}</td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">{pass.gate}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          pass.status === 'ACTIVE'
                            ? 'bg-secondary/10 text-secondary'
                            : pass.status === 'SCANNED'
                            ? 'bg-primary-container/20 text-primary'
                            : 'bg-error-container/30 text-error'
                        }`}
                      >
                        {pass.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Pass Details & Actions (4 cols) */}
        {selectedPass && (
          <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-md border border-surface-container/60 shadow-md space-y-space-md flex flex-col justify-between">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between border-b border-surface-container pb-2">
                <span className="font-headline-sm text-sm font-bold text-primary font-mono">
                  PASS #{selectedPass.id}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                    selectedPass.status === 'ACTIVE'
                      ? 'bg-secondary/10 text-secondary'
                      : selectedPass.status === 'SCANNED'
                      ? 'bg-primary-container/20 text-primary'
                      : 'bg-error-container/30 text-error'
                  }`}
                >
                  {selectedPass.status}
                </span>
              </div>

              {/* QR Code visual preview */}
              <div className="p-4 bg-white rounded-xl flex flex-col items-center justify-center space-y-2 shadow-inner">
                <div className="w-36 h-36 border-4 border-black p-2 flex flex-col justify-between bg-white">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 bg-black flex items-center justify-center">
                      <div className="w-4 h-4 bg-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-black" />
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-black flex items-center justify-center">
                      <div className="w-4 h-4 bg-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-black" />
                      </div>
                    </div>
                  </div>
                  <div className="text-[8px] font-mono text-center text-black font-bold">
                    NAVRAKSH 2026 #{selectedPass.id}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-8 h-8 bg-black flex items-center justify-center">
                      <div className="w-4 h-4 bg-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-black" />
                      </div>
                    </div>
                    <div className="w-6 h-6 border-2 border-black flex flex-wrap gap-0.5 p-0.5">
                      <div className="w-1.5 h-1.5 bg-black" />
                      <div className="w-1.5 h-1.5 bg-black" />
                      <div className="w-1.5 h-1.5 bg-black" />
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-800">
                  Signature: {selectedPass.hash}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">Attendee:</span>
                  <span className="font-bold text-on-surface">{selectedPass.holder}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">Phone:</span>
                  <span className="text-on-surface">{selectedPass.phone}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">Tier:</span>
                  <span className="text-primary font-bold">{selectedPass.tier}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">RFID Token:</span>
                  <span className="text-on-surface">{selectedPass.rfidToken}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">Authorized Portal:</span>
                  <span className="text-on-surface">{selectedPass.gate}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">Origin Seller:</span>
                  <span className="text-secondary">{selectedPass.seller}</span>
                </div>
              </div>

              {/* Status Update Quick Buttons */}
              <div className="pt-2 border-t border-surface-container/60 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('ACTIVE')}
                  className="flex-1 py-1.5 rounded bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-mono font-semibold"
                >
                  Activate
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('SCANNED')}
                  className="flex-1 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-mono font-semibold"
                >
                  Mark Scanned
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('QUARANTINED')}
                  className="flex-1 py-1.5 rounded bg-error-container/20 hover:bg-error-container/30 text-error text-[11px] font-mono font-semibold"
                >
                  Quarantine
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast(`NFC Wristband re-issued for Pass #${selectedPass.id}`)}
              className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-secondary-container transition-colors shadow-sm font-mono mt-3"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Re-Issue NFC Wristband</span>
            </button>
          </div>
        )}
      </div>

      {/* Issue Pass Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-surface-container max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">
                Issue New Digital Pass
              </h2>
              <button
                type="button"
                onClick={() => setShowIssueModal(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleIssuePass} className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-outline block mb-1">Attendee Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Solanki"
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  value={newHolder}
                  onChange={(e) => setNewHolder(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-outline block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98250 12345"
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-outline block mb-1">Pass Tier</label>
                  <select
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none"
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value)}
                  >
                    <option value="Royal Lounge Platinum">Royal Lounge Platinum (₹15,000)</option>
                    <option value="Saibo Diamond Pavillion">Saibo Diamond Pavillion (₹12,000)</option>
                    <option value="Heritage Garba Access">Heritage Garba Access (₹8,000)</option>
                    <option value="Mahotsav VIP Club">Mahotsav VIP Club (₹6,000)</option>
                    <option value="Madhratri Gold Tier">Madhratri Gold Tier (₹4,500)</option>
                    <option value="Garba Arena Regular">Garba Arena Regular (₹1,500)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-outline block mb-1">Nights Access</label>
                  <select
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none"
                    value={newNights}
                    onChange={(e) => setNewNights(e.target.value)}
                  >
                    <option value="All 9 Nights">All 9 Nights (Season)</option>
                    <option value="Night 1-4 Suite">Night 1-4 Suite</option>
                    <option value="Night 5 (Maha Garba)">Night 5 (Maha Garba)</option>
                    <option value="Night 6 (Sharad Purnima)">Night 6 (Sharad Purnima)</option>
                    <option value="Night 7-9 Finale">Night 7-9 Finale</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-outline block mb-1">Portal / Gate</label>
                  <select
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none"
                    value={newGate}
                    onChange={(e) => setNewGate(e.target.value)}
                  >
                    <option value="Gate A1 (VIP Fastrack)">Gate A1 (VIP Fastrack)</option>
                    <option value="Gate A2 (Priority)">Gate A2 (Priority)</option>
                    <option value="Gate B1 (VIP)">Gate B1 (VIP)</option>
                    <option value="Gate B2 (Turnstile)">Gate B2 (Turnstile)</option>
                    <option value="Gate C1 (Standard)">Gate C1 (Standard)</option>
                    <option value="Gate C4 (General)">Gate C4 (General)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-outline block mb-1">Issuing Seller</label>
                  <select
                    className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface focus:outline-none"
                    value={newSeller}
                    onChange={(e) => setNewSeller(e.target.value)}
                  >
                    <option value="Karnavati Garba Hub">Karnavati Garba Hub</option>
                    <option value="Sarkhej Youth Club">Sarkhej Youth Club</option>
                    <option value="Navrangpura Agency">Navrangpura Agency</option>
                    <option value="Maninagar Pass Desk">Maninagar Pass Desk</option>
                    <option value="Bopal Online Outlet">Bopal Online Outlet</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 rounded-lg hover:bg-surface-container text-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Generate Pass &amp; Hash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
