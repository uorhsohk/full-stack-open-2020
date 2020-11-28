import getId from "./generateRandomId";

const createAnecdote = content => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  };
};

const voteHandler = id => {
  return {
    type: 'VOTE_HANDLER',
    data: {
      id
    }
  };
};

export { createAnecdote, voteHandler };