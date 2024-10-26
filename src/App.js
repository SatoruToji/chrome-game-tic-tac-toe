import { useState } from 'react'
import { calculateWinner } from './calculateWinner'
import { Square } from './square'
// import { Board } from './board'

function Board({ onGameOver }) {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)

    const winner = calculateWinner(nextSquares)
    if (winner) {
      onGameOver(winner)
    }
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [games, setGames] = useState([])

  const handleGameOver = (winner) => {
    setGames(prevGames => [...prevGames, winner])
  }

  return (
    <>
      {games.map((winner, index) => (
        <div key={index}>
          <Board onGameOver={handleGameOver} />

        </div>
      ))}
      {games.length === 0 || calculateWinner(Array(9).fill(null)) ? (
        <Board onGameOver={handleGameOver} />
      ) : null}
    </>
  )
}