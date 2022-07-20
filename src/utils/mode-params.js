export function modeParams(age, mode) {
  if (mode === 0) {
    const maxTerms = age - 4 < 2 ? 2 : age - 4;
    const maxResult = maxTerms * (age - 1);
    return {maxTerms, maxResult};
  } else if (mode === 1) {
    const maxTerms = age - 3 < 2 ? 2 : age - 3;
    const maxResult = maxTerms * (age - 1) + 3;
    return {maxTerms, maxResult};
  } else if (mode === 2) {
    const maxTerms = age - 2 < 2 ? 2 : age - 2;
    const maxResult = maxTerms * (age - 1) + 2;
    return {maxTerms, maxResult};
  } else {
    console.error('Такого режима не существует');
  }
}