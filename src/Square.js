
import React from 'react';

const Square = ({ value, onSquareClick, highlight }) => {
  return (
    <button className={`square ${highlight ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
