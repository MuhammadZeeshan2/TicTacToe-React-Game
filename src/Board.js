import React from 'react';
import Square from './Square';
function Board({ xIsNext, squares, onPlay }) {
    function renderSquare(i) {
      const isWinningSquare = calculateWinner(squares) && calculateWinner(squares).includes(i);
      return <Square value={squares[i]} onSquareClick={() => handleClick(i)} highlight={isWinningSquare} />;
    }
  
    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }
  
    let status;
    const winner = calculateWinner(squares);
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (squares.every((square) => square !== null)) {
      status = 'It\'s a draw!';
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
    const boardRows = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(renderSquare(i * 3 + j));
      }
      boardRows.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }
  
    return (
      <>
        <div className="status">{status}</div>
        {boardRows}
      </>
    );
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
export default Board;  