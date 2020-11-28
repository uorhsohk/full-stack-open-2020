import React from 'react';
import { useDispatch } from "react-redux";
import handleFilter from "../actions/filterAction";

const FilterAnecdotes = () => {
  const dispatch = useDispatch();

  return (
    <>
      <input type="text" onChange={event => dispatch(handleFilter(event.target.value))} name={"searchTerm"} />
    </>
  );
};

export default FilterAnecdotes;