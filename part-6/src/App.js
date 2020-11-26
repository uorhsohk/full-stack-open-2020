import React from 'react';
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </>
  );
};

export default App;