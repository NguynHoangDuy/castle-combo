import type { Tableau, Position, Card as CardType } from '@castle-combo/shared';
import Card from './Card';

interface PlayerTableauProps {
  tableau: Tableau;
  isCurrentPlayer: boolean;
  onSelectPosition?: (position: Position) => void;
  selectedPosition?: Position;
  playerName: string;
  gold: number;
  keys: number;
  score: number;
}

export default function PlayerTableau({
  tableau,
  isCurrentPlayer,
  onSelectPosition,
  selectedPosition,
  playerName,
  gold,
  keys,
  score,
}: PlayerTableauProps) {
  return (
    <div className={`bg-castle-primary p-4 rounded-lg ${isCurrentPlayer ? 'ring-2 ring-castle-accent' : ''}`}>
      {/* Player info */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-semibold">{playerName}</h3>
          {isCurrentPlayer && <span className="text-xs text-castle-accent">(You)</span>}
        </div>
        <div className="flex gap-3 text-sm">
          <span title="Gold">💰 {gold}</span>
          <span title="Keys">🗝️ {keys}</span>
          <span title="Score" className="text-castle-accent font-bold">⭐ {score}</span>
        </div>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map(row => (
          [0, 1, 2].map(col => {
            const card = tableau[row]?.[col];
            const isSelected = selectedPosition?.row === row && selectedPosition?.col === col;
            const canSelect = isCurrentPlayer && onSelectPosition && !card;

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => canSelect && onSelectPosition?.({ row, col })}
                className={`
                  aspect-[3/4] rounded-lg
                  ${card ? '' : 'border-2 border-dashed border-slate-600'}
                  ${isSelected ? 'ring-2 ring-castle-accent' : ''}
                  ${canSelect ? 'cursor-pointer hover:border-castle-accent' : ''}
                  flex items-center justify-center
                `}
              >
                {card ? (
                  <Card card={card} size="small" />
                ) : (
                  <span className="text-slate-600 text-xs">Empty</span>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
}
