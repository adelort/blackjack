import _ from "lodash";
import { playGame } from "./playGame";
import { printTotalOutcome } from "./printTotalOucome";

export type TotalOutcome = {
  gameCount: number;
  totalBets: number;
  totalEarnings: number;
};

const playManyGames = (count: number): TotalOutcome => {
  const gameOutcomes = [...new Array(count)].map(playGame);

  return {
    gameCount: count,
    totalBets: _.sumBy(gameOutcomes, ({ bets }) => bets),
    totalEarnings: _.sumBy(gameOutcomes, ({ earnings }) => earnings),
  };
};

const totalOutome = playManyGames(100000);

printTotalOutcome(totalOutome);

