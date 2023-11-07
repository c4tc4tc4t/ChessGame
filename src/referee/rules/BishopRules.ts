import { Piece, Position, TeamType, samePosition } from "../../Constants"
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules"

export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {


  for (let i = 1; i < 8; i++) {

    let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : 1
    let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : 1


    let passedPosition: Position = { x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY) }
    if (samePosition(passedPosition, desiredPosition)) {
      if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
        return true
      }
    } else {
      if (tileIsOccupied(passedPosition, boardState)) {
        break
      }
    }

  }

  return false
}