export type ScreenId =
  | 'dashboard'
  | 'bookings'
  | 'pass-inventory'
  | 'events'
  | 'sellers'
  | 'customers'
  | 'qr-verification'
  | 'fraud-detection'
  | 'allocation-optimizer'
  | 'group-booking'
  | 'event-conflicts'
  | 'algorithm-engine'
  | 'dsa-visualizer'
  | 'benchmark-lab'
  | 'complexity-analyzer'
  | 'sales-intelligence'
  | 'performance'
  | 'reports'
  | 'settings';

export interface RbtNode {
  id: string;
  color: 'BLACK' | 'RED';
  holder: string;
  passType: string;
  night: string;
  gate: string;
  hash: string;
  blackHeight: number;
  x?: number;
  y?: number;
  level?: number;
  label?: string;
  left?: string;
  right?: string;
}

export interface SellerAllocation {
  id: string;
  name: string;
  subtitle: string;
  tier: string;
  location: string;
  trueDemand: number;
  currentQuota: number;
  optimizedQuota: number;
  netShift: number;
  fillRate: number;
  expRevenueLakhs: number;
  risk: 'Low' | 'Minimal' | 'Re-routed';
}

export interface GateScanEvent {
  id: string;
  passId: string;
  holder: string;
  timestamp: string;
  gate: string;
  turnstile: string;
  status: 'GRANTED' | 'DUPLICATE_ALERT' | 'INVALID_HASH';
  tier: string;
  latencyMs: number;
}
