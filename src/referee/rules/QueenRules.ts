
import { Piece, Position } from "../../models"
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules"

export const GetPossibleQueenMoves = (queen: Piece, boardState: Piece[]): Position[] => {
  const possibleMoves: Position[] = []

  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x + i, queen.position.y + i)

    if (destination.x <= 7 && destination.y <= 7) {
      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }

  }
  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x + i, queen.position.y - i)

    if (destination.x <= 7 && destination.y >= 0) {
      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }

  }
  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x - i, queen.position.y - i)

    if (destination.x >= 0 && destination.y >= 0) {
      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }

  }
  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x - i, queen.position.y + i)

    if (destination.x >= 0 && destination.y <= 7) {
      if (!tileIsOccupied(destination, boardState)) {
        possibleMoves.push(destination)
      } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
        possibleMoves.push(destination)
        break
      } else {
        break
      }
    }

  }

  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x, queen.position.y + i)

    if (queen.position.y + i > 7) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }
  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x, queen.position.y - i)

    if (queen.position.y - i < 0) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }
  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x + i, queen.position.y)

    if (queen.position.x + i > 7) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }
  for (let i = 1; i < 8; i++) {

    const destination: Position = new Position(queen.position.x - i, queen.position.y)

    if (queen.position.x - i < 0) break;
    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }


  return possibleMoves
}