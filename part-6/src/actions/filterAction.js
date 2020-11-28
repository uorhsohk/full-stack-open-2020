const handleFilter = (content) => {
  return {
    type: 'SET_FILTER',
    payload: {
      content
    }
  };
};

export default handleFilter;