const RandomTerm = (min, max) => {
  return Math.floor(
      Math.random() * (max - min + 1) + min,
  );
};

const GetResult = (x, y, action) => {
  switch (action) {
    case '+':
      return x + y;
    case '-':
      return x - y;
    default:
      break;
  }
};

const CheckData = (terms, actions, MIN_RESULT, MAX_RESULT) => {
  let result = terms[0];
  for (let i = 1; i < terms.length; i++) {
    result = GetResult(result, terms[i], actions[i - 1]);
    if (result < MIN_RESULT || result > MAX_RESULT) {
      return false;
    }
  }
  return result >= MIN_RESULT && result <= MAX_RESULT;
};

const getAnswer = (terms, actions) => {
  if (terms.length === 1) {
    return terms[0];
  }
  let result = terms[0];
  for (let i = 1; i < terms.length; i++) {
    result = GetResult(result, terms[i], actions[i - 1]);
  }
  return result;
};

export const GetString = (terms, actions) => {
  let str = `${terms[0]}${actions[0]}${terms[1]}`;
  for (let i = 1; i < actions.length; i++) {
    str += `${actions[i]}${terms[i + 1]}`;
  }
  return str + '=';
};

export function Generate(
    MAX_RESULT, MIN_RESULT, MAX_TERMS, ACTIONS, TOTAL_EXAMPLES) {

  let i = 1;
  const examples = [];

  //генерируем примеры
  while (i <= TOTAL_EXAMPLES) {
    const currentTerms = [];
    const currentActions = [];

    // генерируем один пример
    while (currentTerms.length < MAX_TERMS) {
      // формируем слагаемое и действие
      let done = false;
      while (!done) {
        // если слагаемых еще нет, то выбираем первое число из доступного диапазона
        // и переходим к следующему слагаемому
        if (currentTerms.length === 0) {
          currentTerms.push(RandomTerm(MIN_RESULT, MAX_RESULT));
          break;
        }

        // получаем текущий результат примера
        const currResult = getAnswer(currentTerms, currentActions);

        // если текущий результат равен минимальному значению
        // то принудительно ставим -
        // если текущий результат равен максимальному
        // то принудительно ставим +
        // иначе любое действие
        let action;
        if (currResult === MIN_RESULT) {
          action = '+';
        } else if (currResult === MAX_RESULT) {
          action = '-';
        } else {
          action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        }

        // если у нас действие +
        // выбираем число из диапазона от минимума до разницы максимума и текущего результата
        // если действие -
        // выбираем число из диапазона от минимума до текущего результата
        let term;
        if (action === '+') {
          term = RandomTerm(MIN_RESULT, MAX_RESULT - currResult);
        } else if (action === '-') {
          term = RandomTerm(MIN_RESULT, currResult);
        }

        // проверяем, что новые слагаемое и действие подходят
        const check = CheckData([...currentTerms, term],
            [...currentActions, action], MIN_RESULT, MAX_RESULT);

        // если ок, то добавляем в массивы и переходим к следующему слагаемому
        if (check) {
          currentTerms.push(term);
          currentActions.push(action);
          done = true;
        }
      }
    }

    const newExample = {
      id: i,
      actions: currentActions,
      terms: currentTerms,
      correctValue: getAnswer(currentTerms, currentActions),
      str: GetString(currentTerms, currentActions),
    };
    console.log(`example #${newExample.id} has been generated`);
    examples.push(newExample);
    i++;
  }
  return examples;
}