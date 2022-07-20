function addUser(user) {
  return {
    type: 'ADD_USER',
    payload: user,
  };
}

function changeStatistic(statistic) {
  return {
    type: 'CHANGE_STATISTIC',
    payload: statistic,
  };
}

export {addUser, changeStatistic};