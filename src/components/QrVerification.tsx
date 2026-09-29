import React, { useState, useEffect } from 'react';

export const QrVerification: React.FC = () => {
  const [selectedGate, setSelectedGate] = useState<string>('gate-02');
  const [activeState, setActiveState] = useState<'valid' | 'duplicate'>('valid');
  const [currentTime, setCurrentTime] = useState<string>('20:14:08 IST');
  const [laserPos, setLaserPos] = useState<number>(25);
  const [manualInput, setManualInput] = useState<string>('NAV-84291');
  const [showBucketVis, setShowBucketVis] = useState<boolean>(true);
  const [turnstileUnlocked, setTurnstileUnlocked] = useState<boolean>(true);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Live real clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}:${secs} IST`);
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scanner laser sweep simulation
  useEffect(() => {
    const laserInterval = setInterval(() => {
      setLaserPos((prev) => (prev === 25 ? 75 : 25));
    }, 1400);
    return () => clearInterval(laserInterval);
  }, []);

  const triggerValid = () => {
    setManualInput('NAV-84291');
    setActiveState('valid');
    setTurnstileUnlocked(true);
    setFeedbackToast('Valid pass scanned: Turnstile Solenoid Unlocked for 4.0s.');
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const triggerDuplicate = () => {
    setManualInput('NAV-84291');
    setActiveState('duplicate');
    setTurnstileUnlocked(false);
    setFeedbackToast('BREACH: Duplicate Token Detected! Turnstile Locked & Patrol Alerted.');
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const triggerInvalid = () => {
    setManualInput('ERR-CORRUPT-HASH');
    setActiveState('duplicate');
    setTurnstileUnlocked(false);
    setFeedbackToast('CHECKSUM ERROR: Altered QR signature failed SHA256 integrity check.');
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleManualVerify = () => {
    const val = manualInput.trim().toUpperCase();
    if (val.includes('ERR') || val.includes('DUP') || val === 'NAV-00000') {
      triggerDuplicate();
    } else {
      triggerValid();
    }
  };

  return (
    <div className="p-space-md lg:p-space-lg max-w-7xl mx-auto w-full space-y-space-xl">
      {/* Top Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="space-y-space-xs max-w-3xl">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm tracking-wider uppercase font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Telemetry Stream Active
            </span>
            <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase font-mono">
              Cluster: GJ-AHM-04
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Gate Verification &amp; Access Control Terminal
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Real-time entrance verification powered by{' '}
            <span className="font-label-md text-label-md text-primary font-semibold font-mono">
              O(1) Hash Table lookup
            </span>{' '}
            with instantaneous replay-attack and duplicate detection.
          </p>
        </div>

        {/* Turnstile Sync Counter Card */}
        <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-sm border-l-2 border-primary border border-surface-container/60">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
              Gate 02 Sync Clock
            </span>
            <span className="font-label-lg text-label-lg text-on-surface font-semibold font-mono">
              {currentTime}
            </span>
          </div>
          <div className="h-8 w-px bg-surface-container-highest" />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
              Turnstile State
            </span>
            <span
              className={`font-label-md text-label-md font-semibold flex items-center gap-1 font-mono ${
                turnstileUnlocked ? 'text-secondary' : 'text-error'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {turnstileUnlocked ? 'lock_open' : 'lock'}
              </span>
              {turnstileUnlocked ? 'UNLOCKED' : 'LOCKED'}
            </span>
          </div>
        </div>
      </div>

      {/* Floating feedback toast */}
      {feedbackToast && (
        <div
          className={`p-3 rounded-lg text-xs font-mono flex items-center justify-between shadow-lg border transition-all ${
            turnstileUnlocked
              ? 'bg-primary-container/20 text-primary border-primary/40'
              : 'bg-error-container/30 text-error border-error/50'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">
              {turnstileUnlocked ? 'verified' : 'security_update_warning'}
            </span>
            <span>{feedbackToast}</span>
          </div>
          <span className="text-[10px] text-outline">Terminal GJ-AHM-04</span>
        </div>
      )}

      {/* Gate Selector Navigation Pills */}
      <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-lowest p-1.5 rounded-xl shadow-sm border border-surface-container/60">
        <button
          onClick={() => setSelectedGate('gate-01')}
          className={`px-space-md py-2 rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 ${
            selectedGate === 'gate-01'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">meeting_room</span>
          Gate 01 — VIP Pavilion (Mangaliya)
        </button>

        <button
          onClick={() => setSelectedGate('gate-02')}
          className={`px-space-md py-2 rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 ${
            selectedGate === 'gate-02'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">sensor_door</span>
          Gate 02 — Main Public Entry (Shath Sangath)
          <span className="w-1.5 h-1.5 rounded-full bg-on-primary-container" />
        </button>

        <button
          onClick={() => setSelectedGate('gate-03')}
          className={`px-space-md py-2 rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 ${
            selectedGate === 'gate-03'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">meeting_room</span>
          Gate 03 — East Concourse (YMCA Aangan)
        </button>

        <button
          onClick={() => setSelectedGate('gate-04')}
          className={`px-space-md py-2 rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 ${
            selectedGate === 'gate-04'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-sm">bolt</span>
          Gate 04 — Diamond Pass Fast-Track
        </button>
      </div>

      {/* Central Gate Scanner Interface: Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: Scanner Optical Feed (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-space-md">
          {/* Viewfinder Panel */}
          <div className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl p-space-md border border-surface-container/60">
            {/* Background Camera Scrim */}
            <div className="relative w-full aspect-[4/3] rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIMKYMHJTLTafhoV0RgB9pguU8yGUF-9K9q32DI5ActMD2E8eZ6mN6ROeAULJYUKSUdr9-gl_RhPunf_RdEYoll_0Es8F2WYVroXSZmT6V9qoOuitXkycDEGtQU4b3aczuHqi-cRihD-Nlzra5gU9UKCFNGfx_UhdAnXNuBy56lZn_XtEC8LM-u6JKm4385MJMzUzLJFfWnfyqhpSkJBIOfgrFRaSzmf9_ESS1GOZOPv1uWzyFpcW-jg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/80" />

              {/* Vector Geometric Mandala Toran Reticle Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <svg className="w-72 h-72 text-primary" fill="none" stroke="currentColor" strokeWidth="0.75" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" strokeDasharray="2 3" />
                  <circle cx="50" cy="50" r="34" strokeDasharray="1 2" />
                  <polygon points="50,10 62,38 90,50 62,62 50,90 38,62 10,50 38,38" />
                  <polygon points="50,22 58,42 78,50 58,58 50,78 42,58 22,50 42,42" />
                </svg>
              </div>

              {/* Optical Focus Brackets */}
              <div className="absolute inset-6 pointer-events-none flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-t-2 border-l-2 border-primary" />
                  <div className="w-8 h-8 border-t-2 border-r-2 border-primary" />
                </div>
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-b-2 border-l-2 border-primary" />
                  <div className="w-8 h-8 border-b-2 border-r-2 border-primary" />
                </div>
              </div>

              {/* Animated Laser Scan Sweep Line */}
              <div
                className="absolute left-6 right-6 h-0.5 bg-primary-container shadow-[0_0_12px_#f97316] transition-all duration-700 ease-in-out pointer-events-none"
                style={{ top: `${laserPos}%` }}
              />

              {/* Viewfinder Center Hologram Tag */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-space-sm bg-surface-container-lowest/85 backdrop-blur-md rounded-lg max-w-[210px] shadow-lg border border-surface-container/60">
                <span className="material-symbols-outlined text-primary text-3xl mb-1">qr_code_2</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
                  ALIGN PASS QR
                </span>
                <span className="font-label-sm text-label-sm text-outline">Optics Ready • Distance 20-40cm</span>
              </div>

              {/* Overlay Metrics Tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface px-2 py-1 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm border border-surface-container/40">
                <span className="flex items-center gap-1 text-secondary font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" /> Live 60 FPS
                </span>
                <span className="text-outline font-mono">Honeywell Xenon XP 1950g</span>
              </div>
            </div>

            {/* Hardware Device Status Sub-bar */}
            <div className="mt-space-sm flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-2 rounded-lg border border-surface-container-highest/40 font-mono">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">videocam</span>
                <span>Primary Optical Sensor: 1080p RGB</span>
              </div>
              <span className="text-secondary font-semibold">Latency: 0.8ms</span>
            </div>
          </div>

          {/* Simulation Trigger Action Buttons */}
          <div className="space-y-space-xs">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block px-1 font-mono">
              Test Scenarios • Simulation Sandbox
            </span>
            <div className="grid grid-cols-1 gap-2">
              {/* Valid Button */}
              <button
                className="w-full flex items-center justify-between px-space-md py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-all group text-left shadow-sm border border-surface-container-highest/50"
                onClick={triggerValid}
                type="button"
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded bg-primary-container/20 text-primary-container flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-md font-semibold text-on-surface">
                      Simulate Scan (Valid Pass #NAV-84291)
                    </div>
                    <div className="font-label-sm text-label-sm text-outline">
                      Gold Tier • First scan instance of the evening
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-lg">
                  play_circle
                </span>
              </button>

              {/* Duplicate Button */}
              <button
                className="w-full flex items-center justify-between px-space-md py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-all group text-left shadow-sm border border-surface-container-highest/50"
                onClick={triggerDuplicate}
                type="button"
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded bg-error-container/40 text-error flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">warning</span>
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-md font-semibold text-error">
                      Simulate Duplicate Replay Attack
                    </div>
                    <div className="font-label-sm text-label-sm text-outline">
                      Same Pass #NAV-84291 presented at 2nd Gate
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-error transition-colors text-lg">
                  replay
                </span>
              </button>

              {/* Invalid Button */}
              <button
                className="w-full flex items-center justify-between px-space-md py-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-all group text-left shadow-sm border border-surface-container-highest/50"
                onClick={triggerInvalid}
                type="button"
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded bg-secondary/20 text-secondary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">gpp_bad</span>
                  </div>
                  <div>
                    <div className="font-headline-sm text-body-md font-semibold text-on-surface">
                      Simulate Invalid / Tampered Hash
                    </div>
                    <div className="font-label-sm text-label-sm text-outline">
                      Altered QR payload signature checksum failure
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-lg">
                  error_outline
                </span>
              </button>
            </div>
          </div>

          {/* Manual Pass ID Verification Box */}
          <div className="p-space-md bg-surface-container-low rounded-xl shadow-sm space-y-space-sm border border-surface-container/60">
            <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider block font-mono">
              Manual Pass ID Override Fallback
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-base">
                  pin
                </span>
                <input
                  className="w-full bg-surface-container-lowest text-on-surface font-label-md text-label-md pl-9 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container border border-surface-container font-mono"
                  placeholder="Enter NAV-XXXXX"
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualVerify()}
                />
              </div>
              <button
                className="bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm font-mono"
                onClick={handleManualVerify}
                type="button"
              >
                <span>Verify</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Verification Verdict Dynamic Deck (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-space-md">
          {/* Toggle Tabs for State Inspection */}
          <div className="flex items-center justify-between bg-surface-container-low p-1.5 rounded-xl border border-surface-container/60">
            <span className="font-label-sm text-label-sm text-outline px-space-sm uppercase tracking-wider font-mono">
              Gate Response State
            </span>
            <div className="flex items-center gap-1 font-mono">
              <button
                className={`px-space-md py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeState === 'valid'
                    ? 'bg-surface-container-highest text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => {
                  setActiveState('valid');
                  setTurnstileUnlocked(true);
                }}
                type="button"
              >
                <span className="w-2 h-2 rounded-full bg-primary-container" />
                State 1: Verified
              </button>
              <button
                className={`px-space-md py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeState === 'duplicate'
                    ? 'bg-error-container text-on-error shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => {
                  setActiveState('duplicate');
                  setTurnstileUnlocked(false);
                }}
                type="button"
              >
                <span className="w-2 h-2 rounded-full bg-error" />
                State 2: Duplicate Alert
              </button>
            </div>
          </div>

          {/* Dynamic Container for Verdict Cards */}
          <div className="relative min-h-[510px]">
            {activeState === 'valid' ? (
              /* STATE 1 CARD: VALID VERIFIED ENTRY */
              <div className="bg-surface-container-low rounded-xl p-space-lg shadow-xl space-y-space-md border border-surface-container/60 animate-in fade-in duration-200">
                {/* Verdict Hero Ribbon */}
                <div className="bg-primary-container/15 text-primary-container rounded-xl p-space-md flex items-center justify-between border border-primary-container/30">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-3xl">verified</span>
                    </div>
                    <div>
                      <div className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary font-mono">
                        Verdict Status: Granted
                      </div>
                      <div className="font-headline-md text-headline-md font-bold text-on-surface">
                        PASS #NAV-84291 • VERIFIED ENTRY
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col text-right font-mono">
                    <span className="font-label-sm text-label-sm text-outline">Scan Protocol</span>
                    <span className="font-label-md text-label-md font-semibold text-secondary">
                      FIRST SCAN TODAY
                    </span>
                  </div>
                </div>

                {/* Customer & Pass Identity Mosaic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                  {/* Attendee Entity Info */}
                  <div className="bg-surface-container rounded-xl p-space-md space-y-space-sm border border-surface-container-highest/40">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
                        Customer Details
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary bg-surface-container-highest px-2 py-0.5 rounded font-mono">
                        Verified KYC
                      </span>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <div
                        className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-outline/40 shadow-sm"
                        style={{
                          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9p4iuklakKZimfHB7gpiswM79TzNsGXsQPh1veVZrlXfxVtiQgwWf2IF3hqlY5aW8r1hn69L13HMHdXIGqU3E-EHqFaAV--SEVkbSg6dkaxt5MFLLVHtRtP-N2eGwL8DoRRFfBYfmOQoYlcD8DipyuW4qpfl_t-cGj1YreBWwQbdFLALz3hqajAODTgnqA3gPMMFb_GL4y0QiSewVwPp_PNTT-SCmcDkRnLiggl7eFo6p8aKeSUYRIA')`,
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-headline-sm text-headline-sm text-on-surface truncate">
                          Rahul Patel
                        </div>
                        <div className="font-label-md text-label-md text-on-surface-variant font-mono">
                          +91 98250 •••••
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 text-body-sm space-y-1 border-t border-surface-container-highest/40">
                      <div className="flex justify-between">
                        <span className="text-outline">Group Size:</span>
                        <span className="text-on-surface font-semibold font-label-md text-label-md font-mono">
                          Admits 2 Persons
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-outline">Tier Authority:</span>
                        <span className="text-primary font-semibold font-label-md text-label-md font-mono">
                          Gold Couple Pass
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Festival & Venue Location Details */}
                  <div className="bg-surface-container rounded-xl p-space-md space-y-space-sm border border-surface-container-highest/40">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
                        Target Event Session
                      </span>
                      <span className="font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded font-mono">
                        Night 6 (Special)
                      </span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                        Madhratri Garba 2026
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Shath Sangath Plot, SG Highway, Ahmedabad
                      </div>
                    </div>
                    <div className="pt-2 text-body-sm space-y-1 border-t border-surface-container-highest/40 font-mono">
                      <div className="flex justify-between">
                        <span className="text-outline">Issuer Origin:</span>
                        <span className="text-on-surface font-label-md text-label-md">
                          Seller A (Karnavati Hub)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-outline">RFID Wristband #</span>
                        <span className="text-secondary font-mono font-label-md text-label-md">
                          RFID-84291-C2
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit Stamp Strip */}
                <div className="p-space-md bg-surface-container-highest/60 rounded-xl flex flex-wrap items-center justify-between gap-space-sm border border-surface-container-highest">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-secondary">history</span>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block font-mono">
                        VERIFIED ENTRY TIMESTAMP
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold font-mono">
                        15 Oct 2026, 20:14:08 IST
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary">sensor_occupied</span>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block font-mono">
                        ENTRY DESIGNATION
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Gate 02 • Turnstile B
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary-container">speed</span>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block font-mono">
                        HASH RESOLUTION TIME
                      </span>
                      <span className="font-label-md text-label-md text-secondary font-semibold font-mono">
                        0.042 ms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Turnstile Command Footer */}
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-sm text-label-sm text-outline uppercase flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-secondary text-sm">sync</span>
                    Turnstile solenoid auto-relocks in 4.0s
                  </span>
                  <button
                    className="bg-surface-container text-on-surface-variant hover:text-on-surface text-label-sm font-label-sm px-3 py-1.5 rounded transition-colors flex items-center gap-1 border border-surface-container-highest/50 font-mono"
                    type="button"
                    onClick={() => {
                      setFeedbackToast('Physical gate receipt stub sent to Bluetooth thermal printer.');
                      setTimeout(() => setFeedbackToast(null), 3000);
                    }}
                  >
                    <span className="material-symbols-outlined text-sm">print</span> Print Physical Gate Stub
                  </button>
                </div>
              </div>
            ) : (
              /* STATE 2 CARD: DUPLICATE REPLAY ALERT */
              <div className="bg-surface-container-low rounded-xl p-space-lg shadow-xl space-y-space-md border border-error/50 animate-in fade-in duration-200">
                {/* Urgent Crimson Alert Ribbon */}
                <div className="bg-error-container/30 text-error rounded-xl p-space-md flex items-center justify-between border border-error/40">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shadow-md animate-pulse">
                      <span className="material-symbols-outlined text-3xl">gpp_bad</span>
                    </div>
                    <div>
                      <div className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-error font-mono">
                        Security Breach Code #409: Duplicate Token
                      </div>
                      <div className="font-headline-md text-headline-md font-bold text-error">
                        ACCESS DENIED — PASS ALREADY SCANNED
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded bg-error text-on-error font-label-sm text-label-sm font-bold tracking-wider uppercase font-mono">
                    Turnstile Locked
                  </span>
                </div>

                {/* Forensic Audit Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                  {/* Original Scan Historical Proof */}
                  <div className="bg-surface-container rounded-xl p-space-md space-y-space-sm border-l-2 border-secondary border border-surface-container-highest/40">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
                        Initial Authorized Scan
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary bg-surface-container-highest px-2 py-0.5 rounded font-mono">
                        ORIGINAL ENTRY
                      </span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-on-surface font-mono">
                      15 Oct 2026 • 20:02:11 IST
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Initial access successfully consumed{' '}
                      <span className="font-semibold text-secondary">11m 57s ago</span> at{' '}
                      <span className="text-on-surface font-semibold">
                        Gate 01 — VIP Pavilion (Mangaliya Turnstile 04)
                      </span>.
                    </p>
                    <div className="p-2 rounded bg-surface-container-lowest font-label-sm text-label-sm text-outline font-mono border border-surface-container/40">
                      Holder: Rahul Patel | Operator: Guard_Jadav
                    </div>
                  </div>

                  {/* Replay Attack Details */}
                  <div className="bg-surface-container rounded-xl p-space-md space-y-space-sm border-l-2 border-error border border-surface-container-highest/40">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-error uppercase tracking-wider font-mono">
                        Illegal Re-Entry Attempt
                      </span>
                      <span className="font-label-sm text-label-sm text-error bg-error-container/40 px-2 py-0.5 rounded font-mono font-bold">
                        FLAGGED REPLAY
                      </span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-error font-mono">
                      15 Oct 2026 • 20:14:08 IST
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Physical wristband duplicate clone or unauthorized WhatsApp QR screenshot attempted at current terminal (
                      <span className="text-on-surface font-semibold">Gate 02</span>).
                    </p>
                    <div className="p-2 rounded bg-surface-container-lowest font-label-sm text-label-sm text-error font-mono border border-error/20">
                      Payload SHA256 Collision Check: MATCH 100%
                    </div>
                  </div>
                </div>

                {/* Security Dispatch Quarantine Block */}
                <div className="p-space-md bg-error-container/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-error/30">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-error text-2xl">local_police</span>
                    <div>
                      <span className="font-label-md text-label-md font-bold text-error block font-mono">
                        PASS QUARANTINED • DISPATCH TRANSMITTED
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Security Patrol Unit 4 notified at Turnstile B perimeter.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-error hover:bg-error-container text-on-error font-label-sm text-label-sm font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm font-mono"
                      type="button"
                      onClick={() => {
                        setFeedbackToast('Turnstile physically locked down. Mechanical latch active.');
                        setTimeout(() => setFeedbackToast(null), 3000);
                      }}
                    >
                      Hold Turnstile
                    </button>
                    <button
                      className="bg-surface-container-highest text-on-surface hover:bg-surface-bright font-label-sm text-label-sm px-3.5 py-2 rounded-lg transition-colors border border-surface-container font-mono"
                      type="button"
                      onClick={() => {
                        triggerValid();
                      }}
                    >
                      Manual Override (Supervisor)
                    </button>
                  </div>
                </div>

                {/* Replay Signature Diagnostic */}
                <div className="font-label-sm text-label-sm text-outline flex items-center justify-between font-mono">
                  <span>Threat Vector: Concurrent Entry Spoofing</span>
                  <span className="text-error font-bold">Replay Delta: Δt = 717 seconds</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Algorithmic Telemetry Deck: DAA Gate Verification Engine */}
      <div className="bg-surface-container-low rounded-xl p-space-lg shadow-xl space-y-space-md border border-surface-container/60">
        {/* Telemetry Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs border-b border-surface-container">
          <div className="flex items-center gap-space-sm">
            <div className="w-7 h-7 rounded bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-base">memory</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                DAA Gate Verification Engine
              </h2>
              <p className="font-label-sm text-label-sm text-outline font-mono">
                Deterministic constant-time hashing &amp; zero-overhead duplicate indexing
              </p>
            </div>
          </div>
          <button
            className="text-primary hover:text-primary-fixed font-label-sm text-label-sm flex items-center gap-1 transition-colors self-start sm:self-auto font-mono"
            onClick={() => setShowBucketVis(!showBucketVis)}
            type="button"
          >
            <span className="material-symbols-outlined text-base">account_tree</span>
            <span>{showBucketVis ? 'Hide' : 'Show'} Hash Bucket Visualizer</span>
          </button>
        </div>

        {/* 5 High-Density Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
          {/* Metric 1 */}
          <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between space-y-2 border border-surface-container-highest/40">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
              Search Method
            </span>
            <div className="font-label-md text-label-md text-primary font-semibold truncate font-mono">
              Open-Addressing Hash
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              MurmurHash3 + Robin Hood
            </span>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between space-y-2 border border-surface-container-highest/40">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
              Average Complexity
            </span>
            <div className="font-headline-sm text-headline-sm text-secondary font-bold font-mono">
              O(1)
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              Constant time probe sequence
            </span>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between space-y-2 border border-surface-container-highest/40">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
              Worst Case Guard
            </span>
            <div className="font-label-md text-label-md text-on-surface font-semibold font-mono">
              O(n) → Mitigated
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              Load factor α &lt; 0.65 threshold
            </span>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between space-y-2 border border-surface-container-highest/40">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
              Measured Lookup
            </span>
            <div className="font-headline-sm text-headline-sm text-primary font-bold font-mono">
              0.042 ms
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              L1/L2 cache resident lookup
            </span>
          </div>

          {/* Metric 5 */}
          <div className="bg-surface-container p-space-sm rounded-lg flex flex-col justify-between space-y-2 border border-surface-container-highest/40">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
              Throughput Capacity
            </span>
            <div className="font-headline-sm text-headline-sm text-secondary font-bold font-mono">
              23.8k/min
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              Theoretical distributed ceiling
            </span>
          </div>
        </div>

        {/* Collapsible Hash Bucket Visualizer Module */}
        {showBucketVis && (
          <div className="p-space-md bg-surface-container-lowest rounded-xl space-y-space-sm border border-surface-container/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-label-sm font-label-sm text-outline gap-2 font-mono">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm">terminal</span>
                <span className="text-on-surface">
                  hash(&quot;NAV-84291&quot;) % 65536 ={' '}
                  <span className="text-primary font-bold">41208</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>
                  Bucket Status: <span className="text-secondary font-bold">DIRECT_HIT</span>
                </span>
                <span>
                  Collisions: <span className="text-on-surface">0</span>
                </span>
                <span>
                  Probe Depth: <span className="text-primary font-bold">1</span>
                </span>
              </div>
            </div>

            {/* Bucket Cells Array Demonstration */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 font-mono text-center pt-1">
              <div className="p-2 bg-surface-container rounded text-outline text-label-sm opacity-60 border border-surface-container-highest/40">
                <div className="text-[9px] uppercase">Slot 41205</div>
                <div className="truncate text-on-surface-variant">#NAV-31994</div>
                <div className="text-[9px] text-outline">USED</div>
              </div>
              <div className="p-2 bg-surface-container rounded text-outline text-label-sm opacity-60 border border-surface-container-highest/40">
                <div className="text-[9px] uppercase">Slot 41206</div>
                <div className="truncate text-on-surface-variant">••• EMPTY</div>
                <div className="text-[9px] text-outline">NULL</div>
              </div>
              <div className="p-2 bg-surface-container rounded text-outline text-label-sm opacity-60 border border-surface-container-highest/40">
                <div className="text-[9px] uppercase">Slot 41207</div>
                <div className="truncate text-on-surface-variant">#NAV-65102</div>
                <div className="text-[9px] text-outline">USED</div>
              </div>

              {/* TARGET BUCKET */}
              <div className="p-2 bg-primary/20 rounded text-label-sm font-semibold shadow-sm ring-1 ring-primary/40 border border-primary">
                <div className="text-[9px] uppercase text-primary font-bold">Slot 41208 • TARGET</div>
                <div className="truncate text-primary font-bold">#NAV-84291</div>
                <div className="text-[9px] text-secondary">PTR → 0x7FFF9E1</div>
              </div>

              <div className="p-2 bg-surface-container rounded text-outline text-label-sm opacity-60 border border-surface-container-highest/40">
                <div className="text-[9px] uppercase">Slot 41209</div>
                <div className="truncate text-on-surface-variant">••• EMPTY</div>
                <div className="text-[9px] text-outline">NULL</div>
              </div>
              <div className="p-2 bg-surface-container rounded text-outline text-label-sm opacity-60 border border-surface-container-highest/40">
                <div className="text-[9px] uppercase">Slot 41210</div>
                <div className="truncate text-on-surface-variant">#NAV-99120</div>
                <div className="text-[9px] text-outline">USED</div>
              </div>
              <div className="p-2 bg-surface-container rounded text-outline text-label-sm opacity-60 border border-surface-container-highest/40">
                <div className="text-[9px] uppercase">Slot 41211</div>
                <div className="truncate text-on-surface-variant">••• EMPTY</div>
                <div className="text-[9px] text-outline">NULL</div>
              </div>
              <div className="p-2 bg-surface-container rounded text-outline text-label-sm opacity-60 border border-surface-container-highest/40">
                <div className="text-[9px] uppercase">Slot 41212</div>
                <div className="truncate text-on-surface-variant">#NAV-12004</div>
                <div className="text-[9px] text-outline">USED</div>
              </div>
            </div>

            <div className="font-label-sm text-label-sm text-on-surface-variant pt-1 flex items-center justify-between font-mono">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">memory</span>
                Bucket Load Factor: α = 34,912 / 65,536 (0.532) • Rehash Overhead: Idle
              </span>
              <span className="text-outline">Direct Pointer Dereference: 14 nanoseconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
