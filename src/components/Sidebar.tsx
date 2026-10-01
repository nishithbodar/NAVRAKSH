import React from 'react';
import { ScreenId } from '../types.ts';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: ScreenId;
  label: string;
  icon: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Festival Operations',
    items: [
      { id: 'dashboard', label: 'Executive Dashboard', icon: 'dashboard' },
      { id: 'pass-inventory', label: 'Pass Directory', icon: 'confirmation_number', badge: '24.8k' },
      { id: 'allocation-optimizer', label: 'Quota & Yield (DP)', icon: 'tune' },
      { id: 'group-booking', label: 'Group Booking Optimizer', icon: 'diversity_3', badge: '4 Solvers' },
      { id: 'event-conflicts', label: 'Stage Conflicts (Interval)', icon: 'event_available' },
      { id: 'qr-verification', label: 'Gate Turnstile Scanner', icon: 'qr_code_scanner', badge: 'Live' },
      { id: 'performance', label: 'VIP Priority Queue', icon: 'bolt' },
    ],
  },
  {
    title: 'DAA Algorithm Labs',
    items: [
      { id: 'benchmark-lab', label: 'Algorithm Benchmark Lab', icon: 'analytics', badge: 'Real' },
      { id: 'complexity-analyzer', label: 'Complexity Analyzer', icon: 'function' },
      { id: 'divide-conquer-lab', label: 'Divide & Conquer Suite', icon: 'call_split' },
      { id: 'heap-comparison', label: 'Priority Heap Lab', icon: 'layers' },
      { id: 'top-k-sales', label: 'Top-K Sales Intelligence', icon: 'leaderboard' },
      { id: 'dsu-visualizer', label: 'Festival Zone DSU', icon: 'hub' },
      { id: 'exact-vs-approx', label: 'Exact vs Approx (NP)', icon: 'balance' },
    ],
  },
  {
    title: 'Directories & Audit',
    items: [
      { id: 'sellers', label: 'Seller Network', icon: 'storefront', badge: '6 Hubs' },
      { id: 'customers', label: 'Attendees & Guests', icon: 'group' },
      { id: 'reports', label: 'Audit Reports & CSV', icon: 'file_download' },
      { id: 'settings', label: 'System & Gate Settings', icon: 'settings' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  mobileOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container/60 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo / Brand Header */}
          <div className="p-space-lg flex items-start gap-space-sm bg-surface-container-lowest border-b border-surface-container/40">
            <img
              alt="NAVRAKSH Brand Mark"
              className="h-9 w-auto object-contain shrink-0"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Utxwedp-4O0PnYVZBmU67a29bpsuCswYwqoWo6AOECC1uMPML9-ec2ljMttJIUsodj6VeErDogkKkqVlCPI-sVca0XJABzMT1UsESeVFw3rw19OGgB8NfFIF2kJuq-WTQCWT92ImH6p9mieWYyYA-Bd8K_Q43DAhTuthEOgLepOAPQlSqZNU2mqaxksbPK-6tsyIxrWbXwXlYdjgX1VP2EwiO0SqKaW6EakPjqANQrvvlXFk3uEKlK5sel"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary leading-none">
                  NAVRAKSH
                </span>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container text-secondary uppercase font-semibold">
                  v4.2
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">
                DAA Pass Management & Lab
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="px-space-md py-1 font-label-sm text-label-sm font-semibold tracking-wider text-outline uppercase font-mono">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = currentScreen === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onNavigate(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-space-md py-2.5 rounded-lg text-left font-label-lg text-label-lg transition-colors group ${
                          active
                            ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                            : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm min-w-0">
                          <span
                            className={`material-symbols-outlined text-xl transition-colors shrink-0 ${
                              active ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`font-label-sm text-label-sm font-mono px-2 py-0.5 rounded-full text-xs shrink-0 ${
                              active
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* User / Status Footer */}
        <div className="p-space-md border-t border-surface-container/60 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono shrink-0">
              DAA
            </div>
            <div className="min-w-0">
              <span className="font-body-md text-body-md font-semibold text-on-surface block truncate">
                Admin Console
              </span>
              <span className="font-body-sm text-body-sm text-secondary block font-mono">
                B.Tech Sem 5 DAA
              </span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-secondary shrink-0" title="Engine Active" />
        </div>
      </aside>
    </>
  );
};
