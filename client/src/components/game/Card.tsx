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
  const a = ability as unknown as Record<string, unknown>;

  switch (ability.type) {
    case 'gain_gold':
      return `+${a.amount} Gold`;
    case 'gain_keys':
      return `+${a.amount} Key${(a.amount as number) > 1 ? 's' : ''}`;
    case 'gain_both':
      return `+${a.gold} Gold, +${a.keys} Key${(a.keys as number) > 1 ? 's' : ''}`;
    case 'gain_gold_per_card':
      return `+1 Gold/card`;
    case 'discount':
      return `-${a.amount} cost`;
    case 'discount_type':
      return `-${a.amount} ${a.cardType}`;
    case 'discount_shield':
      return `-${a.amount} ${a.shield}`;
    case 'free_messenger':
      return 'Free messenger';
    case 'view_deck':
      return `View ${a.amount || a.count || 3} cards`;
    case 'none':
    default:
      return 'No ability';
  }
}

/**
 * Format scoring text for display
 */
function formatScoring(scoring: CardScoring): string {
  const s = scoring as unknown as Record<string, unknown>;
  const pts = s.points as number;

  switch (scoring.type) {
    // Shield-based scoring
    case 'per_shield':
      return `${pts}pt/${s.shield}`;
    case 'threshold':
      return `${pts}pt if ${s.minimum}+ ${s.shield}`;
    case 'no_shield':
      return `${pts}pt if no ${s.shield}`;
    case 'all_six_shields':
      return `${pts}pt per all 6 colors`;
    case 'unique_shields':
      return s.perColor ? `${pts}pt/unique shield` : `${pts}pt if ${s.minimum}+ colors`;
    case 'same_shield_set':
      return `${pts}pt for ${s.count} same shields`;

    // Position-based scoring
    case 'per_adjacent':
      return `${pts}pt/adjacent`;
    case 'per_row':
      return `${pts}pt/card in row`;
    case 'per_column':
      return `${pts}pt/card in col`;
    case 'per_diagonal':
      return `${pts}pt/diagonal`;
    case 'per_corner':
      return `${pts}pt/corner card`;
    case 'per_edge':
      return `${pts}pt if on edge`;
    case 'center_position':
      return `${pts}pt if center`;
    case 'specific_row':
      return `${pts}pt/card in row ${s.row}`;
    case 'specific_column':
      return `${pts}pt/card in col ${s.column}`;

    // Type-based scoring
    case 'per_type':
      return `${pts}pt/${s.cardType}`;
    case 'per_category':
      return `${pts}pt/${s.category}`;
    case 'per_type_category':
      return `${pts}pt/${s.cardType} ${s.category}`;
    case 'per_type_with_shield':
      return `${pts}pt/${s.cardType} w/${s.shield}`;
    case 'adjacent_type':
      return `${pts}pt/adj ${s.cardType}`;
    case 'adjacent_category':
      return `${pts}pt/adj ${s.category}`;
    case 'adjacent_shield':
      return `${pts}pt/adj ${s.shield}`;
    case 'adjacent_card_name':
      return `${pts}pt/adj ${s.name}`;
    case 'majority_type':
      return `${pts}pt/majority type`;

    // Set & collection scoring
    case 'set_collection':
      return `${pts}pt per set`;
    case 'no_duplicates':
      return `${pts}pt if unique cards`;
    case 'unique_card_names':
      return `${pts}pt/unique name`;

    // Conditional scoring
    case 'no_adjacent_type':
      return `${pts}pt if no adj ${s.cardType}`;
    case 'no_adjacent_category':
      return `${pts}pt if no adj ${s.category}`;

    // Grid-based scoring
    case 'corners_filled':
      return `${pts}pt/corner filled`;
    case 'all_corners':
      return `${pts}pt if all corners`;
    case 'corners_with_shield':
      return `${pts}pt/corner w/${s.shield}`;
    case 'complete_rows':
      return `${pts}pt/complete row`;
    case 'complete_columns':
      return `${pts}pt/complete col`;

    // Special scoring
    case 'per_remaining_gold':
      return `${pts}pt/${s.divisor} gold`;
    case 'double_shield_cards':
      return `${pts}pt/2-shield card`;
    case 'per_card_in_grid':
      return `${pts}pt/card in grid`;
    case 'negative':
      return `${pts}pt`;

    default:
      return `${pts || 0}pt`;
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

      {/* Card art */}
      <div className="flex-1 bg-slate-700 flex items-center justify-center min-h-0 overflow-hidden">
        <img
          src={`/cards/${card.type === 'castle' ? `card_${String(card.id).padStart(2, '0')}.webp` : `card_${String(card.id + 1).padStart(2, '0')}.webp`}`}
          alt={card.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `<span class="text-2xl">${card.type === 'castle' ? '🏰' : '🏘️'}</span>`;
          }}
        />
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
