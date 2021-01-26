export default function compoundInterest(
  capital: number,
  interest: number,
  time: number
) {
  interest = interest / 100;

  let amount = capital * Math.pow(1 + interest, time);

  let amountInterest = amount / time;

  return amountInterest;
}
