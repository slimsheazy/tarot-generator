export interface CardPosition {
  position: number;
  meaning: string;
}

export interface TarotSpread {
  spreadName: string;
  description: string;
  positions: CardPosition[];
}