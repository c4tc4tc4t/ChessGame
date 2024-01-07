import { Piece, Position } from "../../models"
import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules"


export const GetPossibleKnightMoves = (knight: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = []

  const knightMoves = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: -1, y: 2 },
    { x: -2, y: 1 },
    { x: 1, y: -2 },
    { x: 2, y: -1 },
    { x: -1, y: -2 },
    { x: -2, y: -1 }
  ]

  for (const move of knightMoves) {
    const newPosition: Position = new Position(
      knight.position.x + move.x,
      knight.position.y + move.y
    )

    if (
      newPosition.x >= 0 &&
      newPosition.x < 8 &&
      newPosition.y >= 0 &&
      newPosition.y < 8 &&
      tileIsEmptyOrOccupiedByOpponent(newPosition, boardState, knight.team)
    ) {
      possibleMoves.push(newPosition)
    }
  }

  return possibleMoves
}
