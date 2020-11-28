const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.content;
    default:
      return state;
  }
};

export default filterReducer;
