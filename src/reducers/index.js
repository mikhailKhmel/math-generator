const initialState = {statistic: []};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'CHANGE_STATISTIC' : {
      return {
        ...state,
        statistic: [...state.statistic, action.payload],
      };
    }

    default:
      return state;
  }
};

export default reducer;