
import { Piece, Position } from "../../models"
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules"

export const GetPossibleBishopMoves = (bishop: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = []

  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(bishop.position.x - i, bishop.position.y - i)

    if (destination.x >= 0 && destination.y >= 0) {

      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }
  }

  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(bishop.position.x + i, bishop.position.y + i)

    if (destination.x <= 7 && destination.y <= 7) {

      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }

  }
  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(bishop.position.x + i, bishop.position.y - i)

    if (destination.x <= 7 && destination.y >= 0) {

      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }

  }

  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(bishop.position.x - i, bishop.position.y + i)

    if (destination.x >= 0 && destination.y <= 7) {

      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }

  }


  return possibleMoves
}