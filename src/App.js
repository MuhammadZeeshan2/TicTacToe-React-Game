import React, { useState } from 'react';
import Board from './Board';

 function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); // State for toggle button
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    let location = "";
    if (move > 0) {
      for (let i = 0; i < squares.length; i++) {
        if (history[move - 1][i] !== history[move][i]) {
          const row = Math.floor(i / 3) + 1;
          const col = (i % 3) + 1;
          location = `(${row}, ${col})`; // Swap row and column positions
          break;
        }
      }
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description} {location}
        </button>
      </li>
    );
  });
  const handleToggle = () => {
    setIsAscending(!isAscending);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>
          <button onClick={handleToggle}>
            Sort moves {isAscending ? 'descending' : 'ascending'}
          </button>
        </div>
        <ol>{isAscending ? moves : moves.slice().reverse()}</ol>
      </div>
    </div>
  );
}

export default App;






