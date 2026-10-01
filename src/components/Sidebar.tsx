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
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Executive Dashboard', icon: 'dashboard' },
      { id: 'pass-inventory', label: 'Pass Directory', icon: 'confirmation_number', badge: '24.8k' },
      { id: 'bookings', label: 'Recent Bookings', icon: 'receipt_long' },
      { id: 'customers', label: 'Attendees & Guests', icon: 'group' },
      { id: 'sellers', label: 'Seller Network', icon: 'storefront', badge: '6 Hubs' },
    ],
  },
  {
    title: 'Live Operations',
    items: [
      { id: 'qr-verification', label: 'Gate Turnstile Scanner', icon: 'qr_code_scanner', badge: 'Live' },
      { id: 'allocation-optimizer', label: 'Quota & Yield Optimizer', icon: 'tune' },
      { id: 'group-booking', label: 'Group & Troupe Bookings', icon: 'diversity_3' },
      { id: 'event-conflicts', label: 'Stage & Arena Schedules', icon: 'event_available' },
      { id: 'performance', label: 'VIP Priority Queue', icon: 'bolt' },
    ],
  },
  {
    title: 'Reports & Settings',
    items: [
      { id: 'reports', label: 'Audit Reports & CSV', icon: 'file_download' },
      { id: 'settings', label: 'System & Security Settings', icon: 'settings' },
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
                Intelligent Navratri Pass Management
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-space-md py-space-sm space-y-space-md">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline px-space-sm block">
                  {section.title}
                </span>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = currentScreen === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onNavigate(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-left transition-colors font-body-md text-body-md ${
                          isActive
                            ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg shrink-0">
                          {item.icon}
                        </span>
                        <span className="truncate flex-1">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`font-label-sm text-xs px-1.5 py-0.5 rounded ${
                              item.badge === 'Live'
                                ? 'bg-secondary/20 text-secondary font-semibold'
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

        {/* Footer / Quick Info */}
        <div className="p-space-md border-t border-surface-container/40 bg-surface-container-lowest text-xs text-on-surface-variant">
          <div className="flex items-center justify-between font-mono mb-1">
            <span className="text-secondary font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              All Gates Online
            </span>
            <span className="text-outline">Ahmedabad, GJ</span>
          </div>
          <p className="text-[11px] text-outline truncate">
            Navratri Festival Operations Suite 2026
          </p>
        </div>
      </aside>
    </>
  );
};
