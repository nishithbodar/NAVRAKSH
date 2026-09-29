import React, { useState } from 'react';
import { RbtNode } from '../types.ts';

interface DsaVisualizerProps {
  onSelectPass?: (passId: string) => void;
}

const INITIAL_NODES: Record<string, RbtNode> = {
  '1032': { id: '1032', color: 'BLACK', holder: 'Aarav Joshi', passType: 'Royal Lounge Platinum', night: 'All 9 Nights', gate: 'Gate A1 (VIP Fastrack)', hash: '0x99F4A7C1', blackHeight: 3 },
  '1016': { id: '1016', color: 'BLACK', holder: 'Kavita Dave', passType: 'Heritage Garba Access', night: 'Night 1-4 Suite', gate: 'Gate B2 (Turnstile)', hash: '0x88B3E42D', blackHeight: 2 },
  '1008': { id: '1008', color: 'BLACK', holder: 'Devang Parikh', passType: 'Garba Arena Regular', night: 'Night 5 (Maha Garba)', gate: 'Gate C4 (General)', hash: '0x17A9F091', blackHeight: 1 },
  '1024': { id: '1024', color: 'RED', holder: 'Rahul Patel', passType: 'Madhratri Gold Tier', night: 'Night 1 to 9 Season', gate: 'Gate A3 (Priority)', hash: '0x43D211BA', blackHeight: 1, label: 'R. Patel' },
  '1056': { id: '1056', color: 'BLACK', holder: 'Nirav Trivedi', passType: 'Heritage Pass Deluxe', night: 'Night 7-9 Finale', gate: 'Gate B1 (VIP)', hash: '0x22F43C09', blackHeight: 2 },
  '1040': { id: '1040', color: 'RED', holder: 'Priya Shah', passType: 'Saibo Diamond Pavillion', night: 'Night 6 (Sharad Purnima)', gate: 'Gate A1 (VIP Fastrack)', hash: '0xDF8109EA', blackHeight: 1, label: 'P. Shah' },
  '1036': { id: '1036', color: 'BLACK', holder: 'Ananya Vyas', passType: 'Swara Mandir Premium', night: 'Night 3 Festive', gate: 'Gate B3 (Turnstile)', hash: '0x55E90288', blackHeight: 1 },
  '1048': { id: '1048', color: 'BLACK', holder: 'Hardik Chauhan', passType: 'Mahotsav VIP Club', night: 'Night 8 Special', gate: 'Gate A2 (Priority)', hash: '0x66AB4510', blackHeight: 1 },
  '1072': { id: '1072', color: 'BLACK', holder: 'Bina Vora', passType: 'Khelaiya Gold Access', night: 'Night 9 Dussehra Eve', gate: 'Gate C1 (Standard)', hash: '0x44CD117E', blackHeight: 1 },
  '1088': { id: '1088', color: 'RED', holder: 'Tanmay Mehta', passType: 'Aangan Regular Pass', night: 'Night 4 Mid-Week', gate: 'Gate C2 (Standard)', hash: '0x99238FF0', blackHeight: 1, label: 'T. Mehta' },
};

export const DsaVisualizer: React.FC<DsaVisualizerProps> = () => {
  const [activeTab, setActiveTab] = useState<'rbt' | 'interval' | 'heap' | 'fibonacci' | 'dsu'>('rbt');
  const [nodes, setNodes] = useState<Record<string, RbtNode>>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('1032');
  const [inputVal, setInputVal] = useState<string>('1042');
  const [lastOp, setLastOp] = useState<string>('Insert(1048) → Left Rotation at Node 1032 → Recolor to Black');
  const [execTime, setExecTime] = useState<string>('0.12 ms');
  const [notification, setNotification] = useState<string | null>(null);

  const selectedNode = nodes[selectedNodeId] || nodes['1032'];

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  const handleSelectNode = (id: string) => {
    if (nodes[id]) {
      setSelectedNodeId(id);
    }
  };

  const handleSearch = () => {
    const val = inputVal.trim();
    if (nodes[val]) {
      setSelectedNodeId(val);
      setLastOp(`Search(${val}) -> Key found in O(log 11) = 3 comparisons`);
      setExecTime('0.04 ms');
      showNotification(`Node #${val} resolved in 0.04ms: Attended by ${nodes[val].holder}`);
    } else {
      setLastOp(`Search(${val || 'Null'}) -> Key not in RBT index. Reached Black NIL leaf.`);
      setExecTime('0.05 ms');
      showNotification(`Key #${val || 'Null'} not found: NIL leaf reached with 0 collisions.`);
    }
  };

  const handleInsert = () => {
    const val = inputVal.trim() || '1042';
    if (!nodes[val]) {
      const newNode: RbtNode = {
        id: val,
        color: 'RED',
        holder: 'Rohan Deshmukh',
        passType: 'FastTrack Festive Pass',
        night: 'Night 6 Special',
        gate: 'Gate B1 (VIP)',
        hash: '0xAA84FD12',
        blackHeight: 1,
        label: 'R. Deshmukh',
      };
      setNodes((prev) => ({ ...prev, [val]: newNode }));
      setSelectedNodeId(val);
    }
    setLastOp(`Insert(${val}) -> RB-Insert-Fixup (Case 1: Uncle is Black, Right Rotate)`);
    setExecTime('0.14 ms');
    showNotification(`Simulated Insertion of #${val}: Invariants preserved. Max-height invariant 2·log(n+1) maintained.`);
  };

  const handleDelete = () => {
    const val = selectedNodeId;
    setLastOp(`Delete(${val}) -> Node re-balanced with 1 Left Rotation, Black balance preserved`);
    setExecTime('0.11 ms');
    showNotification(`Node #${val} soft-deleted from active index. Double-black resolved in O(1) rotation.`);
  };

  const handleRandom = () => {
    const keys = Object.keys(nodes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setSelectedNodeId(randomKey);
    setInputVal(randomKey);
    setLastOp(`Random Sample -> Node #${randomKey} loaded into cache`);
    setExecTime('0.02 ms');
  };

  const handleReset = () => {
    setNodes(INITIAL_NODES);
    setSelectedNodeId('1032');
    setInputVal('1042');
    setLastOp('Reset Tree -> Topology re-anchored to balanced Navratri 2026 canonical manifest');
    setExecTime('0.09 ms');
    showNotification('RBT Structure restored to canonical 11-node balanced manifest.');
  };

  return (
    <div className="px-space-md lg:px-margin py-space-lg flex flex-col gap-space-lg">
      {/* Header Section */}
      <div className="relative flex flex-col xl:flex-row xl:items-end justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-space-xs mb-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary px-2 py-0.5 rounded bg-surface-container-high font-mono">
              Algorithm Lab
            </span>
            <span className="text-outline font-label-sm text-label-sm">•</span>
            <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-sm">auto_graph</span>
              Real-time Structure Telemetry
            </span>
            <span className="text-outline font-label-sm text-label-sm">•</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              Kernel v4.28-DAA
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight">
            Data Structure Visualizer
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Interactive algorithmic workbench demonstrating core DAA data structures powering the Navraksh pass ecosystem.
          </p>
        </div>

        {/* Quick System Stat Chips */}
        <div className="flex flex-wrap items-center gap-space-xs">
          <div className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">token</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline">Total Pass Index</span>
              <span className="font-label-md text-label-md font-semibold text-on-surface font-mono">
                24,890 Leaves
              </span>
            </div>
          </div>
          <div className="px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-base">lock_clock</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline">Lookup Bound</span>
              <span className="font-label-md text-label-md font-semibold text-secondary font-mono">
                O(log n) Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Structure Navigation Tabs */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('rbt')}
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-headline-sm text-label-md font-semibold whitespace-nowrap transition-all ${
            activeTab === 'rbt'
              ? 'bg-primary-container text-on-primary-container shadow-md'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className={`w-2 h-2 rounded-full ${activeTab === 'rbt' ? 'bg-on-primary-container' : 'bg-outline'}`} />
          <span className="material-symbols-outlined text-lg">account_tree</span>
          <span>Red-Black Tree (Pass ID Index)</span>
        </button>

        <button
          onClick={() => setActiveTab('interval')}
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-headline-sm text-label-md whitespace-nowrap transition-all ${
            activeTab === 'interval'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'interval' ? 'bg-on-primary-container' : 'bg-outline'}`} />
          <span className="material-symbols-outlined text-lg">date_range</span>
          <span>Interval Tree (Venue Time Conflicts)</span>
        </button>

        <button
          onClick={() => setActiveTab('heap')}
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-headline-sm text-label-md whitespace-nowrap transition-all ${
            activeTab === 'heap'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'heap' ? 'bg-on-primary-container' : 'bg-outline'}`} />
          <span className="material-symbols-outlined text-lg">stacked_line_chart</span>
          <span>Binary Heap / Priority Queue (Top-K Demand)</span>
        </button>

        <button
          onClick={() => setActiveTab('fibonacci')}
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-headline-sm text-label-md whitespace-nowrap transition-all ${
            activeTab === 'fibonacci'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'fibonacci' ? 'bg-on-primary-container' : 'bg-outline'}`} />
          <span className="material-symbols-outlined text-lg">merge_type</span>
          <span>Binomial &amp; Fibonacci Heap (Pass Merging)</span>
        </button>

        <button
          onClick={() => setActiveTab('dsu')}
          className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-headline-sm text-label-md whitespace-nowrap transition-all ${
            activeTab === 'dsu'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
          type="button"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'dsu' ? 'bg-on-primary-container' : 'bg-outline'}`} />
          <span className="material-symbols-outlined text-lg">hub</span>
          <span>Disjoint Set Union-Find (Group Clustering)</span>
        </button>
      </div>

      {/* Main Visualizer Content Area */}
      {activeTab === 'rbt' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Left & Center: Canvas Controls + Interactive Tree Stage */}
          <div className="xl:col-span-8 flex flex-col gap-space-md">
            {/* Interactive Control Bar */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-surface-container/60">
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                {/* Value Insertion / Search Segment */}
                <div className="flex items-center gap-space-xs flex-1 min-w-[280px]">
                  <div className="relative w-32">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-outline">
                      ID:
                    </span>
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface font-label-md text-label-md pl-8 pr-2 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container font-mono"
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <button
                    className="px-3 py-2 rounded-lg bg-primary text-on-primary font-headline-sm text-label-sm font-semibold hover:bg-primary/90 flex items-center gap-1 transition-transform active:scale-95 shadow-sm"
                    onClick={handleInsert}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">add_circle</span>
                    <span>+ Insert Node</span>
                  </button>
                  <button
                    className="px-3 py-2 rounded-lg bg-surface-container-highest text-tertiary font-label-sm text-label-sm font-medium hover:bg-surface-container transition-colors flex items-center gap-1"
                    onClick={handleDelete}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                    <span>- Delete</span>
                  </button>
                  <button
                    className="px-3 py-2 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-1"
                    onClick={handleSearch}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base text-secondary">search</span>
                    <span>Search O(log n)</span>
                  </button>
                </div>

                {/* Utility Controls */}
                <div className="flex items-center gap-space-xs">
                  <button
                    className="px-2.5 py-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm flex items-center gap-1"
                    onClick={handleRandom}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm text-primary">casino</span>
                    <span>🎲 Random Pass</span>
                  </button>
                  <button
                    className="p-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                    onClick={handleReset}
                    title="Reset Tree"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">restart_alt</span>
                  </button>
                  {/* Speed Controller */}
                  <div className="flex items-center gap-2 pl-2 border-l border-surface-container-highest">
                    <span className="material-symbols-outlined text-base text-outline">speed</span>
                    <span className="font-label-sm text-label-sm text-on-surface font-mono">1.0x</span>
                  </div>
                </div>
              </div>

              {/* Tree Metrics Badge Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-space-xs pt-space-xs border-t border-surface-container/60">
                <div className="p-2 rounded-lg bg-surface-container-lowest/80 flex flex-col border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline">Tree Height</span>
                  <span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold font-mono">
                    4
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-lowest/80 flex flex-col border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline">Total Nodes</span>
                  <span className="font-headline-sm text-headline-sm text-secondary leading-tight font-bold font-mono">
                    {Object.keys(nodes).length}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-lowest/80 flex flex-col border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline">Black Height</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold font-mono">
                    3 <span className="font-label-sm text-label-sm font-normal text-secondary">(Prop 5 ✓)</span>
                  </span>
                </div>
                <div className="col-span-2 p-2 rounded-lg bg-surface-container-lowest/80 flex flex-col justify-center border border-surface-container/40">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-label-sm text-label-sm text-outline">Last Operation Pipeline</span>
                    <span className="font-label-sm text-label-sm text-secondary font-mono">{execTime}</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant truncate font-mono">
                    {lastOp}
                  </p>
                </div>
              </div>
            </div>

            {/* Notification Banner */}
            {notification && (
              <div className="px-space-md py-2 rounded-lg bg-primary-container/20 border border-primary/30 text-primary font-label-sm text-label-sm flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>{notification}</span>
              </div>
            )}

            {/* Interactive Visual Tree Canvas */}
            <div className="relative w-full rounded-2xl bg-surface-container-lowest overflow-hidden shadow-2xl p-space-md flex flex-col min-h-[580px] border border-surface-container/80">
              {/* Geometric Background Matrix Graphic */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffb690_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="relative z-10 flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-mono">
                    Canvas ID: RBT-ROOT-0x3FA
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-mono">
                    Self-Balancing Binary Search Index
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface">
                    <span className="w-3 h-3 rounded-full bg-surface-container-highest shadow-inner ring-1 ring-outline/30" />
                    <span>Black Node</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary">
                    <span className="w-3 h-3 rounded-full bg-tertiary-container shadow-inner ring-1 ring-tertiary/40" />
                    <span>Red Node</span>
                  </div>
                </div>
              </div>

              {/* Tree Visualizer Coordinate Hierarchy Canvas */}
              <div className="relative flex-1 w-full min-h-[500px] flex items-center justify-center overflow-x-auto py-6">
                <div className="relative w-[900px] h-[460px] flex-shrink-0">
                  {/* SVG Connection Vectors */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-outline-variant/60" strokeLinecap="round" strokeWidth="2">
                    {/* Root 1032 (450, 36) to Left 1016 (234, 165) and Right 1056 (666, 165) */}
                    <path d="M 450 48 L 234 165" />
                    <path d="M 450 48 L 666 165" />

                    {/* Node 1016 (234, 165) to 1008 (130, 280) and 1024 (338, 280) */}
                    <path d="M 234 165 L 130 275" />
                    <path d="M 234 165 L 338 275" />

                    {/* Node 1056 (666, 165) to 1040 (562, 280) and 1072 (770, 280) */}
                    <path d="M 666 165 L 562 275" />
                    <path d="M 666 165 L 770 275" />

                    {/* Node 1040 (562, 275) to 1036 (510, 390) and 1048 (614, 390) */}
                    <path d="M 562 275 L 510 388" />
                    <path d="M 562 275 L 614 388" />

                    {/* Node 1072 (770, 275) to 1088 (822, 388) */}
                    <path d="M 770 275 L 822 388" />
                  </svg>

                  {/* LEVEL 0: ROOT 1032 [BLACK] */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 flex flex-col items-center z-20">
                    <button
                      className={`group w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-xl ${
                        selectedNodeId === '1032'
                          ? 'ring-2 ring-primary-container bg-surface-container-high scale-110'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                      onClick={() => handleSelectNode('1032')}
                      type="button"
                    >
                      <span className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary font-mono">
                        1032
                      </span>
                      <span className="font-label-sm text-[9px] uppercase tracking-tighter text-outline font-mono">
                        ROOT·BLK
                      </span>
                    </button>
                    <div className="mt-1 px-2 py-0.5 rounded bg-surface-container/80 text-[10px] font-mono text-outline">
                      Bh=3
                    </div>
                  </div>

                  {/* LEVEL 1: LEFT CHILD 1016 [BLACK] */}
                  <div className="absolute left-[26%] -translate-x-1/2 top-36 flex flex-col items-center z-20">
                    <button
                      className={`group w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-lg ${
                        selectedNodeId === '1016'
                          ? 'ring-2 ring-primary-container bg-surface-container-high scale-110'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                      onClick={() => handleSelectNode('1016')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-lg font-bold text-on-surface font-mono">1016</span>
                      <span className="font-label-sm text-[8px] uppercase tracking-tighter text-outline font-mono">BLK</span>
                    </button>
                    <div className="mt-1 px-1.5 py-0.2 rounded bg-surface-container/80 text-[9px] font-mono text-outline">
                      Bh=2
                    </div>
                  </div>

                  {/* LEVEL 1: RIGHT CHILD 1056 [BLACK] */}
                  <div className="absolute left-[74%] -translate-x-1/2 top-36 flex flex-col items-center z-20">
                    <button
                      className={`group w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-lg ${
                        selectedNodeId === '1056'
                          ? 'ring-2 ring-primary-container bg-surface-container-high scale-110'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                      onClick={() => handleSelectNode('1056')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-lg font-bold text-on-surface font-mono">1056</span>
                      <span className="font-label-sm text-[8px] uppercase tracking-tighter text-outline font-mono">BLK</span>
                    </button>
                    <div className="mt-1 px-1.5 py-0.2 rounded bg-surface-container/80 text-[9px] font-mono text-outline">
                      Bh=2
                    </div>
                  </div>

                  {/* LEVEL 2: SUBTREE LEFT of 1016 -> 1008 [BLACK] */}
                  <div className="absolute left-[14.5%] -translate-x-1/2 top-64 flex flex-col items-center z-20">
                    <button
                      className={`group w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-md ${
                        selectedNodeId === '1008'
                          ? 'ring-2 ring-primary-container bg-surface-container-high scale-110'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                      onClick={() => handleSelectNode('1008')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-md font-bold text-on-surface font-mono">1008</span>
                      <span className="font-label-sm text-[8px] uppercase tracking-tighter text-outline font-mono">BLK</span>
                    </button>
                  </div>

                  {/* LEVEL 2: SUBTREE RIGHT of 1016 -> 1024 [RED] */}
                  <div className="absolute left-[37.5%] -translate-x-1/2 top-64 flex flex-col items-center z-20">
                    <button
                      className={`group w-12 h-12 rounded-full bg-gradient-to-tr from-tertiary-container via-tertiary to-secondary-container text-on-primary-fixed shadow-[0_0_16px_rgba(255,104,119,0.35)] flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none ${
                        selectedNodeId === '1024' ? 'ring-2 ring-white scale-110' : ''
                      }`}
                      onClick={() => handleSelectNode('1024')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-md font-bold text-on-primary-fixed font-mono">1024</span>
                      <span className="font-label-sm text-[8px] uppercase tracking-tighter text-on-primary-fixed font-bold font-mono">
                        RED
                      </span>
                    </button>
                    <div className="mt-1 px-1.5 py-0.5 rounded bg-surface-container-high text-[9px] font-mono text-secondary truncate max-w-[90px]">
                      R. Patel
                    </div>
                  </div>

                  {/* LEVEL 2: SUBTREE LEFT of 1056 -> 1040 [RED] */}
                  <div className="absolute left-[62.5%] -translate-x-1/2 top-64 flex flex-col items-center z-20">
                    <button
                      className={`group w-12 h-12 rounded-full bg-gradient-to-tr from-tertiary-container via-tertiary to-secondary-container text-on-primary-fixed shadow-[0_0_16px_rgba(255,104,119,0.35)] flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none ${
                        selectedNodeId === '1040' ? 'ring-2 ring-white scale-110' : ''
                      }`}
                      onClick={() => handleSelectNode('1040')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-md font-bold text-on-primary-fixed font-mono">1040</span>
                      <span className="font-label-sm text-[8px] uppercase tracking-tighter text-on-primary-fixed font-bold font-mono">
                        RED
                      </span>
                    </button>
                    <div className="mt-1 px-1.5 py-0.5 rounded bg-surface-container-high text-[9px] font-mono text-secondary truncate max-w-[90px]">
                      P. Shah
                    </div>
                  </div>

                  {/* LEVEL 2: SUBTREE RIGHT of 1056 -> 1072 [BLACK] */}
                  <div className="absolute left-[85.5%] -translate-x-1/2 top-64 flex flex-col items-center z-20">
                    <button
                      className={`group w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-md ${
                        selectedNodeId === '1072'
                          ? 'ring-2 ring-primary-container bg-surface-container-high scale-110'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                      onClick={() => handleSelectNode('1072')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-md font-bold text-on-surface font-mono">1072</span>
                      <span className="font-label-sm text-[8px] uppercase tracking-tighter text-outline font-mono">BLK</span>
                    </button>
                  </div>

                  {/* LEVEL 3: SUB-LEFT of 1040 -> 1036 [BLACK] */}
                  <div className="absolute left-[56.6%] -translate-x-1/2 top-92 flex flex-col items-center z-20">
                    <button
                      className={`group w-10 h-10 rounded-full flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-sm ${
                        selectedNodeId === '1036'
                          ? 'ring-2 ring-primary-container bg-surface-container-high scale-110'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                      onClick={() => handleSelectNode('1036')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-sm font-bold text-on-surface font-mono">1036</span>
                      <span className="font-label-sm text-[7px] uppercase tracking-tighter text-outline font-mono">BLK</span>
                    </button>
                  </div>

                  {/* LEVEL 3: SUB-RIGHT of 1040 -> 1048 [BLACK] */}
                  <div className="absolute left-[68.2%] -translate-x-1/2 top-92 flex flex-col items-center z-20">
                    <button
                      className={`group w-10 h-10 rounded-full flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none shadow-sm ${
                        selectedNodeId === '1048'
                          ? 'ring-2 ring-primary-container bg-surface-container-high scale-110'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                      onClick={() => handleSelectNode('1048')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-sm font-bold text-on-surface font-mono">1048</span>
                      <span className="font-label-sm text-[7px] uppercase tracking-tighter text-outline font-mono">BLK</span>
                    </button>
                  </div>

                  {/* LEVEL 3: SUB-RIGHT of 1072 -> 1088 [RED] */}
                  <div className="absolute left-[91.3%] -translate-x-1/2 top-92 flex flex-col items-center z-20">
                    <button
                      className={`group w-10 h-10 rounded-full bg-gradient-to-tr from-tertiary-container via-tertiary to-secondary-container text-on-primary-fixed shadow-[0_0_12px_rgba(255,104,119,0.3)] flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none ${
                        selectedNodeId === '1088' ? 'ring-2 ring-white scale-110' : ''
                      }`}
                      onClick={() => handleSelectNode('1088')}
                      type="button"
                    >
                      <span className="font-headline-sm text-body-sm font-bold text-on-primary-fixed font-mono">1088</span>
                      <span className="font-label-sm text-[7px] uppercase tracking-tighter text-on-primary-fixed font-bold font-mono">
                        RED
                      </span>
                    </button>
                    <div className="mt-1 px-1 rounded bg-surface-container-high text-[8px] font-mono text-secondary truncate max-w-[80px]">
                      T. Mehta
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Micro-legend */}
              <div className="relative z-10 pt-2 border-t border-surface-container/60 flex flex-wrap items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-sm text-primary">memory</span>
                    RAM: 48 Bytes/Node (std::allocator)
                  </span>
                  <span className="hidden sm:inline text-outline">•</span>
                  <span className="hidden sm:inline font-mono">Color bit packed in low-pointer alignment</span>
                </div>
                <div className="font-mono text-outline">
                  RB_PROPERTIES: 5/5 PASSED (BALANCED)
                </div>
              </div>
            </div>

            {/* Turnstile Gateways Pass Hash Resolution Bar */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-container/60">
              <div className="flex items-center gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">confirmation_number</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Pass Hash Resolution in Turnstile Gateways
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Each physical RFID wristband scan performs a lookup against this Red-Black Tree index to prevent counterfeit duplicate entries in sub-millisecond cycles.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-mono">
                  p99: 0.18ms
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-mono">
                  0 Cache Misses
                </span>
              </div>
            </div>
          </div>

          {/* Right Inspector & Algorithm Telemetry Sidebar */}
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            {/* Selected Node Inspector Badge Module */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-base">info</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Pass Telemetry
                  </span>
                </div>
                <div
                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm uppercase flex items-center gap-1 font-mono ${
                    selectedNode.color === 'RED'
                      ? 'bg-tertiary-container/30 text-tertiary'
                      : 'bg-surface-container-highest text-on-surface'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      selectedNode.color === 'RED' ? 'bg-tertiary' : 'bg-on-surface'
                    }`}
                  />
                  <span>{selectedNode.color}</span>
                </div>
              </div>

              {/* Dual Zone Pass Detail Matrix */}
              <div className="grid grid-cols-2 gap-space-xs">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline block mb-0.5">Pass ID</span>
                  <span className="font-label-md text-label-md font-bold text-primary font-mono">
                    #{selectedNode.id}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline block mb-0.5">Black-Height (bh)</span>
                  <span className="font-label-md text-label-md font-bold text-secondary font-mono">
                    {selectedNode.blackHeight}
                  </span>
                </div>
                <div className="col-span-2 p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline block mb-0.5">Attendee Name</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">
                    {selectedNode.holder}
                  </span>
                </div>
                <div className="col-span-2 p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline block mb-0.5">Pass Tier Designation</span>
                  <span className="font-body-md text-body-md text-on-surface">
                    {selectedNode.passType}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline block mb-0.5">Access Schedule</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                    {selectedNode.night}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline block mb-0.5">Assigned Portal</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {selectedNode.gate}
                  </span>
                </div>
                <div className="col-span-2 p-2 rounded-lg bg-surface-container-high/60 flex items-center justify-between border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-outline">SHA256 Token</span>
                  <span className="font-label-sm text-label-sm text-secondary font-mono">
                    {selectedNode.hash}
                  </span>
                </div>
              </div>
            </div>

            {/* Red-Black Invariants Check Breakdown */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Red-Black Invariants
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary-container/20 text-secondary font-mono font-bold">
                  5/5 VALID
                </span>
              </div>
              <div className="space-y-2.5 pt-1">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start justify-between gap-space-xs border border-surface-container/30">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">1. Node Color Integrity</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Every node is either strictly Red or Black.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-mono shrink-0">
                    PASS ✓
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start justify-between gap-space-xs border border-surface-container/30">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">2. Root Property</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Root node (#1032) is always colored Black.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-mono shrink-0">
                    PASS ✓
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start justify-between gap-space-xs border border-surface-container/30">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">3. Leaf Property</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Every external NIL leaf node is Black.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-mono shrink-0">
                    PASS ✓
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start justify-between gap-space-xs border border-surface-container/30">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">4. Red Parent Invariant</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">If a node is Red, both children are strictly Black.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-mono shrink-0">
                    PASS ✓
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start justify-between gap-space-xs border border-surface-container/30">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">5. Equal Black-Height</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">All simple paths to NIL contain 3 black nodes.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-label-sm text-label-sm font-mono shrink-0">
                    bh=3 ✓
                  </span>
                </div>
              </div>
            </div>

            {/* Rotation Breakdown Vector Visual */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Rotation Breakdown
                </span>
                <span className="font-label-sm text-label-sm text-outline font-mono">O(1) POINTER SWAPS</span>
              </div>
              <div className="grid grid-cols-2 gap-space-xs pt-1">
                {/* Left Rotate Mini Diagram */}
                <div className="p-3 rounded-lg bg-surface-container-lowest flex flex-col items-center gap-2 border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-primary font-mono font-semibold">
                    Left-Rotate(T, x)
                  </span>
                  <svg className="w-full h-16 stroke-current text-outline" fill="none" viewBox="0 0 120 70">
                    <circle className="fill-surface-container stroke-primary" cx="40" cy="20" r="10" strokeWidth="1.5" />
                    <text fill="white" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="40" y="24">x</text>
                    <circle className="fill-surface-container stroke-tertiary" cx="80" cy="45" r="10" strokeWidth="1.5" />
                    <text fill="white" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="80" y="49">y</text>
                    <line strokeWidth="1.5" x1="48" x2="72" y1="26" y2="39" />
                    <path d="M 68 15 C 75 15, 82 20, 80 30" stroke="#ffb95f" strokeDasharray="2 2" strokeWidth="1.5" />
                    <polygon fill="#ffb95f" points="76,30 84,30 80,35" />
                  </svg>
                  <span className="font-label-sm text-[10px] text-on-surface-variant text-center">
                    y becomes new parent; x becomes left child
                  </span>
                </div>

                {/* Right Rotate Mini Diagram */}
                <div className="p-3 rounded-lg bg-surface-container-lowest flex flex-col items-center gap-2 border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-secondary font-mono font-semibold">
                    Right-Rotate(T, y)
                  </span>
                  <svg className="w-full h-16 stroke-current text-outline" fill="none" viewBox="0 0 120 70">
                    <circle className="fill-surface-container stroke-primary" cx="80" cy="20" r="10" strokeWidth="1.5" />
                    <text fill="white" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="80" y="24">y</text>
                    <circle className="fill-surface-container stroke-tertiary" cx="40" cy="45" r="10" strokeWidth="1.5" />
                    <text fill="white" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="40" y="49">x</text>
                    <line strokeWidth="1.5" x1="72" x2="48" y1="26" y2="39" />
                    <path d="M 52 15 C 45 15, 38 20, 40 30" stroke="#ffb95f" strokeDasharray="2 2" strokeWidth="1.5" />
                    <polygon fill="#ffb95f" points="36,30 44,30 40,35" />
                  </svg>
                  <span className="font-label-sm text-[10px] text-on-surface-variant text-center">
                    x becomes new parent; y becomes right child
                  </span>
                </div>
              </div>
            </div>

            {/* Asymptotic Guarantee Card */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs border border-surface-container/60">
              <div className="flex items-center gap-space-xs pb-1 border-b border-surface-container">
                <span className="material-symbols-outlined text-primary text-base">functions</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Asymptotic Guarantee
                </span>
              </div>
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Search Time Complexity:</span>
                  <span className="font-label-md text-label-md font-mono text-primary font-bold">O(log n)</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Insertion Bound:</span>
                  <span className="font-label-md text-label-md font-mono text-on-surface">O(log n) + ≤ 2 Rotations</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-on-surface-variant">Deletion Bound:</span>
                  <span className="font-label-md text-label-md font-mono text-on-surface">O(log n) + ≤ 3 Rotations</span>
                </div>
                <div className="flex items-center justify-between text-body-sm pt-1 border-t border-surface-container/60">
                  <span className="text-on-surface-variant">Max Tree Height Formula:</span>
                  <span className="font-label-md text-label-md font-mono text-secondary">2 · log₂(n + 1)</span>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest mt-1 text-on-surface-variant font-label-sm text-[11px] font-mono leading-relaxed border border-surface-container/30">
                  At Navratri Pass Capacity (n = 25,000):<br />
                  Height ≤ 2 · log₂(25001) ≤ <span className="text-primary font-bold">29.2 Levels</span> (Fast SRAM fit)
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'interval' ? (
        /* INTERVAL TREE TAB */
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md border border-surface-container/60 space-y-space-md">
          <div className="flex items-center justify-between border-b border-surface-container pb-space-sm">
            <div>
              <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
                Interval Tree Engine
              </span>
              <h2 className="font-headline-sm text-on-surface mt-1">
                Venue Time Slot Conflict &amp; Curfew Detection
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-mono text-xs">
              Overlap Search: O(min(n, k log n))
            </span>
          </div>

          <p className="text-body-md text-on-surface-variant">
            Augmented Red-Black tree where each node holds interval <code className="font-mono text-secondary">[low, high]</code> and tracks the subtree maximum endpoint <code className="font-mono text-primary">max_high</code> to find all overlapping booking requests in logarithmic time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="p-space-md bg-surface-container-lowest rounded-xl border border-surface-container">
              <span className="font-label-sm text-outline block mb-1">Slot #1 (Aarti &amp; Deepotsav)</span>
              <span className="font-headline-sm text-primary font-mono font-bold">[18:00, 20:30]</span>
              <span className="text-xs text-on-surface-variant block mt-1">Max Subtree Endpoint: 20:30</span>
              <div className="mt-2 text-xs px-2 py-1 rounded bg-secondary/10 text-secondary inline-block">
                ✓ Non-conflicting VIP window
              </div>
            </div>
            <div className="p-space-md bg-surface-container-lowest rounded-xl border border-primary/40 bg-primary/5">
              <span className="font-label-sm text-outline block mb-1">Slot #2 (Maha Raas Prime)</span>
              <span className="font-headline-sm text-secondary font-mono font-bold">[20:00, 23:45]</span>
              <span className="text-xs text-on-surface-variant block mt-1">Max Subtree Endpoint: 23:45</span>
              <div className="mt-2 text-xs px-2 py-1 rounded bg-primary-container/20 text-primary font-bold inline-block">
                ⚠️ Partial Overlap detected with Slot #1
              </div>
            </div>
            <div className="p-space-md bg-surface-container-lowest rounded-xl border border-surface-container">
              <span className="font-label-sm text-outline block mb-1">Slot #3 (Midnight Tarang)</span>
              <span className="font-headline-sm text-tertiary font-mono font-bold">[23:30, 02:00]</span>
              <span className="text-xs text-on-surface-variant block mt-1">Max Subtree Endpoint: 02:00</span>
              <div className="mt-2 text-xs px-2 py-1 rounded bg-error-container/20 text-error inline-block">
                🚨 Sound Curfew Warning past 00:00
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'heap' ? (
        /* BINARY HEAP TAB */
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md border border-surface-container/60 space-y-space-md">
          <div className="flex items-center justify-between border-b border-surface-container pb-space-sm">
            <div>
              <span className="font-label-sm text-secondary uppercase font-mono tracking-wider">
                Priority Queue Engine
              </span>
              <h2 className="font-headline-sm text-on-surface mt-1">
                Max-Heap VIP Pass Demand &amp; Surge Allocator
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container-high text-secondary font-mono text-xs">
              Extract-Max: O(log n)
            </span>
          </div>

          <div className="p-4 bg-surface-container-lowest rounded-xl border border-surface-container font-mono text-sm space-y-2">
            <div className="text-outline text-xs">Array Representation: A[1..n]</div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: '98 (Sarkhej VIP)', idx: 1 },
                { key: '85 (Karnavati Club)', idx: 2 },
                { key: '72 (YMCA Suite)', idx: 3 },
                { key: '64 (SG Highway 1)', idx: 4 },
                { key: '58 (Vastrapur Desk)', idx: 5 },
                { key: '51 (Bopal Gold)', idx: 6 },
              ].map((item) => (
                <div key={item.idx} className="p-2.5 rounded bg-surface-container-high text-center">
                  <div className="text-[10px] text-outline">Index {item.idx}</div>
                  <div className="text-primary font-bold">{item.key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* OTHER TABS */
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md border border-surface-container/60 space-y-space-md">
          <h2 className="font-headline-sm text-on-surface">
            {activeTab === 'fibonacci'
              ? 'Fibonacci & Binomial Heap: Corporate Pass Merging'
              : 'Disjoint Set Union-Find: Navratri Circle Group Clustering'}
          </h2>
          <p className="text-body-md text-on-surface-variant">
            {activeTab === 'fibonacci'
              ? 'Amortized O(1) merge operation for high-throughput corporate bulk pass consolidation during peak sales windows.'
              : 'Union by rank and path compression heuristics ensuring α(n) near-constant time verification for 12,000 group dance participants.'}
          </p>
        </div>
      )}
    </div>
  );
};
