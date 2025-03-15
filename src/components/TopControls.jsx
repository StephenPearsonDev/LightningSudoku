
export default function TopControls({
  difficulty,
  setDifficulty,
  generateGame,
  style
  
}) {
  const difficulties = ['Easy', 'Medium', 'Hard']
  return (
    <div className="top-controls" style={style}>
      <div className="top-row">
        {difficulties.map(level => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={difficulty === level ? 'difficulty-selected btn' : 'btn'}
          >
            {level}
          </button>
        ))}
        <button onClick={generateGame} className="btn btn-green">
          Generate
        </button>
      </div>

    </div>
  )
}
