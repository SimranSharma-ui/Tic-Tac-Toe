import { useState } from "react";

const intialBoard = Array(9).fill(null);

const useLogic = () => {
  const [board, setBoard] = useState(intialBoard);
  const [isXnext, setIsXnext] = useState(true);

  const WINING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinners = (currentBoard) => {
    for (let i = 0; i < WINING_PATTERNS.length; i++) {
      const [a, b, c] = WINING_PATTERNS[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const hendleClick = (index) => {
    const winner = calculateWinners(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXnext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXnext(!isXnext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinners(board);
    if (winner) return `Player ${winner} wins`;
    if (!board.includes(null)) return `It's a Draw!`;
    return `Player ${isXnext ? "X" : "O"}'s turn`;
  };

  const resetGame = () => {
    setBoard(intialBoard); 
    setIsXnext(true);
  };

  return { board, hendleClick, getStatusMessage, resetGame };
};

export default useLogic;
