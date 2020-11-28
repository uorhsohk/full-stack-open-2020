import getId from "../actions/generateRandomId";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const convertArrayIntoAnObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const _sortArray = unsortedArray => {
  return unsortedArray.sort((a, b) => b.votes - a.votes);
};

const initialState = anecdotesAtStart.map(convertArrayIntoAnObject);

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return _sortArray([...state, action.data]);
    case 'VOTE_HANDLER':
      return _sortArray(state.map(anecdote => {
        return anecdote.id !== action.data.id ? anecdote : { ...anecdote, votes: ++anecdote.votes }
      }));
    default:
      return _sortArray(initialState);
  }
};

export default anecdoteReducer;