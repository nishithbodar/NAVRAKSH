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
            Engine: Optimal (0.04ms)
          </span>
        </div>

        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
            search
          </span>
          <input
            className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-label-sm font-label-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container border border-surface-container transition-all"
            placeholder="Search bookings (Hash O(1)), passes (RBT O(log n)), sellers..."
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
          <span>Navratri 2026 — All 9 Nights (Oct 10 - Oct 19)</span>
        </div>

        <div className="hidden sm:flex items-center gap-space-xs px-2.5 py-1.5 rounded-lg bg-surface-container-high text-primary font-label-sm text-label-sm font-mono border border-primary/20">
          <span className="material-symbols-outlined text-sm text-primary">developer_board</span>
          <span>DAA Engine v4.2 | 8 Active Solvers</span>
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
                  Engine Notifications
                </span>
                <span className="font-label-sm text-xs text-secondary font-mono">3 New Alerts</span>
              </div>
              <div className="space-y-2 text-body-sm">
                <div className="p-2 rounded bg-surface-container-lowest flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">
                    warning
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block text-xs">Duplicate Replay Blocked</span>
                    <span className="text-on-surface-variant text-[11px]">Pass #NAV-84291 flagged at Gate 02 turnstile.</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block text-xs">Knapsack Re-balanced</span>
                    <span className="text-on-surface-variant text-[11px]">Global yield increased to ₹70.00 Lakhs via DP Solver.</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest flex items-start gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-base shrink-0 mt-0.5">
                    account_tree
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block text-xs">RBT Height Validated</span>
                    <span className="text-on-surface-variant text-[11px]">Tree invariants 5/5 passed; max height = 4.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-space-xs pl-space-xs p-1 rounded-lg hover:bg-surface-container transition-colors"
          >
            <img
              alt="Darshan Dave"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-outline shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmluF1qUMuq3UB7U8MIydsOkN02dLQMmiCgl75uQs0uRJhnnYiO1Z4k_DjfT-DmSOqP8qyxQqQ2jA4gGtJ4vkYiTtkKlUpA_p7NA79ylRJOLPjg4PpHvGJU7y7ZyDozESwUEP_ZpOh5eGSpzt7X387H6Hn-cxs2TsV9Jb7YLvP0LXfo5m7p595I8xC6N0cGCt5C0ox7TybByjuQovjzVv2on76Vdrve9lz6GG8q7JKInATH-9bn_kKNw"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="material-symbols-outlined text-sm text-on-surface-variant">
              arrow_drop_down
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-container-low border border-surface-container-high rounded-xl shadow-2xl p-2 z-50 space-y-1">
              <div className="px-3 py-2 border-b border-surface-container text-xs">
                <span className="font-semibold text-on-surface block">Darshan Dave</span>
                <span className="text-on-surface-variant">Operations Lead • DAA Admin</span>
              </div>
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 text-xs text-on-surface hover:bg-surface-container rounded-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                <span>System Preferences</span>
              </button>
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 text-xs text-on-surface hover:bg-surface-container rounded-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">bug_report</span>
                <span>DAA Diagnostic Dump</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
