import React, { useState, useEffect } from 'react';

const Grid = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || currentPlayer === 'O') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setCurrentPlayer('O');
    }
  };

  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      // Computer's turn (simple random move)
      const availableCells = board.reduce((acc, cell, index) => {
        if (cell === null) {
          acc.push(index);
        }
        return acc;
      }, []);

      if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const computerMove = availableCells[randomIndex];

        const newBoard = [...board];
        newBoard[computerMove] = 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
          setWinner(result);
        } else {
          setCurrentPlayer('X');
        }
      }
    }
  }, [currentPlayer, winner, board]);

  const renderCell = (index) => (
    <div
      className="bg-blue-500 p-4 text-white border border-gray-300 cursor-pointer"
      onClick={() => handleCellClick(index)}
    >
      {board[index]}
    </div>
  );

  const renderStatus = () => {
    if (winner) {
      return winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`;
    } else {
      return `Current player: ${currentPlayer}`;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          renderCell(index)
        ))}
      </div>
      <div className="mt-4">{renderStatus()}</div>
    </div>
  );
}

export default Grid;
