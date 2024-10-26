export function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      &nbsp;{value}
    </button>
  )
}