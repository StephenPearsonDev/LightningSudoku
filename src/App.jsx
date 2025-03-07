import React, { useEffect } from 'react';
import TopControls from './components/TopControls';
import BoardArea from './components/BoardArea';
import NumberPad from './components/NumberPad';
import CheckSolve from './components/CheckSolve';
import Feedback from './components/Feedback';
import Nav from './components/Nav';
import BottomControls from './components/BottomControls';
import useTimer from './hooks/useTimer';
import useSudokuGame from './hooks/useSudokuGame';

export default function App() {

  const {
    difficulty,
    setDifficulty,
    puzzle,
    solution,
    selectedCell,
    setSelectedCell,
    originalPuzzle,
    illegalMoveMessage,
    feedbackMessage,
    generateGame,
    resetBoard,
    handleCellInput,
    handleCheck,
    handleSolve,
    handleErase,
  } = useSudokuGame();


  const { time, isPaused, startTimer, pauseTimer, resetTimer } = useTimer(0, false);

  useEffect(() => {
    const handleKeyDown = e => {
      if (selectedCell.row === null || selectedCell.col === null) return;
      if (e.key >= '1' && e.key <= '9') {
        handleCellInput(Number(e.key));
      }
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        handleErase();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, handleCellInput, handleErase]);

  useEffect(() => {
    return () => pauseTimer();
  }, [pauseTimer]);

  const toggleTimerPause = () => {
    if (isPaused) {
      startTimer();
    } else {
      pauseTimer();
    }
  };

  return (
    <div className="container">
      <Nav />
      <div style={{ marginTop: "3rem" }} />
      <TopControls
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        generateGame={() => {
          generateGame();
          resetTimer();
          startTimer();
        }}
      />
      <BoardArea
        puzzle={puzzle}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        solution={solution}
        originalPuzzle={originalPuzzle}
      />
      <NumberPad handleCellInput={handleCellInput} handleErase={handleErase} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '.5rem' }}>
        <CheckSolve
          handleCheck={handleCheck}
          handleSolve={handleSolve}
          resetBoard={resetBoard}
        />
        <BottomControls
          toggleTimerPause={toggleTimerPause}
          resetTimer={resetTimer}
          time={time}
          isTimerPaused={isPaused}
        />
        <Feedback
          feedbackMessage={feedbackMessage}
          illegalMoveMessage={illegalMoveMessage}
        />
      </div>
    </div>
  );
}
