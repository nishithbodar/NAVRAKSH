import React, { useState } from 'react';

interface ReportRow {
  passId: string;
  attendeeName: string;
  phone: string;
  passTier: string;
  nights: string;
  portalGate: string;
  sellerPartner: string;
  priceInr: number;
  rfidToken: string;
  status: 'ACTIVE' | 'SCANNED' | 'QUARANTINED';
  scanTime: string;
  turnstileId: string;
}

const REPORT_DATA: ReportRow[] = [
  {
    passId: 'NAV-10328',
    attendeeName: 'Aarav Joshi',
    phone: '+91 98251 10328',
    passTier: 'Royal Lounge Platinum',
    nights: 'All 9 Nights (Season)',
    portalGate: 'Gate A1 (VIP Fastrack)',
    sellerPartner: 'Seller A (Karnavati Garba Hub)',
    priceInr: 15000,
    rfidToken: 'RFID-10328-PL',
    status: 'SCANNED',
    scanTime: '2026-10-15 20:14:02 IST',
    turnstileId: 'T-01-VIP',
  },
  {
    passId: 'NAV-84291',
    attendeeName: 'Rahul Patel',
    phone: '+91 98250 84291',
    passTier: 'Gold Couple Pass',
    nights: 'Night 6 (Sharad Purnima)',
    portalGate: 'Gate 02 (Main Public Entry)',
    sellerPartner: 'Seller A (Karnavati Garba Hub)',
    priceInr: 4500,
    rfidToken: 'RFID-84291-C2',
    status: 'SCANNED',
    scanTime: '2026-10-15 20:14:08 IST',
    turnstileId: 'T-02-B',
  },
  {
    passId: 'NAV-10164',
    attendeeName: 'Kavita Dave',
    phone: '+91 98790 10164',
    passTier: 'Heritage Garba Access',
    nights: 'Night 1-4 Suite',
    portalGate: 'Gate B2 (Turnstile)',
    sellerPartner: 'Seller B (Sarkhej Youth Club)',
    priceInr: 8000,
    rfidToken: 'RFID-10164-HG',
    status: 'SCANNED',
    scanTime: '2026-10-15 20:13:12 IST',
    turnstileId: 'T-02-B',
  },
  {
    passId: 'NAV-99120',
    attendeeName: 'Priya Shah',
    phone: '+91 98240 99120',
    passTier: 'Saibo Diamond Pavillion',
    nights: 'Night 6 (Sharad Purnima)',
    portalGate: 'Gate A1 (VIP Fastrack)',
    sellerPartner: 'Seller E (Bopal Online Outlet)',
    priceInr: 12000,
    rfidToken: 'RFID-99120-DM',
    status: 'SCANNED',
    scanTime: '2026-10-15 20:13:45 IST',
    turnstileId: 'T-01-VIP',
  },
  {
    passId: 'NAV-44219',
    attendeeName: 'Nirav Trivedi',
    phone: '+91 99099 44219',
    passTier: 'Heritage Pass Deluxe',
    nights: 'Night 7-9 Finale',
    portalGate: 'Gate B1 (VIP)',
    sellerPartner: 'Seller D (Maninagar Pass Desk)',
    priceInr: 7000,
    rfidToken: 'RFID-44219-DL',
    status: 'ACTIVE',
    scanTime: 'Unconsumed',
    turnstileId: 'N/A',
  },
  {
    passId: 'NAV-10082',
    attendeeName: 'Devang Parikh',
    phone: '+91 97230 10082',
    passTier: 'Garba Arena Regular',
    nights: 'Night 5 (Maha Garba)',
    portalGate: 'Gate C4 (General)',
    sellerPartner: 'Seller C (Navrangpura Agency)',
    priceInr: 1200,
    rfidToken: 'RFID-10082-AR',
    status: 'ACTIVE',
    scanTime: 'Unconsumed',
    turnstileId: 'N/A',
  },
  {
    passId: 'NAV-10360',
    attendeeName: 'Ananya Vyas',
    phone: '+91 98980 10360',
    passTier: 'Swara Mandir Premium',
    nights: 'Night 3 Festive',
    portalGate: 'Gate B3 (Turnstile)',
    sellerPartner: 'Seller F (Vastrapur Campus Booth)',
    priceInr: 3500,
    rfidToken: 'RFID-10360-SM',
    status: 'ACTIVE',
    scanTime: 'Unconsumed',
    turnstileId: 'N/A',
  },
  {
    passId: 'NAV-10488',
    attendeeName: 'Hardik Chauhan',
    phone: '+91 98255 10488',
    passTier: 'Mahotsav VIP Club',
    nights: 'Night 8 Special',
    portalGate: 'Gate A2 (Priority)',
    sellerPartner: 'Seller A (Karnavati Garba Hub)',
    priceInr: 6000,
    rfidToken: 'RFID-10488-VC',
    status: 'ACTIVE',
    scanTime: 'Unconsumed',
    turnstileId: 'N/A',
  },
  {
    passId: 'NAV-10724',
    attendeeName: 'Bina Vora',
    phone: '+91 99740 10724',
    passTier: 'Khelaiya Gold Access',
    nights: 'Night 9 Dussehra Eve',
    portalGate: 'Gate C1 (Standard)',
    sellerPartner: 'Seller B (Sarkhej Youth Club)',
    priceInr: 3000,
    rfidToken: 'RFID-10724-KG',
    status: 'ACTIVE',
    scanTime: 'Unconsumed',
    turnstileId: 'N/A',
  },
  {
    passId: 'NAV-10889',
    attendeeName: 'Tanmay Mehta',
    phone: '+91 98252 10889',
    passTier: 'Aangan Regular Pass',
    nights: 'Night 4 Mid-Week',
    portalGate: 'Gate C2 (Standard)',
    sellerPartner: 'Seller F (Vastrapur Campus Booth)',
    priceInr: 1000,
    rfidToken: 'RFID-10889-AG',
    status: 'QUARANTINED',
    scanTime: '2026-10-15 20:13:59 IST (Attempted)',
    turnstileId: 'T-02-A',
  },
  {
    passId: 'NAV-65102',
    attendeeName: 'Meera Desai',
    phone: '+91 98244 65102',
    passTier: 'Garba Arena Regular',
    nights: 'Night 6 (Sharad Purnima)',
    portalGate: 'Gate 02 (Main Public Entry)',
    sellerPartner: 'Seller C (Navrangpura Agency)',
    priceInr: 1500,
    rfidToken: 'RFID-65102-AR',
    status: 'SCANNED',
    scanTime: '2026-10-15 20:13:12 IST',
    turnstileId: 'T-02-B',
  },
  {
    passId: 'NAV-31994',
    attendeeName: 'Sanjay Rawal',
    phone: '+91 98791 31994',
    passTier: 'Heritage Pass Deluxe',
    nights: 'Night 1 to 9 Season',
    portalGate: 'Gate 03 (East Concourse)',
    sellerPartner: 'Seller B (Sarkhej Youth Club)',
    priceInr: 9500,
    rfidToken: 'RFID-31994-HD',
    status: 'SCANNED',
    scanTime: '2026-10-15 20:10:44 IST',
    turnstileId: 'T-03-A',
  },
];

export const Reports: React.FC = () => {
  const [filterSeller, setFilterSeller] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredData = REPORT_DATA.filter((row) => {
    const matchesSeller = filterSeller === 'all' || row.sellerPartner.includes(filterSeller);
    const matchesTier = filterTier === 'all' || row.passTier.toLowerCase().includes(filterTier.toLowerCase());
    const matchesStatus = filterStatus === 'all' || row.status === filterStatus;
    const matchesSearch =
      row.passId.toLowerCase().includes(search.toLowerCase()) ||
      row.attendeeName.toLowerCase().includes(search.toLowerCase()) ||
      row.rfidToken.toLowerCase().includes(search.toLowerCase());

    return matchesSeller && matchesTier && matchesStatus && matchesSearch;
  });

  const totalRevenue = filteredData.reduce((acc, row) => acc + row.priceInr, 0);

  const exportToCsv = async () => {
    try {
      const response = await fetch('/api/reports/export-csv');
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        link.setAttribute('href', url);
        link.setAttribute('download', `navraksh_pass_sales_inventory_${timestamp}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setDownloadSuccess(`Exported backend database records to CSV successfully!`);
        setTimeout(() => {
          setDownloadSuccess(null);
        }, 4500);
        return;
      }
    } catch {
      // Fallback to client-side data export
    }

    // Fallback: CSV Header row
    const headers = [
      'Pass ID',
      'Attendee Name',
      'Contact Phone',
      'Pass Tier Designation',
      'Access Schedule (Nights)',
      'Assigned Portal Gate',
      'Authorized Seller Partner',
      'Base Price (INR)',
      'RFID Wristband Token',
      'Verification Status',
      'Verified Scan Timestamp',
      'Turnstile Terminal ID',
    ];

    // CSV Rows
    const rows = filteredData.map((row) => [
      `"${row.passId}"`,
      `"${row.attendeeName.replace(/"/g, '""')}"`,
      `"${row.phone}"`,
      `"${row.passTier}"`,
      `"${row.nights}"`,
      `"${row.portalGate}"`,
      `"${row.sellerPartner.replace(/"/g, '""')}"`,
      row.priceInr,
      `"${row.rfidToken}"`,
      `"${row.status}"`,
      `"${row.scanTime}"`,
      `"${row.turnstileId}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    // Create a Blob and trigger standard browser download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    link.setAttribute('href', url);
    link.setAttribute('download', `navraksh_pass_sales_inventory_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Exported ${filteredData.length} records to CSV successfully!`);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4500);
  };

  return (
    <div className="p-space-md lg:p-margin space-y-space-xl relative overflow-hidden">
      {/* Ambient Radial Accent */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="space-y-space-xs max-w-3xl">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm uppercase tracking-wider font-mono">
              Analytics // Audit &amp; Reconciliation
            </span>
            <span className="text-outline text-label-sm font-label-sm">•</span>
            <span className="text-secondary font-label-sm text-label-sm flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Manager Export Terminal
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Pass Sales &amp; Inventory Reports
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Export real-time transactional pass records, seller quota balances, RFID verification audits, and revenue reconciliation datasets for external spreadsheet and ERP analysis.
          </p>
        </div>

        {/* Primary Action: Download CSV Button */}
        <div className="flex items-center gap-space-sm flex-wrap">
          <button
            type="button"
            onClick={exportToCsv}
            className="px-space-lg py-3 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary-container/20 hover:bg-secondary-container transition-all active:scale-95 group font-mono"
            id="btn-download-csv"
          >
            <span className="material-symbols-outlined text-xl group-hover:-translate-y-0.5 transition-transform">
              download
            </span>
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Download Success Notification Toast */}
      {downloadSuccess && (
        <div className="p-space-md rounded-xl bg-secondary-container/20 border border-secondary/40 text-secondary font-mono text-xs flex items-center justify-between shadow-md animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span className="font-bold">{downloadSuccess}</span>
          </div>
          <span className="text-[11px] text-outline">RFC 4180 UTF-8 Formatted</span>
        </div>
      )}

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 space-y-1">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
            Exportable Records
          </span>
          <div className="font-headline-xl text-headline-xl text-on-surface font-bold font-mono">
            {filteredData.length} Rows
          </div>
          <span className="text-xs text-on-surface-variant font-mono">
            Out of {REPORT_DATA.length} sample manifest nodes
          </span>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 space-y-1">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
            Selected Batch Gross
          </span>
          <div className="font-headline-xl text-headline-xl text-primary font-bold font-mono">
            ₹{(totalRevenue / 100000).toFixed(2)}L
          </div>
          <span className="text-xs text-secondary font-mono">
            Total Sum: ₹{totalRevenue.toLocaleString()}
          </span>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 space-y-1">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
            Scanned Gate Utilization
          </span>
          <div className="font-headline-xl text-headline-xl text-secondary font-bold font-mono">
            {((filteredData.filter((r) => r.status === 'SCANNED').length / (filteredData.length || 1)) * 100).toFixed(1)}%
          </div>
          <span className="text-xs text-outline font-mono">Active turnstile check-ins</span>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 space-y-1">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
            Export Format Spec
          </span>
          <div className="font-headline-sm text-headline-sm text-on-surface font-bold font-mono mt-1">
            CSV / RFC 4180
          </div>
          <span className="text-xs text-outline font-mono">12 Columns • UTF-8 Safe</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm border border-surface-container/60 flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center gap-space-sm flex-1 min-w-[280px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-base">
              search
            </span>
            <input
              type="text"
              placeholder="Search Pass ID, Holder, RFID..."
              className="w-full bg-surface-container-lowest text-on-surface font-label-md text-label-md pl-9 pr-3 py-2 rounded-lg border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Seller Filter */}
          <select
            className="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm px-3 py-2 rounded-lg border border-surface-container focus:outline-none"
            value={filterSeller}
            onChange={(e) => setFilterSeller(e.target.value)}
          >
            <option value="all">All Distribution Partners</option>
            <option value="Seller A">Seller A (Karnavati)</option>
            <option value="Seller B">Seller B (Sarkhej)</option>
            <option value="Seller C">Seller C (Navrangpura)</option>
            <option value="Seller D">Seller D (Maninagar)</option>
            <option value="Seller E">Seller E (Bopal)</option>
            <option value="Seller F">Seller F (Vastrapur)</option>
          </select>

          {/* Tier Filter */}
          <select
            className="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm px-3 py-2 rounded-lg border border-surface-container focus:outline-none"
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
          >
            <option value="all">All Pass Tiers</option>
            <option value="Platinum">Royal Lounge Platinum</option>
            <option value="Gold">Gold Tiers</option>
            <option value="Heritage">Heritage Tiers</option>
            <option value="Diamond">Saibo Diamond</option>
            <option value="Regular">Regular Arena</option>
          </select>

          {/* Status Filter */}
          <select
            className="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm px-3 py-2 rounded-lg border border-surface-container focus:outline-none font-mono"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Verification Statuses</option>
            <option value="SCANNED">SCANNED (Checked In)</option>
            <option value="ACTIVE">ACTIVE (Unconsumed)</option>
            <option value="QUARANTINED">QUARANTINED (Flagged)</option>
          </select>
        </div>

        {/* Quick Reset */}
        <button
          type="button"
          onClick={() => {
            setSearch('');
            setFilterSeller('all');
            setFilterTier('all');
            setFilterStatus('all');
          }}
          className="text-xs text-outline hover:text-on-surface transition-colors font-mono"
        >
          Reset Filters
        </button>
      </div>

      {/* Live Data Preview Table */}
      <section className="bg-surface-container-low rounded-xl shadow-md overflow-hidden border border-surface-container/60">
        <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-high/40 border-b border-surface-container">
          <div className="space-y-0.5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">table_view</span>
              Live Export Data Preview
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              The rows displayed below will be formatted into your downloaded CSV file.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-secondary">
            <span>{filteredData.length} records matching current filter criteria</span>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead>
              <tr className="bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase tracking-wider font-mono border-b border-surface-container">
                <th className="py-3 px-4">Pass ID</th>
                <th className="py-3 px-4">Attendee Name</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Access Schedule</th>
                <th className="py-3 px-4">Gate</th>
                <th className="py-3 px-4">Partner Seller</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4">RFID Token</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Scan Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/40">
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr
                    key={row.passId}
                    className={`hover:bg-surface-container-high/50 transition-colors ${
                      idx % 2 === 0 ? 'bg-surface-container/20' : 'bg-surface-container-low'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-primary text-xs">
                      #{row.passId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-on-surface text-sm">
                      {row.attendeeName}
                      <span className="block text-[11px] text-outline font-mono font-normal">
                        {row.phone}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">
                      {row.passTier}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-outline">
                      {row.nights}
                    </td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">
                      {row.portalGate}
                    </td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">
                      {row.sellerPartner}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-secondary text-xs">
                      ₹{row.priceInr.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-outline">
                      {row.rfidToken}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          row.status === 'SCANNED'
                            ? 'bg-secondary/10 text-secondary'
                            : row.status === 'ACTIVE'
                            ? 'bg-surface-container-highest text-outline'
                            : 'bg-error-container/30 text-error'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] font-mono text-outline">
                      {row.scanTime}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-outline font-mono text-sm">
                    No pass records match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-surface-container-lowest font-headline-sm text-headline-sm text-sm border-t border-surface-container">
              <tr className="text-on-surface font-bold">
                <td colSpan={6} className="py-3 px-4 font-mono">
                  Export Total ({filteredData.length} records)
                </td>
                <td className="py-3 px-4 text-right font-mono text-primary font-bold">
                  ₹{totalRevenue.toLocaleString()}
                </td>
                <td colSpan={3} className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={exportToCsv}
                    className="px-3 py-1.5 rounded bg-primary-container text-on-primary-container font-mono text-xs font-semibold hover:bg-secondary-container transition-colors inline-flex items-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download CSV Now</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
};
