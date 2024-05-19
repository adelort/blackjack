import type { Outcome } from "./playGame";

export const printGame = (outcome: Outcome): void => {
  console.info("--------------------");
  console.info(`Dealer: ${outcome.dealerCards.join(" ")}`);
  outcome.playerDecks.forEach((deck) =>
    console.info(`Player: ${deck.cards.join(" ")} (Bet=${deck.bet})`),
  );
  console.info(`Earnings: ${outcome.earnings}`);
};
