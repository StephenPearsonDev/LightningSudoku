import React from 'react'
import SudokuCell from './SudokuCell'

export default function SudokuBoard({
  puzzle,
  solution,
  selectedCell,
  setSelectedCell,
  originalPuzzle
}) {
  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col })
  }
  return (
    <div className="sudoku-board">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            value={cell}
            solution={solution[rowIndex][colIndex]}
            selected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
            isEditable={originalPuzzle[rowIndex][colIndex] === 0}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
          />
        ))
      )}
    </div>
  )
}
