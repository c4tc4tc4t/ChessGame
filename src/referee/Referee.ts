import { PieceType, TeamType } from "../components/chessboard/Chessboard"

export class Referee {
  isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType) {
    console.log("Referee is checking the move")
    console.log(`previous location: ${px} ${py}`)
    console.log(`current location: ${x} ${y}`)
    console.log(`team: ${team}`)
    console.log(`piece: ${type}`)

    if (type === PieceType.PAWN) {
      if (team === TeamType.OUR) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            console.log("valid Move")
            return true
          }
        } else {
          if (px === x && y - py === 1) {
            return true
          }
        }
      }
    }
    return false
  }
}