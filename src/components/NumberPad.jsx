import React from 'react'

export default function NumberPad({ handleCellInput, handleErase }) {
  return (
    <div className="number-pad-container">
      <div className="number-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleCellInput(num)}
            className="number-button"
          >
            {num}
          </button>
        ))}
        <button onClick={handleErase} className="number-button">
          Erase
        </button>
      </div>
    </div>
  )
}
