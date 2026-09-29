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
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'bookings', label: 'Bookings', icon: 'confirmation_number' },
      { id: 'pass-inventory', label: 'Pass Inventory', icon: 'inventory_2' },
      { id: 'events', label: 'Events', icon: 'festival' },
      { id: 'sellers', label: 'Sellers', icon: 'storefront' },
      { id: 'customers', label: 'Customers', icon: 'group' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'qr-verification', label: 'QR Verification', icon: 'qr_code_scanner' },
      { id: 'fraud-detection', label: 'Fraud Detection', icon: 'security' },
      { id: 'allocation-optimizer', label: 'Allocation Optimizer', icon: 'tune' },
      { id: 'group-booking', label: 'Group Booking', icon: 'diversity_3' },
      { id: 'event-conflicts', label: 'Event Conflicts', icon: 'crisis_alert' },
    ],
  },
  {
    title: 'Algorithm Lab',
    items: [
      { id: 'algorithm-engine', label: 'Algorithm Engine', icon: 'memory' },
      { id: 'dsa-visualizer', label: 'DSA Visualizer', icon: 'account_tree' },
      { id: 'benchmark-lab', label: 'Benchmark Lab', icon: 'speed' },
      { id: 'complexity-analyzer', label: 'Complexity Analyzer', icon: 'query_stats' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { id: 'sales-intelligence', label: 'Sales Intelligence', icon: 'insights' },
      { id: 'performance', label: 'Performance', icon: 'bolt' },
      { id: 'reports', label: 'Reports', icon: 'receipt_long' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
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
                // Fallback elegant SVG logo if external link blocked
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
                Intelligent Navratri Pass Management &amp; Sales Optimization
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
                          <span className="font-label-sm text-xs px-1.5 py-0.5 rounded bg-surface-container text-secondary">
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

        {/* Profile Card & Engine Status */}
        <div className="p-space-md bg-surface-container-low border-t border-surface-container/60">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <img
              alt="Darshan Dave Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-outline/40 shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmluF1qUMuq3UB7U8MIydsOkN02dLQMmiCgl75uQs0uRJhnnYiO1Z4k_DjfT-DmSOqP8qyxQqQ2jA4gGtJ4vkYiTtkKlUpA_p7NA79ylRJOLPjg4PpHvGJU7y7ZyDozESwUEP_ZpOh5eGSpzt7X387H6Hn-cxs2TsV9Jb7YLvP0LXfo5m7p595I8xC6N0cGCt5C0ox7TybByjuQovjzVv2on76Vdrve9lz6GG8q7JKInATH-9bn_kKNw"
              onError={(e) => {
                // Inline avatar fallback
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                Darshan Dave
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                360° Operations Lead
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs px-space-xs py-1 rounded bg-surface-container">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-label-sm text-label-sm text-secondary truncate font-mono">
              Algorithm Engine: ACTIVE
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
