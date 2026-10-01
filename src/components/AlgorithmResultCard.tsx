import React from 'react';

export interface AlgorithmResultCardProps {
  algorithmName: string;
  paradigm?: string;
  executionTimeMs: number | string;
  timeComplexity: string;
  spaceComplexity: string;
  comparisons?: number;
  swapsOrRotations?: number;
  statesExplored?: number;
  nodesPruned?: number;
  isOptimal?: boolean;
  optimalityNote?: string;
  solutionSummary?: string | React.ReactNode;
  tags?: string[];
  isHighlighted?: boolean;
}

export const AlgorithmResultCard: React.FC<AlgorithmResultCardProps> = ({
  algorithmName,
  paradigm,
  executionTimeMs,
  timeComplexity,
  spaceComplexity,
  comparisons,
  swapsOrRotations,
  statesExplored,
  nodesPruned,
  isOptimal,
  optimalityNote,
  solutionSummary,
  tags = [],
  isHighlighted = false,
}) => {
  return (
    <div
      className={`rounded-xl p-5 border transition-all duration-200 shadow-md flex flex-col justify-between ${
        isHighlighted
          ? 'bg-surface-container-high border-primary/60 ring-1 ring-primary/40'
          : 'bg-surface-container border-outline-variant/30 hover:border-outline-variant/60'
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-title-md text-title-md font-bold text-on-surface">
                {algorithmName}
              </h4>
              {isOptimal !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded font-mono font-medium border ${
                    isOptimal
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {isOptimal ? 'PROVABLY OPTIMAL' : 'HEURISTIC / APPROX'}
                </span>
              )}
            </div>
            {paradigm && (
              <span className="text-xs text-on-surface-variant font-mono">
                Paradigm: {paradigm}
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs text-on-surface-variant block uppercase font-mono">
              Exec Time
            </span>
            <span className="text-sm font-bold font-mono text-primary">
              {typeof executionTimeMs === 'number'
                ? `${executionTimeMs.toFixed(3)} ms`
                : executionTimeMs}
            </span>
          </div>
        </div>

        {/* Complexity Grid */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-surface-container-lowest/60 border border-outline-variant/20 mb-3 text-xs font-mono">
          <div>
            <span className="text-on-surface-variant block text-[10px] uppercase">
              Time Complexity
            </span>
            <span className="font-bold text-tertiary">{timeComplexity}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block text-[10px] uppercase">
              Space Complexity
            </span>
            <span className="font-bold text-secondary">{spaceComplexity}</span>
          </div>
        </div>

        {/* Operations & States */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
          {comparisons !== undefined && (
            <div className="p-2 rounded bg-surface-container-low border border-outline-variant/15">
              <span className="text-[10px] text-on-surface-variant block uppercase">
                Comparisons
              </span>
              <span className="font-mono font-semibold text-on-surface">
                {comparisons.toLocaleString()}
              </span>
            </div>
          )}
          {statesExplored !== undefined && (
            <div className="p-2 rounded bg-surface-container-low border border-outline-variant/15">
              <span className="text-[10px] text-on-surface-variant block uppercase">
                States Explored
              </span>
              <span className="font-mono font-semibold text-amber-300">
                {statesExplored.toLocaleString()}
              </span>
            </div>
          )}
          {nodesPruned !== undefined && (
            <div className="p-2 rounded bg-surface-container-low border border-outline-variant/15">
              <span className="text-[10px] text-on-surface-variant block uppercase">
                Nodes Pruned
              </span>
              <span className="font-mono font-semibold text-emerald-400">
                {nodesPruned.toLocaleString()}
              </span>
            </div>
          )}
          {swapsOrRotations !== undefined && (
            <div className="p-2 rounded bg-surface-container-low border border-outline-variant/15">
              <span className="text-[10px] text-on-surface-variant block uppercase">
                Rotations / Swaps
              </span>
              <span className="font-mono font-semibold text-cyan-400">
                {swapsOrRotations.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Solution summary if provided */}
        {solutionSummary && (
          <div className="p-2.5 rounded bg-surface-container-low border border-outline-variant/20 mb-3 text-xs text-on-surface leading-relaxed">
            {solutionSummary}
          </div>
        )}

        {/* Optimality Note */}
        {optimalityNote && (
          <p className="text-[11px] text-on-surface-variant/90 italic mb-2">
            {optimalityNote}
          </p>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/15">
          {tags.map((t, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
