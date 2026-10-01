import React, { useState } from 'react';
import { PassRecord } from '../types.ts';

const ATTENDEES_DATA: PassRecord[] = [
  { id: '1032', holder: 'Aarav Joshi', phone: '+91 98251 10328', tier: 'Royal Lounge Platinum', nights: 'All 9 Nights (Season)', gate: 'Gate A1 (VIP Fastrack)', hash: '0x99F4A7C1', status: 'SCANNED', seller: 'Karnavati Garba Hub', priceInr: 15000, rfidToken: 'RFID-10328-PL', scannedAt: '20:14:02 IST' },
  { id: '1024', holder: 'Rahul Patel', phone: '+91 98250 84291', tier: 'Madhratri Gold Tier', nights: 'Night 6 (Sharad Purnima)', gate: 'Gate 02 (Main Public Entry)', hash: '0x43D211BA', status: 'SCANNED', seller: 'Karnavati Garba Hub', priceInr: 4500, rfidToken: 'RFID-84291-C2', scannedAt: '20:14:08 IST' },
  { id: '1016', holder: 'Kavita Dave', phone: '+91 98790 10164', tier: 'Heritage Garba Access', nights: 'Night 1-4 Suite', gate: 'Gate B2 (Turnstile)', hash: '0x88B3E42D', status: 'SCANNED', seller: 'Sarkhej Youth Club', priceInr: 8000, rfidToken: 'RFID-10164-HG', scannedAt: '20:13:12 IST' },
  { id: '1040', holder: 'Priya Shah', phone: '+91 98240 99120', tier: 'Saibo Diamond Pavillion', nights: 'Night 6 (Sharad Purnima)', gate: 'Gate A1 (VIP Fastrack)', hash: '0xDF8109EA', status: 'SCANNED', seller: 'Bopal Online Outlet', priceInr: 12000, rfidToken: 'RFID-99120-DM', scannedAt: '20:13:45 IST' },
  { id: '1056', holder: 'Nirav Trivedi', phone: '+91 99099 44219', tier: 'Heritage Pass Deluxe', nights: 'Night 7-9 Finale', gate: 'Gate B1 (VIP)', hash: '0x22F43C09', status: 'ACTIVE', seller: 'Maninagar Pass Desk', priceInr: 7000, rfidToken: 'RFID-44219-DL' },
  { id: '1008', holder: 'Devang Parikh', phone: '+91 97230 10082', tier: 'Garba Arena Regular', nights: 'Night 5 (Maha Garba)', gate: 'Gate C4 (General)', hash: '0x17A9F091', status: 'ACTIVE', seller: 'Navrangpura Agency', priceInr: 1200, rfidToken: 'RFID-10082-AR' },
  { id: '1036', holder: 'Ananya Vyas', phone: '+91 98980 10360', tier: 'Swara Mandir Premium', nights: 'Night 3 Festive', gate: 'Gate B3 (Turnstile)', hash: '0x55E90288', status: 'ACTIVE', seller: 'Vastrapur Campus Booth', priceInr: 3500, rfidToken: 'RFID-10360-SM' },
  { id: '1048', holder: 'Hardik Chauhan', phone: '+91 98255 10488', tier: 'Mahotsav VIP Club', nights: 'Night 8 Special', gate: 'Gate A2 (Priority)', hash: '0x66AB4510', status: 'ACTIVE', seller: 'Karnavati Garba Hub', priceInr: 6000, rfidToken: 'RFID-10488-VC' },
  { id: '1072', holder: 'Bina Vora', phone: '+91 99740 10724', tier: 'Khelaiya Gold Access', nights: 'Night 9 Dussehra Eve', gate: 'Gate C1 (Standard)', hash: '0x44CD117E', status: 'ACTIVE', seller: 'Sarkhej Youth Club', priceInr: 3000, rfidToken: 'RFID-10724-KG' },
  { id: '1088', holder: 'Tanmay Mehta', phone: '+91 98252 10889', tier: 'Aangan Regular Pass', nights: 'Night 4 Mid-Week', gate: 'Gate C2 (Standard)', hash: '0x99238FF0', status: 'QUARANTINED', seller: 'Vastrapur Campus Booth', priceInr: 1000, rfidToken: 'RFID-10889-AG' },
  { id: '1042', holder: 'Rohan Deshmukh', phone: '+91 98241 10422', tier: 'FastTrack Festive Pass', nights: 'Night 6 Special', gate: 'Gate B1 (VIP)', hash: '0xAA84FD12', status: 'ACTIVE', seller: 'Navrangpura Agency', priceInr: 5500, rfidToken: 'RFID-10422-FT' },
  { id: '1065', holder: 'Meera Desai', phone: '+91 98244 65102', tier: 'Garba Arena Regular', nights: 'Night 6 (Sharad Purnima)', gate: 'Gate 02 (Main Entry)', hash: '0x65102ABC', status: 'SCANNED', seller: 'Navrangpura Agency', priceInr: 1500, rfidToken: 'RFID-65102-AR', scannedAt: '20:13:12 IST' },
  { id: '1031', holder: 'Sanjay Rawal', phone: '+91 98791 31994', tier: 'Heritage Pass Deluxe', nights: 'Night 1 to 9 Season', gate: 'Gate 03 (East Concourse)', hash: '0x31994FED', status: 'SCANNED', seller: 'Sarkhej Youth Club', priceInr: 9500, rfidToken: 'RFID-31994-HD', scannedAt: '20:10:44 IST' },
];

export const CustomersDirectory: React.FC = () => {
  const [attendees] = useState<PassRecord[]>(ATTENDEES_DATA);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAttendee, setSelectedAttendee] = useState<PassRecord | null>(ATTENDEES_DATA[0]);

  const filtered = attendees.filter((a) => {
    const matchesSearch =
      a.holder.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.id.includes(search) ||
      a.tier.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
              Guest Registry &amp; Accreditation
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs text-primary font-mono">{attendees.length} Registered Guests in View</span>
          </div>
          <h1 className="font-headline-xl text-on-surface">Attendees &amp; Guests Directory</h1>
          <p className="font-body-md text-on-surface-variant">
            Registered ticket holders, accredited credentials, turnstile admission timestamps, and RFID wristband bindings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search Name, Phone, Pass ID..."
            className="bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container font-mono text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="bg-surface-container-low px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Check-in Status</option>
            <option value="SCANNED">Admitted (Scanned)</option>
            <option value="ACTIVE">Pending Entry</option>
            <option value="QUARANTINED">Flagged / Quarantined</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Attendees Table (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-xl border border-surface-container/60 overflow-hidden shadow-md">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md">
              <thead>
                <tr className="bg-surface-container-lowest text-outline font-label-sm text-label-sm uppercase font-mono border-b border-surface-container">
                  <th className="py-3 px-4">Attendee</th>
                  <th className="py-3 px-4">Pass ID</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Nights</th>
                  <th className="py-3 px-4">Portal</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/40">
                {filtered.map((att) => (
                  <tr
                    key={att.id}
                    onClick={() => setSelectedAttendee(att)}
                    className={`cursor-pointer transition-colors ${
                      selectedAttendee?.id === att.id
                        ? 'bg-surface-container-highest/80'
                        : 'hover:bg-surface-container-high/40'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-on-surface">{att.holder}</div>
                      <div className="text-[11px] text-outline font-mono">{att.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-primary">#{att.id}</td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">{att.tier}</td>
                    <td className="py-3 px-4 text-xs font-mono text-outline">{att.nights}</td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">{att.gate}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          att.status === 'SCANNED'
                            ? 'bg-secondary/10 text-secondary'
                            : att.status === 'ACTIVE'
                            ? 'bg-primary-container/20 text-primary'
                            : 'bg-error-container/30 text-error'
                        }`}
                      >
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Attendee Credential Card (4 cols) */}
        {selectedAttendee && (
          <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-md border border-surface-container/60 shadow-md space-y-space-md flex flex-col justify-between">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between border-b border-surface-container pb-2">
                <span className="font-headline-sm text-sm font-bold text-primary font-mono">
                  GUEST ACCREDITATION
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                    selectedAttendee.status === 'SCANNED'
                      ? 'bg-secondary/10 text-secondary'
                      : selectedAttendee.status === 'ACTIVE'
                      ? 'bg-primary-container/20 text-primary'
                      : 'bg-error-container/30 text-error'
                  }`}
                >
                  {selectedAttendee.status}
                </span>
              </div>

              <div className="text-center py-2">
                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-2">
                  {selectedAttendee.holder.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  {selectedAttendee.holder}
                </h3>
                <p className="text-xs font-mono text-outline">{selectedAttendee.phone}</p>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-lowest space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-outline">Digital Pass ID:</span>
                  <span className="font-bold text-primary">#{selectedAttendee.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Pass Tier:</span>
                  <span className="text-on-surface font-semibold">{selectedAttendee.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Valid Access:</span>
                  <span className="text-on-surface">{selectedAttendee.nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Authorized Portal:</span>
                  <span className="text-on-surface">{selectedAttendee.gate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">RFID Wristband:</span>
                  <span className="text-secondary font-bold">{selectedAttendee.rfidToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Issuing Partner:</span>
                  <span className="text-on-surface">{selectedAttendee.seller}</span>
                </div>
                {selectedAttendee.scannedAt && (
                  <div className="flex justify-between pt-1 border-t border-surface-container">
                    <span className="text-outline">Gate Admission:</span>
                    <span className="text-secondary font-bold">{selectedAttendee.scannedAt}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors border border-surface-container-highest/60"
              >
                <span className="material-symbols-outlined text-sm text-primary">badge</span>
                <span>Print Physical Guest Badge</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
