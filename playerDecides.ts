import { computeHandValue } from "./computeHandValue";
import { Card } from "./playGame";

export enum PlayerDecision {
  Stay = "Stay",
  Hit = "Hit",
  Split = "Split",
  Double = "Double",
}

const isDouble =
  (card: Card) =>
  (cards: Card[]): boolean =>
    cards.length === 2 && cards[0] === card && cards[0] === cards[1];

export const playerDecides = (
  playerCards: Card[],
  dealerCard: Card,
): PlayerDecision => {
  const handValue = computeHandValue(playerCards);
  const dealerValue = computeHandValue([dealerCard]);

  if (isDouble(Card.Eight)(playerCards)) return PlayerDecision.Split;
  if (isDouble(Card.Ten)(playerCards)) return PlayerDecision.Stay;
  if (isDouble(Card.Jack)(playerCards)) return PlayerDecision.Stay;
  if (isDouble(Card.Queen)(playerCards)) return PlayerDecision.Stay;
  if (isDouble(Card.King)(playerCards)) return PlayerDecision.Stay;
  if (isDouble(Card.Ace)(playerCards)) return PlayerDecision.Split;

  if (handValue >= 17) return PlayerDecision.Stay;

  if (handValue >= 13 && dealerValue <= 6) return PlayerDecision.Stay;

  if (handValue === 12 && dealerValue >= 4 && dealerValue <= 6)
    return PlayerDecision.Stay;

  if (handValue === 11 && dealerValue <= 10) return PlayerDecision.Double;

  if (handValue === 10 && dealerValue <= 9) return PlayerDecision.Double;

  if (handValue === 9 && dealerValue <= 6 && dealerValue >= 3)
    return PlayerDecision.Double;

  return PlayerDecision.Hit;
};
