import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [unlockDuration, setUnlockDuration] = useState<number>(4.0);
  const [replayWindowSecs, setReplayWindowSecs] = useState<number>(30);
  const [strictSha256, setStrictSha256] = useState<boolean>(true);
  const [offlineSync, setOfflineSync] = useState<boolean>(true);
  const [maxDecibels, setMaxDecibels] = useState<number>(90);
  const [curfewHour, setCurfewHour] = useState<string>('00:00');
  const [reserveBuffer, setReserveBuffer] = useState<number>(150);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Gate & System configuration updated and synced across all 4 gate controllers.');
  };

  return (
    <div className="p-space-md lg:p-margin space-y-space-lg max-w-5xl">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-primary text-on-primary font-medium text-sm shadow-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
            Operational Administration
          </span>
          <span className="text-outline text-xs">•</span>
          <span className="text-xs text-primary font-mono">Cluster: GJ-AHM-04</span>
        </div>
        <h1 className="font-headline-xl text-on-surface">Gate &amp; System Settings</h1>
        <p className="font-body-md text-on-surface-variant">
          Configure turnstile hardware timeouts, cryptographic replay protection windows, and festival curfew thresholds.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-space-lg">
        {/* Gate Turnstiles Hardware Settings */}
        <div className="bg-surface-container-low p-space-lg rounded-xl border border-surface-container/60 shadow-md space-y-space-md">
          <div className="flex items-center gap-2 pb-space-xs border-b border-surface-container">
            <span className="material-symbols-outlined text-primary text-xl">qr_code_scanner</span>
            <h2 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
              Gate Scanner &amp; Turnstile Hardware
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="text-xs font-mono text-outline block">
                Turnstile Solenoid Unlock Window (Seconds)
              </label>
              <input
                type="number"
                step={0.5}
                min={1}
                max={10}
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={unlockDuration}
                onChange={(e) => setUnlockDuration(Number(e.target.value))}
              />
              <span className="text-[11px] text-outline">
                Time turnstile mechanism remains unlatched after valid scan.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-outline block">
                Duplicate Replay Rejection Guard (Seconds)
              </label>
              <input
                type="number"
                step={5}
                min={10}
                max={300}
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={replayWindowSecs}
                onChange={(e) => setReplayWindowSecs(Number(e.target.value))}
              />
              <span className="text-[11px] text-outline">
                Immediately locks turnstile if the same pass token attempts re-entry within this window.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-2">
            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container cursor-pointer select-none">
              <div>
                <span className="font-bold text-xs text-on-surface block">
                  Hardware SHA256 Signature Verification
                </span>
                <span className="text-[11px] text-outline">
                  Reject tampered passes with invalid cryptographic hashes.
                </span>
              </div>
              <input
                type="checkbox"
                checked={strictSha256}
                onChange={(e) => setStrictSha256(e.target.checked)}
                className="accent-primary h-4 w-4 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container cursor-pointer select-none">
              <div>
                <span className="font-bold text-xs text-on-surface block">
                  Offline Turnstile Cache Fallback
                </span>
                <span className="text-[11px] text-outline">
                  Maintain local gate index if cellular/fiber network drops.
                </span>
              </div>
              <input
                type="checkbox"
                checked={offlineSync}
                onChange={(e) => setOfflineSync(e.target.checked)}
                className="accent-secondary h-4 w-4 rounded"
              />
            </label>
          </div>
        </div>

        {/* Environmental & Noise Curfew Regulations */}
        <div className="bg-surface-container-low p-space-lg rounded-xl border border-surface-container/60 shadow-md space-y-space-md">
          <div className="flex items-center gap-2 pb-space-xs border-b border-surface-container">
            <span className="material-symbols-outlined text-secondary text-xl">volume_up</span>
            <h2 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
              Acoustic Decibel Limits &amp; Curfew Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="text-xs font-mono text-outline block">
                Maximum Venue Decibel Ceiling (dB SPL)
              </label>
              <input
                type="number"
                min={70}
                max={105}
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={maxDecibels}
                onChange={(e) => setMaxDecibels(Number(e.target.value))}
              />
              <span className="text-[11px] text-outline">
                Permissible ambient ceiling under Gujarat Municipal Festival Norms.
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-outline block">
                Midnight Curfew Sound Cutoff (IST)
              </label>
              <input
                type="time"
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={curfewHour}
                onChange={(e) => setCurfewHour(e.target.value)}
              />
              <span className="text-[11px] text-outline">
                Main stage acoustic systems must cease amplification by this deadline.
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Safety Buffer */}
        <div className="bg-surface-container-low p-space-lg rounded-xl border border-surface-container/60 shadow-md space-y-space-md">
          <div className="flex items-center gap-2 pb-space-xs border-b border-surface-container">
            <span className="material-symbols-outlined text-primary text-xl">shield</span>
            <h2 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
              Emergency Reserve &amp; Overbooking Safeguards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="text-xs font-mono text-outline block">
                Emergency Gate Buffer (Passes)
              </label>
              <input
                type="number"
                min={50}
                max={1000}
                step={25}
                className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container text-on-surface font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={reserveBuffer}
                onChange={(e) => setReserveBuffer(Number(e.target.value))}
              />
              <span className="text-[11px] text-outline">
                Passes automatically withheld from seller quotas to guarantee walk-in capacity.
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-on-surface block">
                  Multi-Channel Auto-Balancing
                </span>
                <span className="text-[11px] text-outline">
                  Continuous yield optimization with zero capacity breach.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary/90 transition-all font-mono shadow-md"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};
