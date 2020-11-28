import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import createNotification from "../actions/notificationAction";
import { voteHandler } from "../actions/anecdoteAction";

const AnecdoteList = () => {
  const store = useSelector(state => state);
  const allAnecdotes = store.anecdotes;

  const anecdotes = allAnecdotes.filter(anecdote => {
    return anecdote.content.toLowerCase().includes(store.filter.toLowerCase());
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id);
    dispatch(voteHandler(id));
    dispatch(createNotification(anecdote.content));
    setTimeout(() => {
      dispatch(createNotification(''));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;