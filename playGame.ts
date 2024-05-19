import _ from "lodash";
import { PlayerDecision, playerDecides } from "./playerDecides";
import { computeHandValue } from "./computeHandValue";

export enum Card {
  Ace = "A",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
}

const CARDS = Object.keys(Card) as (keyof typeof Card)[];

// const CARD_VALUE:Record<>

const drawCard = (): Card => {
  return Card[_.sample(CARDS)!];
};

enum DealerDecision {
  Stay = "Stay",
  Hit = "Hit",
}

const isBlackjack = (cards: Card[]): boolean =>
  cards.length === 2 &&
  cards.includes(Card.Ace) &&
  _.intersection(cards, [Card.Ten, Card.Jack, Card.Queen, Card.King]).length >
    0;

const dealerDecides = (dealerCards: Card[]): DealerDecision =>
  computeHandValue(dealerCards) >= 17
    ? DealerDecision.Stay
    : DealerDecision.Hit;

type Deck = {
  bet: number;
  cards: Card[];
};

export type Outcome = {
  bets: number;
  earnings: number;
  dealerCards: Card[];
  playerDecks: Deck[];
};

export const playGame = (): Outcome => {
  const dealerCards = [drawCard(), drawCard()];

  //TODO: if blackjack, bank wins?

  const playerDecks: Deck[] = [{ bet: 1, cards: [drawCard(), drawCard()] }];
  let currentDeckIndex = 0;

  while (currentDeckIndex < playerDecks.length) {
    let deck = playerDecks[currentDeckIndex];

    const playerDecision = playerDecides(deck.cards, dealerCards[0]);

    switch (playerDecision) {
      case PlayerDecision.Split:
        deck.cards = [deck.cards[0], drawCard()];
        const newDeck = { bet: deck.bet, cards: [deck.cards[1], drawCard()] };
        playerDecks.push(newDeck);
        break;
      case PlayerDecision.Stay:
        break;
      case PlayerDecision.Double:
        deck.bet = 2;
        deck.cards.push(drawCard());
        break;
      case PlayerDecision.Hit:
        deck.cards.push(drawCard());
        break;
    }

    playerDecks[currentDeckIndex] = deck;
    if (playerDecision === PlayerDecision.Stay) currentDeckIndex += 1;
  }

  let dealerDecision;

  do {
    dealerDecision = dealerDecides(dealerCards);
    if (dealerDecision === DealerDecision.Hit) dealerCards.push(drawCard());
  } while (dealerDecision === DealerDecision.Hit);

  const dealerHandValue = computeHandValue(dealerCards);

  const playerDeckEarnings = playerDecks.map((deck) => {
    const handValue = computeHandValue(deck.cards);
    if (handValue > 21) return -deck.bet;
    else if (isBlackjack(deck.cards)) {
      if (isBlackjack(dealerCards)) return 0;
      return 1.5 * deck.bet;
    } else {
      if (dealerHandValue > 21) return deck.bet;
      else if (handValue > dealerHandValue) return deck.bet;
      else if (handValue < dealerHandValue) return -deck.bet;
      return 0;
    }
  });

  return {
    bets: _.sumBy(playerDecks, ({ bet }) => bet),
    earnings: _.sum(playerDeckEarnings),
    dealerCards,
    playerDecks,
  };
};
