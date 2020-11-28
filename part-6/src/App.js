import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from "./components/Notification";
import FilterAnecdotes from "./components/FilterAnecdotes";

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdotes />
      <AnecdoteForm />
      <AnecdoteList />
    </>
  );
};

export default App;