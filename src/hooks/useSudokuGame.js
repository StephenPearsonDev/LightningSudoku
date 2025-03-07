import { useState } from 'react';
import { generateSudoku } from '../utils/sudoku';
import useAutoClearMessage from './useAutoClearMessage';
import { cloneBoard } from '../utils/boardUtils';

export default function useSudokuGame() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [isSolved, setIsSolved] = useState(false);
  const [originalPuzzle, setOriginalPuzzle] = useState([]);

  const [illegalMoveMessage, setIllegalMoveMessage] = useAutoClearMessage(3000);
  const [feedbackMessage, setFeedbackMessage] = useAutoClearMessage(3000);

  const generateGame = () => {
    const { puzzle: newPuzzle, solution: newSolution } = generateSudoku(difficulty);
    setPuzzle(newPuzzle);
    setSolution(newSolution);
    setOriginalPuzzle(cloneBoard(newPuzzle));
    setSelectedCell({ row: null, col: null });
    setIsSolved(false);
    setIllegalMoveMessage('');
    setFeedbackMessage('');
  };

  const resetBoard = () => {
    if (originalPuzzle.length > 0) {
      setPuzzle(cloneBoard(originalPuzzle));
      setSelectedCell({ row: null, col: null });
      setIllegalMoveMessage('');
      setFeedbackMessage('Board reset.');
    }
  };

  const isLegalMove = (row, col, value) => {
    if (value === 0) return true;

    for (let c = 0; c < 9; c++) {
      if (c !== col && puzzle[row][c] === value) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (r !== row && puzzle[r][col] === value) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if ((r !== row || c !== col) && puzzle[r][c] === value) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellInput = value => {
    if (selectedCell.row === null || selectedCell.col === null) return;
    if (originalPuzzle[selectedCell.row][selectedCell.col] !== 0) return;
    if (!isLegalMove(selectedCell.row, selectedCell.col, value)) {
      setIllegalMoveMessage(`Illegal move: ${value} already exists in row, column, or box.`);
      return;
    }
    setIllegalMoveMessage('');
    const newPuzzle = puzzle.map((row, r) =>
      row.map((cell, c) => (r === selectedCell.row && c === selectedCell.col ? value : cell))
    );
    setPuzzle(newPuzzle);
  };

  const handleCheck = () => {
    let correct = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j] !== solution[i][j]) {
          correct = false;
          break;
        }
      }
      if (!correct) break;
    }
    if (correct) {
      setIsSolved(true);
      setFeedbackMessage('Puzzle solved!');
    } else {
      setFeedbackMessage('There are mistakes!');
    }
  };

  const handleSolve = () => {
    setPuzzle(solution);
    setIsSolved(true);
    setFeedbackMessage('Puzzle solved!');
  };

  const handleErase = () => {
    handleCellInput(0);
  };

  return {
    difficulty,
    setDifficulty,
    puzzle,
    solution,
    selectedCell,
    setSelectedCell,
    isSolved,
    originalPuzzle,
    illegalMoveMessage,
    feedbackMessage,
    generateGame,
    resetBoard,
    isLegalMove,
    handleCellInput,
    handleCheck,
    handleSolve,
    handleErase,
  };
}
