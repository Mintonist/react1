import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
  const { error, initialized } = useMockData();
  const handleClick = () => {
    initialized();
  };

  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <button className="btn btn-primary" onClick={handleClick}>
        Init Firebase
      </button>
    </div>
  );
};

export default Main;
