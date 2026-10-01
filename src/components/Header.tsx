import React, { useState } from 'react';

interface HeaderProps {
  onToggleMobile: () => void;
  onSearch?: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobile,
  onSearch,
  searchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/60 px-space-md lg:px-space-lg flex items-center justify-between gap-space-md">
      {/* Mobile Menu Button + Search Area */}
      <div className="flex items-center gap-space-md flex-1 max-w-2xl">
        <button
          type="button"
          onClick={onToggleMobile}
          className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container lg:hidden shrink-0"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div className="hidden xl:flex items-center gap-space-xs shrink-0">
          <span className="font-label-md text-label-md font-semibold text-primary px-2.5 py-1 rounded bg-surface-container">
            Navratri Mahotsav 2026
          </span>
          <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded flex items-center gap-1 font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Turnstiles: Online
          </span>
        </div>

        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
            search
          </span>
          <input
            className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-label-sm font-label-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container border border-surface-container transition-all"
            placeholder="Search passes, ticket holders, sellers, or RFID tokens..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-space-sm shrink-0">
        <div className="hidden lg:flex items-center gap-space-xs px-2.5 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm border border-surface-container-highest/40">
          <span className="material-symbols-outlined text-sm text-secondary">calendar_month</span>
          <span>Festival: 9 Nights (Oct 10 - Oct 19)</span>
        </div>

        <div className="hidden sm:flex items-center gap-space-xs px-2.5 py-1.5 rounded-lg bg-surface-container-high text-primary font-label-sm text-label-sm font-mono border border-primary/20">
          <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
          <span>Gate Security Active</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container ring-2 ring-surface-container-lowest"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-low border border-surface-container-high rounded-xl shadow-2xl p-space-md z-50 space-y-3">
              <div className="flex items-center justify-between border-b border-surface-container pb-2">
                <span className="font-headline-sm text-sm font-semibold text-on-surface">
                  Live Gate Alerts
                </span>
                <span className="font-label-sm text-xs text-secondary font-mono">3 New</span>
              </div>
              <div className="space-y-2 text-body-sm">
                <div className="p-2 rounded bg-surface-container-lowest flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">
                    warning
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block text-xs">Duplicate Pass Blocked</span>
                    <span className="text-on-surface-variant text-[11px]">Pass #NAV-84291 intercepted at Gate 02 turnstile.</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block text-xs">VIP Delegation Admitted</span>
                    <span className="text-on-surface-variant text-[11px]">Gate A1 processed 14 fastrack passes.</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest flex items-start gap-2">
                  <span className="material-symbols-outlined text-outline text-base shrink-0 mt-0.5">
                    schedule
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block text-xs">Stage 1 Sound Check</span>
                    <span className="text-on-surface-variant text-[11px]">Arena acoustic limits verified within 85 dB safety standard.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container transition-colors"
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="font-label-md text-xs font-semibold text-on-surface leading-tight">
                Admin Control
              </span>
              <span className="font-label-sm text-[11px] text-outline leading-tight">
                Operations Desk
              </span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-low border border-surface-container-high rounded-xl shadow-2xl py-1 z-50 text-sm">
              <div className="px-4 py-2 border-b border-surface-container text-xs text-outline">
                Signed in as <strong className="text-on-surface">admin@navraksh.gov.in</strong>
              </div>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-on-surface hover:bg-surface-container flex items-center gap-2"
                onClick={() => setShowUserMenu(false)}
              >
                <span className="material-symbols-outlined text-base">tune</span>
                Gate Preferences
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-on-surface hover:bg-surface-container flex items-center gap-2"
                onClick={() => setShowUserMenu(false)}
              >
                <span className="material-symbols-outlined text-base">download</span>
                Export Daily Audit
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
