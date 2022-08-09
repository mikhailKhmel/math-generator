export function getScore(proc) {
  if (proc >= 0.9) {
    return 5;
  } else if (proc >= 0.8 && proc < 0.9) {
    return 4;
  } else if (proc >= 0.7 && proc < 0.8) {
    return 3;
  } else {
    return 2;
  }
}