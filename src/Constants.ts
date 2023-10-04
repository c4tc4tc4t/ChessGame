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


export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y
}

export interface Piece {
  image: string;
  position: Position
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
}

export enum TeamType {
  OPPONENT,
  OUR,
}

export interface Position {
  x: number,
  y: number
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
  {
    image: torreBlack,
    position: {

      x: 0,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: torreBlack,
    position: {

      x: 7,
      y: 7,
    },
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: torreWhite,
    position: {

      x: 0,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: torreWhite,
    position: {

      x: 7,
      y: 0,
    },
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: cavaloBlack,
    position: {

      x: 1,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: cavaloBlack,
    position: {

      x: 6,
      y: 7,
    },
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: cavaloWhite,
    position: {

      x: 1,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: cavaloWhite,
    position: {

      x: 6,
      y: 0,
    },
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: bispoBlack,
    position: {

      x: 2,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: bispoBlack,
    position: {

      x: 5,
      y: 7,
    },
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: bispoWhite,
    position: {

      x: 2,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: bispoWhite,
    position: {

      x: 5,
      y: 0,
    },
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: rainhaBlack,
    position: {

      x: 3,
      y: 7,
    },
    type: PieceType.QUEEN,
    team: TeamType.OPPONENT,
  },
  {
    image: rainhaWhite,
    position: {

      x: 3,
      y: 0,
    },
    type: PieceType.QUEEN,
    team: TeamType.OUR,
  },
  {
    image: reiBlack,
    position: {

      x: 4,
      y: 7,
    },
    type: PieceType.KING,
    team: TeamType.OPPONENT,
  },
  {
    image: reiWhite,
    position: {

      x: 4,
      y: 0,
    },
    type: PieceType.KING,
    team: TeamType.OUR,
  },
  {
    image: peaoBlack,
    position: {

      x: 0,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoBlack,
    position: {

      x: 1,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoBlack,
    position: {

      x: 2,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoBlack,
    position: {

      x: 3,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoBlack,
    position: {

      x: 4,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoBlack,
    position: {

      x: 5,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoBlack,
    position: {

      x: 6,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoBlack,
    position: {

      x: 7,
      y: 6,
    },
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: peaoWhite,
    position: {

      x: 0,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: peaoWhite,
    position: {

      x: 1,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: peaoWhite,
    position: {

      x: 2,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: peaoWhite,
    position: {

      x: 3,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: peaoWhite,
    position: {

      x: 4,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: peaoWhite,
    position: {

      x: 5,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: peaoWhite,
    position: {

      x: 6,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: peaoWhite,
    position: {

      x: 7,
      y: 1,
    },
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },

];