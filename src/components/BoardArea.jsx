import React from 'react'
import SudokuBoard from './SudokuBoard'

export default function BoardArea({
  puzzle,
  selectedCell,
  setSelectedCell,
  solution,
  originalPuzzle
}) {
  return (
    <div className="board-container">
      {puzzle.length === 0 ? (
        <div className="placeholder-board">
          Welcome to Lightning Sudoku!
          <br />
          Click "Generate" to start.
        </div>
      ) : (
        <div >
          <SudokuBoard
            puzzle={puzzle}
            solution={solution}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            originalPuzzle={originalPuzzle}
          />
        </div>
      )}
    </div>
  )
}
