export function generateSudoku(difficulty) {
    const removalCount = { Easy: 30, Medium: 40, Hard: 50 }[difficulty] || 30
    let board = Array.from({ length: 9 }, () => Array(9).fill(0))
    if (!fillBoard(board)) throw new Error('Failed to generate board')
    const solution = board.map(row => row.slice())
    removeNumbers(board, removalCount)
    return { puzzle: board, solution }
  }
  
  function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = shuffle([1,2,3,4,5,6,7,8,9])
          for (let n of nums) {
            if (isSafe(board, row, col, n)) {
              board[row][col] = n
              if (fillBoard(board)) return true
              board[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }
  
  function isSafe(board, row, col, val) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === val || board[i][col] === val) return false
    }
    const boxRow = Math.floor(row/3)*3
    const boxCol = Math.floor(col/3)*3
    for (let r = boxRow; r < boxRow+3; r++) {
      for (let c = boxCol; c < boxCol+3; c++) {
        if (board[r][c] === val) return false
      }
    }
    return true
  }
  
  function removeNumbers(board, count) {
    let removed = 0
    while (removed < count) {
      const row = Math.floor(Math.random()*9)
      const col = Math.floor(Math.random()*9)
      if (board[row][col] !== 0) {
        board[row][col] = 0
        removed++
      }
    }
  }
  
  function shuffle(arr) {
    const newArr = arr.slice()
    for (let i = newArr.length-1; i > 0; i--) {
      const j = Math.floor(Math.random()*(i+1))
      ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
  }
  