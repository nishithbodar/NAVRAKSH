import React, { useState } from 'react';

interface PassRecord {
  id: string;
  holder: string;
  tier: string;
  nights: string;
  gate: string;
  hash: string;
  status: 'ACTIVE' | 'SCANNED' | 'QUARANTINED';
  seller: string;
}

const SAMPLE_PASSES: PassRecord[] = [
  { id: '1032', holder: 'Aarav Joshi', tier: 'Royal Lounge Platinum', nights: 'All 9 Nights', gate: 'Gate A1 (VIP Fastrack)', hash: '0x99F4A7C1', status: 'ACTIVE', seller: 'Karnavati Garba Hub' },
  { id: '1016', holder: 'Kavita Dave', tier: 'Heritage Garba Access', nights: 'Night 1-4 Suite', gate: 'Gate B2 (Turnstile)', hash: '0x88B3E42D', status: 'SCANNED', seller: 'Sarkhej Youth Club' },
  { id: '1008', holder: 'Devang Parikh', tier: 'Garba Arena Regular', nights: 'Night 5 (Maha Garba)', gate: 'Gate C4 (General)', hash: '0x17A9F091', status: 'ACTIVE', seller: 'Navrangpura Agency' },
  { id: '1024', holder: 'Rahul Patel', tier: 'Madhratri Gold Tier', nights: 'Night 1 to 9 Season', gate: 'Gate A3 (Priority)', hash: '0x43D211BA', status: 'SCANNED', seller: 'Karnavati Garba Hub' },
  { id: '1056', holder: 'Nirav Trivedi', tier: 'Heritage Pass Deluxe', nights: 'Night 7-9 Finale', gate: 'Gate B1 (VIP)', hash: '0x22F43C09', status: 'ACTIVE', seller: 'Maninagar Desk' },
  { id: '1040', holder: 'Priya Shah', tier: 'Saibo Diamond Pavillion', nights: 'Night 6 (Sharad Purnima)', gate: 'Gate A1 (VIP Fastrack)', hash: '0xDF8109EA', status: 'ACTIVE', seller: 'Bopal Online' },
  { id: '1036', holder: 'Ananya Vyas', tier: 'Swara Mandir Premium', nights: 'Night 3 Festive', gate: 'Gate B3 (Turnstile)', hash: '0x55E90288', status: 'ACTIVE', seller: 'Vastrapur Campus' },
  { id: '1048', holder: 'Hardik Chauhan', tier: 'Mahotsav VIP Club', nights: 'Night 8 Special', gate: 'Gate A2 (Priority)', hash: '0x66AB4510', status: 'ACTIVE', seller: 'Karnavati Garba Hub' },
  { id: '1072', holder: 'Bina Vora', tier: 'Khelaiya Gold Access', nights: 'Night 9 Dussehra Eve', gate: 'Gate C1 (Standard)', hash: '0x44CD117E', status: 'ACTIVE', seller: 'Sarkhej Youth Club' },
  { id: '1088', holder: 'Tanmay Mehta', tier: 'Aangan Regular Pass', nights: 'Night 4 Mid-Week', gate: 'Gate C2 (Standard)', hash: '0x99238FF0', status: 'QUARANTINED', seller: 'Vastrapur Campus' },
];

export const PassInventory: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [selectedPass, setSelectedPass] = useState<PassRecord | null>(SAMPLE_PASSES[0]);

  const filteredPasses = SAMPLE_PASSES.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.holder.toLowerCase().includes(search.toLowerCase()) ||
      p.hash.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'all' || p.tier.toLowerCase().includes(tierFilter.toLowerCase());
    return matchesSearch && matchesTier;
  });

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
        <div>
          <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
            Canonical Pass Manifest
          </span>
          <h1 className="font-headline-xl text-on-surface">Pass Inventory Management</h1>
          <p className="font-body-md text-on-surface-variant">
            Indexed into 24,890 RBT Leaves with hardware-accelerated SHA256 integrity signatures.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Pass ID, Holder..."
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
          <button
            type="button"
            onClick={() => {
              const headers = ['Pass ID', 'Holder', 'Tier', 'Access Nights', 'Gate', 'Hash', 'Status', 'Seller'];
              const rows = filteredPasses.map(p => [
                `"${p.id}"`,
                `"${p.holder}"`,
                `"${p.tier}"`,
                `"${p.nights}"`,
                `"${p.gate}"`,
                `"${p.hash}"`,
                `"${p.status}"`,
                `"${p.seller}"`
              ]);
              const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `navraksh_pass_inventory_${new Date().toISOString().slice(0, 10)}.csv`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-2 rounded-lg bg-primary-container text-on-primary-container text-xs font-mono font-bold flex items-center gap-1 hover:bg-secondary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Download CSV</span>
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

        {/* Selected Pass Details & QR Preview (4 cols) */}
        {selectedPass && (
          <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-md border border-surface-container/60 shadow-md space-y-space-md flex flex-col justify-between">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between border-b border-surface-container pb-2">
                <span className="font-headline-sm text-sm font-bold text-primary font-mono">
                  PASS #{selectedPass.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-surface-container-high text-secondary font-mono">
                  {selectedPass.status}
                </span>
              </div>

              {/* QR Code visual simulation */}
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
                  SHA256: {selectedPass.hash}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">Attendee:</span>
                  <span className="font-bold text-on-surface">{selectedPass.holder}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-surface-container-lowest">
                  <span className="text-outline">Tier:</span>
                  <span className="text-primary font-bold">{selectedPass.tier}</span>
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
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-secondary-container transition-colors shadow-sm font-mono"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Re-Issue NFC Wristband</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
