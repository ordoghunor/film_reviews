export default function ratingcalc(review) {
  let rating = 0;
  let n = 0;
  let i = 0;
  while (review[i]) {
    if (review[i].elfogadva >= 1) {
      rating += parseInt(review[i].pontszam, 10);
      n += 1;
    }
    i += 1;
  }
  rating /= n;
  rating = rating.toFixed(2);
  const x = { rating, n };
  return x;
}
