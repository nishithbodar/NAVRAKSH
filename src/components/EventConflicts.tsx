import React, { useState } from 'react';
import { VenueSlot } from '../types.ts';

const CANONICAL_SLOTS: VenueSlot[] = [
  {
    id: 'SLOT-01',
    title: 'Maha Raas Prime Arena',
    venue: 'GMDC Mega Ground',
    hall: 'Arena 1 (Central Ground)',
    date: 'Night 6 (Oct 15)',
    startTime: '20:00',
    endTime: '23:45',
    performer: 'Kirtidan Gadhvi & Troupe',
    soundLevelDb: 92,
    status: 'CONFIRMED',
    notes: 'Main central sound array active. Curfew at 23:45 strictly enforced.',
  },
  {
    id: 'SLOT-02',
    title: 'Heritage Raas Mandali',
    venue: 'United Way of Baroda',
    hall: 'Pavilion Central',
    date: 'Night 6 (Oct 15)',
    startTime: '19:30',
    endTime: '22:30',
    performer: 'Atul Purohit Live',
    soundLevelDb: 85,
    status: 'CONFIRMED',
    notes: 'Acoustic baffle curtains deployed between East Concourse.',
  },
  {
    id: 'SLOT-03',
    title: 'Traditional Sandhya Aarti & Stuti',
    venue: 'Karnavati Club Grand Dome',
    hall: 'Heritage Stage',
    date: 'Night 6 (Oct 15)',
    startTime: '19:00',
    endTime: '20:15',
    performer: 'Temple Classical Choir',
    soundLevelDb: 72,
    status: 'CONFIRMED',
    notes: 'Opening ritual set; acoustic compliance verified.',
  },
  {
    id: 'SLOT-04',
    title: 'Youth Dandiya Rock Fusion',
    venue: 'YMCA Central Arena',
    hall: 'North Concourse',
    date: 'Night 6 (Oct 15)',
    startTime: '21:15',
    endTime: '23:30',
    performer: 'Bhoomi Trivedi Ensemble',
    soundLevelDb: 89,
    status: 'CONFIRMED',
    notes: 'Directional line array oriented away from residential perimeter.',
  },
  {
    id: 'SLOT-05',
    title: 'VIP Enclosure Classical Raas',
    venue: 'Rajpath Heritage Lawn',
    hall: 'VIP Pavilion',
    date: 'Night 6 (Oct 15)',
    startTime: '20:00',
    endTime: '23:00',
    performer: 'Falguni Pathak Orchestra',
    soundLevelDb: 88,
    status: 'CONFIRMED',
    notes: 'Dedicated access path through Gate A1 Fastrack.',
  },
  {
    id: 'SLOT-06',
    title: 'Late Night Raas Special',
    venue: 'Shankus Garba Lawn',
    hall: 'Open Lawn B',
    date: 'Night 6 (Oct 15)',
    startTime: '22:30',
    endTime: '00:30',
    performer: 'Osman Mir Folk Night',
    soundLevelDb: 94,
    status: 'FLAGGED',
    notes: 'Exceeds midnight curfew by 30 mins. Sound attenuation required after 00:00.',
  },
];

export const EventConflicts: React.FC = () => {
  const [slots, setSlots] = useState<VenueSlot[]>(CANONICAL_SLOTS);
  const [startTime, setStartTime] = useState<string>('21:00');
  const [endTime, setEndTime] = useState<string>('23:30');
  const [slotTitle, setSlotTitle] = useState<string>('Celebrity Singer Garba Set');
  const [selectedVenue, setSelectedVenue] = useState<string>('GMDC Mega Ground');
  const [selectedHall, setSelectedHall] = useState<string>('Arena 1 (Central Ground)');
  const [performer, setPerformer] = useState<string>('Kinjal Dave Special');
  const [conflictResult, setConflictResult] = useState<{
    hasConflict: boolean;
    overlapWith?: string;
    details?: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCheckConflict = () => {
    const startHour = parseInt(startTime.split(':')[0], 10) + parseInt(startTime.split(':')[1], 10) / 60;
    const endHour = parseInt(endTime.split(':')[0], 10) + parseInt(endTime.split(':')[1], 10) / 60;

    // Check for curfew breach
    if (endHour > 24.0 || endHour < 6.0) {
      setConflictResult({
        hasConflict: true,
        overlapWith: 'Municipal Sound Curfew (00:00 Midnight Limit)',
        details: 'Proposed performance slot extends past midnight. City festival guidelines require main sound systems silenced by 00:00.',
      });
      return;
    }

    // Check overlap within same venue
    const matchingVenueSlots = slots.filter((s) => s.venue === selectedVenue);
    let overlapFound = false;

    for (const slot of matchingVenueSlots) {
      const existingStart = parseInt(slot.startTime.split(':')[0], 10) + parseInt(slot.startTime.split(':')[1], 10) / 60;
      const existingEnd = parseInt(slot.endTime.split(':')[0], 10) + parseInt(slot.endTime.split(':')[1], 10) / 60;

      // Overlap condition
      if (Math.max(startHour, existingStart) < Math.min(endHour, existingEnd)) {
        setConflictResult({
          hasConflict: true,
          overlapWith: `${slot.title} (${slot.startTime} - ${slot.endTime} at ${slot.hall})`,
          details: `Direct stage & acoustic conflict detected with ${slot.performer}. Recommend shifting start time to after ${slot.endTime} or reallocating to Concourse C.`,
        });
        overlapFound = true;
        break;
      }
    }

    if (!overlapFound) {
      setConflictResult({
        hasConflict: false,
        details: 'No overlapping stage performances or sound curfew infractions detected. Slot verified clear for booking.',
      });
    }
  };

  const handleAddSlot = () => {
    handleCheckConflict();
    const newSlot: VenueSlot = {
      id: `SLOT-0${slots.length + 1}`,
      title: slotTitle,
      venue: selectedVenue,
      hall: selectedHall,
      date: 'Night 6 (Oct 15)',
      startTime,
      endTime,
      performer,
      soundLevelDb: 86,
      status: conflictResult?.hasConflict ? 'FLAGGED' : 'CONFIRMED',
      notes: conflictResult?.hasConflict ? conflictResult.details : 'Verified and scheduled.',
    };

    setSlots((prev) => [newSlot, ...prev]);
    showToast(`Schedule slot "${newSlot.title}" added successfully.`);
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
              Stage &amp; Arena Coordination
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs text-primary font-mono">6 Festival Arenas Managed</span>
          </div>
          <h1 className="font-headline-xl text-on-surface">Stage &amp; Venue Schedule Manager</h1>
          <p className="font-body-md text-on-surface-variant">
            Coordinate artist stage slots, acoustic separation, and curfew limits across all 6 premier festival grounds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-secondary text-xs font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Curfew Rule: 00:00 AM Strict
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Slot Schedule & Overlap Checker (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 space-y-space-md shadow-md">
          <div className="flex items-center justify-between border-b border-surface-container pb-2">
            <h2 className="font-headline-sm text-sm text-on-surface font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">event_note</span>
              Schedule Slot Validator
            </h2>
            <span className="text-[11px] text-outline font-mono">Auto-Conflict Check</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-outline block mb-1 font-mono">Performance Title</label>
              <input
                type="text"
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                value={slotTitle}
                onChange={(e) => setSlotTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-outline block mb-1 font-mono">Lead Performer / Troupe</label>
              <input
                type="text"
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                value={performer}
                onChange={(e) => setPerformer(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-outline block mb-1 font-mono">Festival Venue</label>
                <select
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg text-xs border border-surface-container text-on-surface focus:outline-none"
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                >
                  <option value="GMDC Mega Ground">GMDC Mega Ground</option>
                  <option value="United Way of Baroda">United Way of Baroda</option>
                  <option value="Karnavati Club Grand Dome">Karnavati Club Grand Dome</option>
                  <option value="YMCA Central Arena">YMCA Central Arena</option>
                  <option value="Rajpath Heritage Lawn">Rajpath Heritage Lawn</option>
                  <option value="Shankus Garba Lawn">Shankus Garba Lawn</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-outline block mb-1 font-mono">Stage / Hall</label>
                <select
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg text-xs border border-surface-container text-on-surface focus:outline-none"
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)}
                >
                  <option value="Arena 1 (Central Ground)">Arena 1 (Central Ground)</option>
                  <option value="Pavilion Central">Pavilion Central</option>
                  <option value="Heritage Stage">Heritage Stage</option>
                  <option value="North Concourse">North Concourse</option>
                  <option value="VIP Pavilion">VIP Pavilion</option>
                  <option value="Open Lawn B">Open Lawn B</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono">
              <div>
                <label className="text-xs text-outline block mb-1">Start Time (IST)</label>
                <input
                  type="time"
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-outline block mb-1">End Time (IST)</label>
                <input
                  type="time"
                  className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCheckConflict}
                className="flex-1 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 transition-all font-mono"
              >
                <span className="material-symbols-outlined text-sm text-secondary">troubleshoot</span>
                <span>Check Conflicts</span>
              </button>

              <button
                type="button"
                onClick={handleAddSlot}
                className="flex-1 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all font-mono shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                <span>Schedule Slot</span>
              </button>
            </div>
          </div>

          {conflictResult && (
            <div
              className={`p-3 rounded-lg border text-xs font-mono space-y-1 ${
                conflictResult.hasConflict
                  ? 'bg-error-container/20 border-error/50 text-error'
                  : 'bg-secondary/10 border-secondary/40 text-secondary'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-base">
                  {conflictResult.hasConflict ? 'warning' : 'check_circle'}
                </span>
                <span>
                  {conflictResult.hasConflict
                    ? `Conflict Alert: ${conflictResult.overlapWith}`
                    : 'Schedule Verified Clear'}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant font-sans">
                {conflictResult.details}
              </p>
            </div>
          )}
        </div>

        {/* Master Schedule Table & Arena List (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-space-md border border-surface-container/60 shadow-md space-y-space-md">
          <div className="flex items-center justify-between border-b border-surface-container pb-2">
            <div>
              <h2 className="font-headline-sm text-sm text-on-surface font-semibold">
                Confirmed Stage Schedules
              </h2>
              <p className="text-xs text-outline">Night 6 (Sharad Purnima Mega Celebration)</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-surface-container text-secondary font-mono">
              {slots.length} Active Slots
            </span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all ${
                  slot.status === 'FLAGGED'
                    ? 'bg-error-container/10 border-error/40'
                    : 'bg-surface-container-lowest border-surface-container/50 hover:border-surface-container-highest'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-sm text-on-surface block leading-tight">
                      {slot.title}
                    </span>
                    <span className="text-xs text-primary font-medium block">
                      {slot.performer} • {slot.venue} ({slot.hall})
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                        slot.status === 'CONFIRMED'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-error-container/30 text-error'
                      }`}
                    >
                      {slot.status}
                    </span>
                    <span className="text-[11px] text-outline font-mono block mt-0.5">
                      {slot.startTime} – {slot.endTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-outline pt-1 border-t border-surface-container/40">
                  <span className="truncate max-w-md">{slot.notes}</span>
                  <span className="font-mono text-secondary shrink-0 font-semibold">
                    {slot.soundLevelDb} dB SPL
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
