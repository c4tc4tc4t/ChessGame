import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import { Pawn } from "../../models/Pawn";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const GetPossiblePawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  const specialRow = pawn.team === TeamType.WHITE ? 1 : 6;
  const pawnDirection = pawn.team === TeamType.WHITE ? 1 : -1;

  const normalMove: Position = new Position(
    pawn.position.x,
    pawn.position.y + pawnDirection
  );
  const specialMove: Position = new Position(
    normalMove.x,
    normalMove.y + pawnDirection
  );
  const upperLeftAttack: Position = new Position(
    pawn.position.x - 1,
    pawn.position.y + pawnDirection
  );
  const upperRightAttack: Position = new Position(
    pawn.position.x + 1,
    pawn.position.y + pawnDirection
  );
  const leftPosition: Position = new Position(
    pawn.position.x - 1,
    pawn.position.y
  );
  const rightPosition: Position = new Position(
    pawn.position.x + 1,
    pawn.position.y
  );


  if (normalMove.y >= 0 && normalMove.y <= 7 && !tileIsOccupied(normalMove, boardState)) {
    possibleMoves.push(normalMove);


    if (
      pawn.position.y === specialRow &&
      specialMove.y >= 0 && specialMove.y <= 7 &&
      !tileIsOccupied(specialMove, boardState)
    ) {
      possibleMoves.push(specialMove);
    }
  }

  if (upperLeftAttack.x >= 0 && upperLeftAttack.y >= 0 && upperLeftAttack.y <= 7) {
    if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
      possibleMoves.push(upperLeftAttack);
    } else if (!tileIsOccupied(upperLeftAttack, boardState) && leftPosition.x >= 0) {
      const leftPiece = boardState.find((p) => p.samePosition(leftPosition));
      if (leftPiece !== null && (leftPiece as Pawn)?.enPassant) {
        possibleMoves.push(upperLeftAttack);
      }
    }
  }

  if (upperRightAttack.x <= 7 && upperRightAttack.y >= 0 && upperRightAttack.y <= 7) {
    if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
      possibleMoves.push(upperRightAttack);
    } else if (!tileIsOccupied(upperRightAttack, boardState) && rightPosition.x <= 7) {
      const rightPiece = boardState.find((p) => p.samePosition(rightPosition));
      if (rightPiece !== null && (rightPiece as Pawn)?.enPassant) {
        possibleMoves.push(upperRightAttack);
      }
    }
  }

  return possibleMoves;
};
