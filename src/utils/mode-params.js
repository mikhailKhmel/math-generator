export function modeParams(age) {
  const maxTerms = age - 2 < 2 ? 2 : age - 2;
  const maxResult = maxTerms * (age - 1) + 2;
  return {maxTerms, maxResult};
}