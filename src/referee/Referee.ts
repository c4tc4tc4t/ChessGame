import { Piece, PieceType, TeamType } from "../components/chessboard/Chessboard"

export class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y)

    if (piece) {
      return true
    } else {
      return false
    }
  }
  isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[]) {
    console.log("Referee is checking the move")
    console.log(`previous location: ${px} ${py}`)
    console.log(`current location: ${x} ${y}`)
    console.log(`team: ${team}`)
    console.log(`piece: ${type}`)

    if (type === PieceType.PAWN) {
      if (team === TeamType.OUR) {
        if (py === 1) {
          if (px === x && y - py === 1) {
            if (!this.tileIsOccupied(x, y, boardState)) {

              return true
            }
          } else if (px === x && y - py === 2) {
            if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - 1, boardState)) {

              return true
            }
          }
        } else {
          if (px === x && y - py === 1) {
            if (!this.tileIsOccupied(x, y, boardState)) {

              return true
            }
          }
        }
      } else {
        if (py === 6) {
          if (px === x && y - py === -1) {
            console.log("valid Move")
            return true
          } else if (px === x && y - py === -2) {
            if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y + 1, boardState)) {

              return true
            }
          }
        } else {
          if (px === x && y - py === -1) {
            if (!this.tileIsOccupied(x, y, boardState)) {

              return true
            }
          }
        }
      }
    }
    return false
  }
}