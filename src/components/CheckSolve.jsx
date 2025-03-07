export default function CheckSolve({ handleCheck, handleSolve, resetBoard }) {
  return (
    <div className="check-solve-container">
      <div className="check-solve-buttons">
        <button onClick={handleCheck} className="btn btn-green">
          Check
        </button>
        <button onClick={handleSolve} className="btn btn-red">
          Solve
        </button>
        <button onClick={resetBoard} className="btn btn-yellow">
          Reset Board
        </button>
      </div>
    </div>
  )
}
