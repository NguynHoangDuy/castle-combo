import type { Card as CardType, ShieldColor, CardAbility, CardScoring } from '@castle-combo/shared';

const SHIELD_COLORS: Record<ShieldColor, string> = {
  blue: 'bg-shield-blue',
  purple: 'bg-shield-purple',
  green: 'bg-shield-green',
  red: 'bg-shield-red',
  orange: 'bg-shield-orange',
  yellow: 'bg-shield-yellow',
};

/**
 * Format ability text for display
 */
function formatAbility(ability: CardAbility): string {
  switch (ability.type) {
    case 'gain_gold':
      return `+${ability.amount} Gold`;
    case 'gain_keys':
      return `+${ability.amount} Key${ability.amount > 1 ? 's' : ''}`;
    case 'gain_both':
      return `+${ability.gold} Gold, +${ability.keys} Key${ability.keys > 1 ? 's' : ''}`;
    case 'discount':
      return `-${ability.amount} cost`;
    case 'discount_type':
      return `-${ability.amount} ${ability.cardType}`;
    case 'discount_shield':
      return `-${ability.amount} ${ability.shield}`;
    case 'refresh_market':
      return 'Refresh market';
    case 'view_deck':
      return `View ${ability.count} cards`;
    case 'steal_gold':
      return `Steal ${ability.amount} gold`;
    case 'none':
    default:
      return 'No ability';
  }
}

/**
 * Format scoring text for display
 */
function formatScoring(scoring: CardScoring): string {
  switch (scoring.type) {
    case 'per_shield':
      return `${scoring.points}pt per ${scoring.shield}`;
    case 'per_type':
      return `${scoring.points}pt per ${scoring.cardType}`;
    case 'per_category':
      return `${scoring.points}pt per ${scoring.category}`;
    case 'adjacent_type':
      return `${scoring.points}pt per adj ${scoring.cardType}`;
    case 'adjacent_shield':
      return `${scoring.points}pt per adj ${scoring.shield}`;
    case 'adjacent_category':
      return `${scoring.points}pt per adj ${scoring.category}`;
    case 'per_row':
      return `${scoring.points}pt per card in row`;
    case 'per_column':
      return `${scoring.points}pt per card in col`;
    case 'diagonal':
      return `${scoring.points}pt per diagonal`;
    case 'corners':
      return `${scoring.points}pt if in corner`;
    case 'center':
      return `${scoring.points}pt if in center`;
    case 'edges':
      return `${scoring.points}pt if on edge`;
    case 'set_collection':
      return `${scoring.points}pt for set`;
    case 'threshold':
      return `${scoring.points}pt if ${scoring.minimum}+ ${scoring.shield}`;
    case 'unique_shields':
      return `${scoring.points}pt per unique shield`;
    case 'pair_bonus':
      return `${scoring.points}pt per pair`;
    case 'complete_row':
      return `${scoring.points}pt for full row`;
    case 'complete_column':
      return `${scoring.points}pt for full col`;
    case 'flat':
      return `${scoring.points}pt`;
    case 'none':
    default:
      return '0pt';
  }
}

interface CardProps {
  card: CardType;
  size?: 'small' | 'medium' | 'large';
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Card({ card, size = 'medium', selected, onClick, disabled }: CardProps) {
  const sizeClasses = {
    small: 'w-24 h-36 text-xs',
    medium: 'w-36 h-52 text-sm',
    large: 'w-44 h-64 text-base',
  };

  const abilityText = formatAbility(card.ability);
  const scoringText = formatScoring(card.scoring);

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`
        ${sizeClasses[size]}
        bg-castle-primary rounded-lg border-2 overflow-hidden
        ${selected ? 'border-castle-accent shadow-lg shadow-castle-accent/30' : 'border-slate-600'}
        ${onClick && !disabled ? 'cursor-pointer card-hover' : ''}
        ${disabled ? 'opacity-50' : ''}
        flex flex-col
      `}
    >
      {/* Header with name and shields */}
      <div className="flex justify-between items-center px-2 py-1 bg-castle-secondary">
        <span className="font-semibold truncate text-xs">{card.name}</span>
        <div className="flex gap-0.5">
          {card.shields.map((shield, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${SHIELD_COLORS[shield]}`}
              title={shield}
            />
          ))}
        </div>
      </div>

      {/* Card art placeholder */}
      <div className="flex-1 bg-slate-700 flex items-center justify-center min-h-0">
        <span className="text-2xl">
          {card.type === 'castle' ? '🏰' : '🏘️'}
        </span>
      </div>

      {/* Ability section */}
      <div className="px-2 py-1 bg-green-900/50 border-t border-slate-600">
        <div className="text-xs text-green-300 truncate" title={abilityText}>
          ⚡ {abilityText}
        </div>
      </div>

      {/* Scoring section */}
      <div className="px-2 py-1 bg-purple-900/50 border-t border-slate-600">
        <div className="text-xs text-purple-300 truncate" title={scoringText}>
          ⭐ {scoringText}
        </div>
      </div>

      {/* Footer with cost */}
      <div className="px-2 py-1 bg-castle-secondary border-t border-slate-600">
        <div className="flex justify-between items-center">
          <span className="text-castle-accent font-bold text-xs">{card.cost} 💰</span>
          <span className="text-xs text-slate-400 capitalize">{card.type}</span>
        </div>
      </div>
    </div>
  );
}
