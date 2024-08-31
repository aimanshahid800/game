
"use client";

import React, { useState } from "react";

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button
      className="w-[10vh] h-[10vh] text-2xl font-bold border-2 rounded-md shadow-lg shadow-white border-black bg-transparent flex items-center justify-center"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board: React.FC = () => {
  const [gridSize] = useState(3);
  const [squares, setSquares] = useState(Array(gridSize * gridSize).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState(`Next player: X`);

  const handleClick = (index: number) => {
    if (squares[index] || gameStatus.startsWith("Winner")) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = checkWinner(newSquares);
    if (winner) {
      setGameStatus(`Winner: ${winner}`);
      setTimeout(() => resetGame(), 2000); // Reset game after 2 seconds
    } else if (newSquares.every(square => square)) {
      setGameStatus("Match Draw!");
      setTimeout(() => resetGame(), 2000); // Reset game after 2 seconds
    } else {
      setGameStatus(`Next player: ${xIsNext ? "O" : "X"}`);
    }
  };

  const renderSquare = (index: number) => (
    <Square
      key={index}
      value={squares[index]}
      onClick={() => handleClick(index)}
    />
  );

  const resetGame = () => {
    setSquares(Array(gridSize * gridSize).fill(null));
    setXIsNext(true);
    setGameStatus(`Next player: X`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl text-white font-bold mb-5">{gameStatus}</div>
      <div className="flex gap-4 mb-4">
      </div>
      <div className={`grid gap-1 grid-cols-${gridSize}`}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {squares.map((_, i) => renderSquare(i))}
      </div>
      <button
        className="mt-4 mb-5 py-2 px-4 bg-black text-white shadow-lg shadow-white font-bold rounded-full"
        onClick={() => resetGame()}
      >
        Reset
      </button>
    </div >
  );
};

const checkWinner = (board: string[]) => {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default Board;