
import { Piece, Position } from "../../models";
import {
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "./GeneralRules";

export const GetPossibleRookMoves = (
  rook: Piece,
  boardstate: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  // Top movement
  for (let i = 1; i < 8; i++) {

    if (rook.position.y + i > 7) break;
    const destination = new Position(rook.position.x, rook.position.y + i);

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for (let i = 1; i < 8; i++) {

    if (rook.position.y - i < 0) break;

    const destination = new Position(rook.position.x, rook.position.y - i);

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for (let i = 1; i < 8; i++) {

    if (rook.position.x - i < 0) break;

    const destination = new Position(rook.position.x - i, rook.position.y);

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for (let i = 1; i < 8; i++) {

    if (rook.position.x + i > 7) break;

    const destination = new Position(rook.position.x + i, rook.position.y);

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, rook.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
};
