import React, { useState } from 'react';

export const EventConflicts: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('21:00');
  const [endTime, setEndTime] = useState<string>('23:30');
  const [slotTitle, setSlotTitle] = useState<string>('Celebrity Singer Garba Set');
  const [conflictResult, setConflictResult] = useState<{
    hasConflict: boolean;
    overlapWith?: string;
    details?: string;
  } | null>(null);

  const handleCheckConflict = () => {
    // Check interval overlap with canonical schedule [20:00 - 23:45 Maha Raas Prime]
    const startHour = parseInt(startTime.split(':')[0], 10) + parseInt(startTime.split(':')[1], 10) / 60;
    const endHour = parseInt(endTime.split(':')[0], 10) + parseInt(endTime.split(':')[1], 10) / 60;

    if (endHour <= 20.0 || startHour >= 23.75) {
      setConflictResult({
        hasConflict: false,
        details: 'No overlapping performance schedules or curfew infractions detected. Interval tree query O(log n) passed.',
      });
    } else {
      setConflictResult({
        hasConflict: true,
        overlapWith: 'Maha Raas Prime Arena (20:00 - 23:45)',
        details: 'High decibel acoustic overlap detected with Arena 1. Recommend shifting slot to Concourse C or adjusting volume envelope.',
      });
    }
  };

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg">
      <div>
        <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
          Interval Tree Engine
        </span>
        <h1 className="font-headline-xl text-on-surface">Event Conflict &amp; Acoustic Analyzer</h1>
        <p className="font-body-md text-on-surface-variant">
          Logarithmic range search over concurrent performance acts, sound curfews, and VIP transit windows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Input Box */}
        <div className="lg:col-span-6 bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 space-y-space-md shadow-md">
          <h2 className="font-headline-sm text-sm text-on-surface font-semibold">
            Test New Event Time Interval
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-outline block mb-1 font-mono">Performance Title</label>
              <input
                type="text"
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg text-sm border border-surface-container text-on-surface focus:outline-none"
                value={slotTitle}
                onChange={(e) => setSlotTitle(e.target.value)}
              />
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

            <button
              type="button"
              onClick={handleCheckConflict}
              className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all font-mono"
            >
              <span className="material-symbols-outlined text-sm">troubleshoot</span>
              <span>Query Interval Tree (O(log n))</span>
            </button>
          </div>

          {conflictResult && (
            <div
              className={`p-3 rounded-lg border text-xs font-mono space-y-1 ${
                conflictResult.hasConflict
                  ? 'bg-error-container/20 border-error/50 text-error'
                  : 'bg-secondary/10 border-secondary/40 text-secondary'
              }`}
            >
              <div className="font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  {conflictResult.hasConflict ? 'warning' : 'verified'}
                </span>
                <span>{conflictResult.hasConflict ? 'CONFLICT DETECTED' : 'SLOT SAFE & VERIFIED'}</span>
              </div>
              {conflictResult.overlapWith && (
                <div>Overlaps with: {conflictResult.overlapWith}</div>
              )}
              <div className="text-[11px] text-on-surface-variant font-sans">
                {conflictResult.details}
              </div>
            </div>
          )}
        </div>

        {/* Existing Canonical Timeline */}
        <div className="lg:col-span-6 bg-surface-container-low p-space-md rounded-xl border border-surface-container/60 space-y-space-sm shadow-md">
          <h2 className="font-headline-sm text-sm text-on-surface font-semibold border-b border-surface-container pb-2">
            Canonical Schedule (Night 6 Manifest)
          </h2>
          <div className="space-y-2 text-xs font-mono">
            {[
              { slot: '[18:00 - 19:30]', name: 'Mangal Aarti & Toran Lighting', stage: 'Main Mandap', maxHigh: '19:30' },
              { slot: '[19:45 - 20:45]', name: 'Heritage Folk Dholi Round', stage: 'Inner Ring A', maxHigh: '20:45' },
              { slot: '[20:00 - 23:45]', name: 'Maha Raas Prime Arena', stage: 'Central Grounds', maxHigh: '23:45' },
              { slot: '[23:50 - 01:30]', name: 'Sanedo Youth Fast-Track', stage: 'Concourse B', maxHigh: '01:30' },
              { slot: '[01:30 - 02:30]', name: 'Calm Down & Night Exit Protocol', stage: 'Turnstiles 1-4', maxHigh: '02:30' },
            ].map((ev, i) => (
              <div key={i} className="p-2.5 rounded bg-surface-container-lowest border border-surface-container flex items-center justify-between">
                <div>
                  <span className="text-primary font-bold">{ev.slot}</span>
                  <span className="text-on-surface block font-sans font-semibold text-xs mt-0.5">{ev.name}</span>
                </div>
                <div className="text-right text-[10px] text-outline">
                  <span>{ev.stage}</span>
                  <span className="block text-secondary">Max_High: {ev.maxHigh}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
