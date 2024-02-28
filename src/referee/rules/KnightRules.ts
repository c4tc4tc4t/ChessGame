import { Piece, Position } from "../../models"
import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules"


export const GetPossibleKnightMoves = (knight: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = []

  //array to calculates each move of the knight, the add of 1/2 or 2/1 on the knight position it aways gives a L it's is the knight move
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

  //calculates the knight possible moves, the knight it's a piece that cannot be blocked by enemies, so away have possible moves unless blocked by allies or the move is outside the board
  for (const move of knightMoves) {
    const newPosition: Position = new Position(
      knight.position.x + move.x,
      knight.position.y + move.y
    )

    //if the move is not outside the board and the tile is empty or ocuppied by enemy pushes the move
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
