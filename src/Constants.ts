import peaoBlack from "./assets/images/pawn_b.png";
import peaoWhite from "./assets/images/pawn_w.png";
import torreBlack from "./assets/images/rook_b.png";
import torreWhite from "./assets/images/rook_w.png";
import cavaloBlack from "./assets/images/knight_b.png";
import cavaloWhite from "./assets/images/knight_w.png";
import bispoBlack from "./assets/images/bishop_b.png";
import bispoWhite from "./assets/images/bishop_w.png";
import rainhaBlack from "./assets/images/queen_b.png";
import rainhaWhite from "./assets/images/queen_w.png";
import reiBlack from "./assets/images/king_b.png";
import reiWhite from "./assets/images/king_w.png";
import { Piece, Position } from "./models";


export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y
}


export enum TeamType {
  OPPONENT,
  OUR,
}


export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export const initialBoardState: Piece[] = [
  new Piece(torreBlack, new Position(0, 7), PieceType.ROOK, TeamType.OPPONENT),
  new Piece(torreBlack, new Position(7, 7), PieceType.ROOK, TeamType.OPPONENT),

  new Piece(torreWhite, new Position(0, 0), PieceType.ROOK, TeamType.OUR),
  new Piece(torreWhite, new Position(7, 0), PieceType.ROOK, TeamType.OUR),

  new Piece(cavaloBlack, new Position(1, 7), PieceType.KNIGHT, TeamType.OPPONENT),
  new Piece(cavaloBlack, new Position(6, 7), PieceType.KNIGHT, TeamType.OPPONENT),

  new Piece(cavaloWhite, new Position(1, 0), PieceType.KNIGHT, TeamType.OUR),
  new Piece(cavaloWhite, new Position(6, 0), PieceType.KNIGHT, TeamType.OUR),

  new Piece(bispoBlack, new Position(2, 7), PieceType.BISHOP, TeamType.OPPONENT),
  new Piece(bispoBlack, new Position(5, 7), PieceType.BISHOP, TeamType.OPPONENT),

  new Piece(bispoWhite, new Position(2, 0), PieceType.BISHOP, TeamType.OUR),
  new Piece(bispoWhite, new Position(5, 0), PieceType.BISHOP, TeamType.OUR),

  new Piece(rainhaBlack, new Position(3, 7), PieceType.QUEEN, TeamType.OPPONENT),

  new Piece(rainhaWhite, new Position(3, 0), PieceType.QUEEN, TeamType.OUR),

  new Piece(reiBlack, new Position(4, 7), PieceType.KING, TeamType.OPPONENT),

  new Piece(reiWhite, new Position(4, 0), PieceType.KING, TeamType.OUR),

  new Piece(peaoBlack, new Position(0, 6), PieceType.PAWN, TeamType.OPPONENT),
  new Piece(peaoBlack, new Position(1, 6), PieceType.PAWN, TeamType.OPPONENT),
  new Piece(peaoBlack, new Position(2, 6), PieceType.PAWN, TeamType.OPPONENT),
  new Piece(peaoBlack, new Position(3, 6), PieceType.PAWN, TeamType.OPPONENT),
  new Piece(peaoBlack, new Position(4, 6), PieceType.PAWN, TeamType.OPPONENT),
  new Piece(peaoBlack, new Position(5, 6), PieceType.PAWN, TeamType.OPPONENT),
  new Piece(peaoBlack, new Position(6, 6), PieceType.PAWN, TeamType.OPPONENT),
  new Piece(peaoBlack, new Position(7, 6), PieceType.PAWN, TeamType.OPPONENT),

  new Piece(peaoWhite, new Position(0, 1), PieceType.PAWN, TeamType.OUR),
  new Piece(peaoWhite, new Position(1, 1), PieceType.PAWN, TeamType.OUR),
  new Piece(peaoWhite, new Position(2, 1), PieceType.PAWN, TeamType.OUR),
  new Piece(peaoWhite, new Position(3, 1), PieceType.PAWN, TeamType.OUR),
  new Piece(peaoWhite, new Position(4, 1), PieceType.PAWN, TeamType.OUR),
  new Piece(peaoWhite, new Position(5, 1), PieceType.PAWN, TeamType.OUR),
  new Piece(peaoWhite, new Position(6, 1), PieceType.PAWN, TeamType.OUR),
  new Piece(peaoWhite, new Position(7, 1), PieceType.PAWN, TeamType.OUR),

];