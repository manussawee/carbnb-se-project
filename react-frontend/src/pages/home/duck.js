const initialState = {
  amount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_AMOUNT':
      return {
        ...state,
        amount: state.amount + 1,
      };
    default:
      return state;
  }
};

export const actions = {
  increaseAmount: () => ({
    type: 'INCREASE_AMOUNT',
  }),
};
