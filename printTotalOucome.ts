import type { TotalOutcome } from ".";

export const printTotalOutcome = ({
  gameCount,
  totalBets,
  totalEarnings,
}: TotalOutcome): void => {
  const earningRate = totalEarnings / totalBets;
  console.info("-------------------");
  console.info(`Number of games: ${gameCount}`);
  console.info(`Bets: $${totalBets}`);
  console.info(`Earnings: $${totalEarnings}`);
  console.info(`Rate: ${(earningRate * 100).toLocaleString()}%`);
};
