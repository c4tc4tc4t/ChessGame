import { Board } from "../models/Board";
import { Pawn } from "../models/Pawn";
import { Position } from "../models/Position";
import { PieceType, TeamType } from "../Types";

export function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    board: Board
  ) {
    //atribui a direção do peão
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;

    //checa se é um peão
    if (type === PieceType.PAWN) {
      //checa se o movimento é enPassant
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        //procura se a peça com o movimento enPassant existe no tabuleiro
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );
        if (piece) return true;
      }
    }

    return false;
  }