import type { Card as CardType, Market } from '@castle-combo/shared';
import Card from './Card';

interface CardMarketProps {
  market: Market;
  onSelectCard: (card: CardType) => void;
  selectedCardId?: number;
  canBuy: boolean;
}

export default function CardMarket({ market, onSelectCard, selectedCardId, canBuy }: CardMarketProps) {
  return (
    <div className="bg-castle-primary p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Card Market</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">
            Messenger on {market.messengerRow === 1 ? 'Village' : 'Castle'}
          </span>
          <span className="text-xl">📜</span>
        </div>
      </div>

      {/* Village Row (Row 1) */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏘️</span>
          <span className={`text-sm font-semibold ${market.messengerRow === 1 ? 'text-green-400' : 'text-slate-400'}`}>
            Village {market.messengerRow === 1 && '(Active)'}
          </span>
          {market.messengerRow === 1 && <span>📜</span>}
        </div>
        <div className="flex gap-3 flex-wrap">
          {market.row1.map(card => (
            <Card
              key={card.id}
              card={card}
              size="medium"
              selected={selectedCardId === card.id}
              onClick={() => onSelectCard(card)}
              disabled={!canBuy || market.messengerRow !== 1}
            />
          ))}
        </div>
      </div>

      {/* Castle Row (Row 2) */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏰</span>
          <span className={`text-sm font-semibold ${market.messengerRow === 2 ? 'text-blue-400' : 'text-slate-400'}`}>
            Castle {market.messengerRow === 2 && '(Active)'}
          </span>
          {market.messengerRow === 2 && <span>📜</span>}
        </div>
        <div className="flex gap-3 flex-wrap">
          {market.row2.map(card => (
            <Card
              key={card.id}
              card={card}
              size="medium"
              selected={selectedCardId === card.id}
              onClick={() => onSelectCard(card)}
              disabled={!canBuy || market.messengerRow !== 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
