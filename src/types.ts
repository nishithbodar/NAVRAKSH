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
  contactPerson?: string;
  phone?: string;
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

export interface PassRecord {
  id: string;
  holder: string;
  phone: string;
  tier: string;
  nights: string;
  gate: string;
  hash: string;
  status: 'ACTIVE' | 'SCANNED' | 'QUARANTINED';
  seller: string;
  priceInr: number;
  rfidToken: string;
  scannedAt?: string;
}

export interface VenueSlot {
  id: string;
  title: string;
  venue: string;
  hall: string;
  date: string;
  startTime: string;
  endTime: string;
  performer: string;
  soundLevelDb: number;
  status: 'CONFIRMED' | 'FLAGGED' | 'COMPLETED';
  notes?: string;
}

export interface PriorityRequest {
  id: string;
  category: 'VIP Pass' | 'Seller Quota' | 'Emergency Access' | 'Troupe Bulk';
  requestor: string;
  details: string;
  priorityScore: number; // 1 to 5 (5 highest)
  timestamp: string;
  status: 'PENDING' | 'APPROVED' | 'DISPATCHED';
}

export interface TroupeBooking {
  id: string;
  troupeName: string;
  leaderName: string;
  leaderPhone: string;
  category: 'Garba Troupe' | 'Raas Dandiya' | 'Corporate Delegation' | 'Family VIP';
  memberCount: number;
  selectedTier: string;
  totalCostInr: number;
  assignedGate: string;
  nights: string;
  status: 'CONFIRMED' | 'PENDING' | 'CHECKED_IN';
  members: string[];
}
