
export default function SudokuCell({
  row,
  col,
  value,
  solution,
  selected,
  isEditable,
  selectedCell,
  onCellClick,
  hasChecked,
}) {
  const isHighlighted =
    selectedCell.row !== null &&
    (selectedCell.row === row ||
      selectedCell.col === col ||
      (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
        Math.floor(selectedCell.col / 3) === Math.floor(col / 3)));


  const isIncorrect = hasChecked && isEditable && value !== 0 && value !== solution;

  let cellClass = 'sudoku-cell';
  if (selected) cellClass += ' selected';
  else if (isHighlighted) cellClass += ' highlighted';
  if (!isEditable) cellClass += ' immutable';
  if (isIncorrect) cellClass += ' incorrect';

  const style = {
    borderLeft: col % 3 === 0 ? '2px solid #000' : '1px solid #888',
    borderTop: row % 3 === 0 ? '2px solid #000' : '1px solid #888',
    borderRight: (col + 1) % 3 === 0 ? '2px solid #000' : '1px solid #888',
    borderBottom: (row + 1) % 3 === 0 ? '2px solid #000' : '1px solid #888',
  };

  return (
    <div
      className={cellClass}
      style={style}
      onClick={() => onCellClick(row, col)}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}
