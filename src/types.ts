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
  | 'benchmark-lab'
  | 'complexity-analyzer'
  | 'divide-conquer-lab'
  | 'heap-comparison'
  | 'top-k-sales'
  | 'dsu-visualizer'
  | 'exact-vs-approx'
  | 'dsa-visualizer'
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
  hashToken: string;
  rejectionReason?: string;
}

export interface PassRecord {
  id: string;
  holder: string;
  phone: string;
  tier: string;
  nights: string;
  gate: string;
  hashToken?: string;
  hash?: string;
  rfidUid?: string;
  rfidToken?: string;
  price?: number;
  priceInr?: number;
  seller?: string;
  scannedAt?: string;
  status: 'Active' | 'Scanned' | 'Flagged' | 'VIP' | 'ACTIVE' | 'SCANNED' | 'QUARANTINED' | string;
}

export interface VenueSlot {
  id: string;
  title: string;
  venue: string;
  hall: string;
  date: string;
  startTime: string;
  endTime: string;
  soundCurfewCompliant?: boolean;
  decibelRating?: number;
  artistOrTroupe?: string;
  performer?: string;
  status?: string;
  notes?: string;
  soundLevelDb?: number;
}

export interface TroupeBooking {
  id: string;
  troupeName: string;
  leaderName: string;
  leaderPhone: string;
  groupSize?: number;
  memberCount?: number;
  budgetAllocated?: number;
  totalCostInr?: number;
  allocatedTier?: string;
  selectedTier?: string;
  nightSchedule?: string;
  nights?: string;
  assignedGate?: string;
  dsuClusterId?: string;
  zonePreference?: string;
  category?: string;
  members?: string[];
  status: 'Confirmed' | 'Review' | 'Waitlist' | 'CONFIRMED' | 'CHECKED_IN' | string;
}

export interface PriorityRequest {
  id: string;
  category: string;
  requestor: string;
  details: string;
  priorityScore: number;
  submittedAt?: string;
  timestamp?: string;
  status: 'QUEUED' | 'DISPATCHED' | 'HELD' | 'PENDING' | string;
}
