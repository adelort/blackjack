import { Card } from "./playGame";

export const computeHandValue = (cards: Card[]): number => {
  let handValue = 0;
  for (const card of cards) {
    switch (card) {
      case Card.Ace:
        handValue += 1;
        break;
      case Card.Two:
        handValue += 2;
        break;
      case Card.Three:
        handValue += 3;
        break;
      case Card.Four:
        handValue += 4;
        break;
      case Card.Five:
        handValue += 5;
        break;
      case Card.Six:
        handValue += 6;
        break;
      case Card.Seven:
        handValue += 7;
        break;
      case Card.Eight:
        handValue += 8;
        break;
      case Card.Nine:
        handValue += 9;
        break;
      case Card.Ten:
      case Card.Jack:
      case Card.Queen:
      case Card.King:
        handValue += 10;
        break;
    }
  }

  if (cards.includes(Card.Ace) && handValue <= 11) handValue += 10;

  return handValue;
};
