import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../tile/Tile";
import peaoBlack from "../../assets/images/pawn_b.png";
import peaoWhite from "../../assets/images/pawn_w.png";
import torreBlack from "../../assets/images/rook_b.png";
import torreWhite from "../../assets/images/rook_w.png";
import cavaloBlack from "../../assets/images/knight_b.png";
import cavaloWhite from "../../assets/images/knight_w.png";
import bispoBlack from "../../assets/images/bishop_b.png";
import bispoWhite from "../../assets/images/bishop_w.png";
import rainhaBlack from "../../assets/images/queen_b.png";
import rainhaWhite from "../../assets/images/queen_w.png";
import reiBlack from "../../assets/images/king_b.png";
import reiWhite from "../../assets/images/king_w.png";
import { Referee } from "../../referee/Referee";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
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

const initialBoardState: Piece[] = [];

for (let i = 0; i < 8; i++) {
  const teamType = TeamType.OPPONENT;
  initialBoardState.push({
    image: peaoBlack,
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: teamType,
  });
}

for (let i = 0; i < 8; i++) {
  const teamType = TeamType.OUR;
  initialBoardState.push({
    image: peaoWhite,
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: teamType,
  });
}

initialBoardState.push({
  image: torreBlack,
  x: 0,
  y: 7,
  type: PieceType.ROOK,
  team: TeamType.OPPONENT,
});
initialBoardState.push({
  image: torreBlack,
  x: 7,
  y: 7,
  type: PieceType.ROOK,
  team: TeamType.OPPONENT,
});

initialBoardState.push({
  image: torreWhite,
  x: 0,
  y: 0,
  type: PieceType.ROOK,
  team: TeamType.OUR,
});
initialBoardState.push({
  image: torreWhite,
  x: 7,
  y: 0,
  type: PieceType.ROOK,
  team: TeamType.OUR,
});

initialBoardState.push({
  image: cavaloBlack,
  x: 1,
  y: 7,
  type: PieceType.KNIGHT,
  team: TeamType.OPPONENT,
});
initialBoardState.push({
  image: cavaloBlack,
  x: 6,
  y: 7,
  type: PieceType.KNIGHT,
  team: TeamType.OPPONENT,
});

initialBoardState.push({
  image: cavaloWhite,
  x: 1,
  y: 0,
  type: PieceType.KNIGHT,
  team: TeamType.OUR,
});
initialBoardState.push({
  image: cavaloWhite,
  x: 6,
  y: 0,
  type: PieceType.KNIGHT,
  team: TeamType.OUR,
});

initialBoardState.push({
  image: bispoBlack,
  x: 2,
  y: 7,
  type: PieceType.BISHOP,
  team: TeamType.OPPONENT,
});
initialBoardState.push({
  image: bispoBlack,
  x: 5,
  y: 7,
  type: PieceType.BISHOP,
  team: TeamType.OPPONENT,
});

initialBoardState.push({
  image: bispoWhite,
  x: 2,
  y: 0,
  type: PieceType.BISHOP,
  team: TeamType.OUR,
});
initialBoardState.push({
  image: bispoWhite,
  x: 5,
  y: 0,
  type: PieceType.BISHOP,
  team: TeamType.OUR,
});

initialBoardState.push({
  image: rainhaBlack,
  x: 3,
  y: 7,
  type: PieceType.QUEEN,
  team: TeamType.OPPONENT,
});

initialBoardState.push({
  image: rainhaWhite,
  x: 3,
  y: 0,
  type: PieceType.QUEEN,
  team: TeamType.OUR,
});

initialBoardState.push({
  image: reiBlack,
  x: 4,
  y: 7,
  type: PieceType.KING,
  team: TeamType.OPPONENT,
});

initialBoardState.push({
  image: reiWhite,
  x: 4,
  y: 0,
  type: PieceType.KING,
  team: TeamType.OUR,
});

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessBoardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  let board = [];

  // let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 79;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );
      console.log(x, y);
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const validMove = referee.isValidMove(
              gridX,
              gridY,
              x,
              y,
              p.type,
              p.team
            );
            if (validMove) {
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty("top");
              activePiece.style.removeProperty("left");
            }
          }

          return p;
        });

        return pieces;
      });

      setActivePiece(null);
    }
  }

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = i + j + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }

  return (
    <div
      onMouseUp={(e) => dropPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      id="chessboard"
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
}
