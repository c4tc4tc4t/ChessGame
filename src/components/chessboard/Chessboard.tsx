import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../tile/Tile";
import {
  HORIZONTAL_AXIS,
  VERTICAL_AXIS,
  GRID_SIZE,
  BOARD_HEIGHT,
  PIECE_CENTER_OFFSET,
  EDGE_OFFSET,
  MAX_X_OFFSET,
  MAX_Y_OFFSET,
  CURSOR_OFFSET,
} from "../../Constants";
import { Piece, Position } from "../../models";

interface Props {
  playMoveValidation: (piece: Piece, position: Position) => boolean;
  pieces: Piece[];
}

export default function Chessboard({ playMoveValidation, pieces }: Props) {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

  const [grabPosition, setGrabPosition] = useState<Position>(
    new Position(-1, -1)
  );
  const chessBoardRef = useRef<HTMLDivElement>(null);

  //Function grabPiece

  function grabPiece(e: React.MouseEvent) {
    const pieceElement = e.target as HTMLElement;
    const chessboard = chessBoardRef.current;
    //check if the element clicked is a piece
    if (pieceElement.classList.contains("chess-piece") && chessboard) {
      //calculates the grab x and y
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - BOARD_HEIGHT) / GRID_SIZE)
      );
      //updates the grabPosition with the new X and Y
      setGrabPosition(new Position(grabX, grabY));

      //calculates the mouse position - offset
      const x = e.clientX - PIECE_CENTER_OFFSET;
      const y = e.clientY - PIECE_CENTER_OFFSET;
      //updates de piece position into the mouse click
      pieceElement.style.position = "absolute";
      pieceElement.style.left = `${x}px`;
      pieceElement.style.top = `${y}px`;

      setActivePiece(pieceElement);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessBoardRef.current;
    //checks if a piece was grabbed
    if (activePiece && chessboard) {
      //calculates all edges of the board
      const minX = chessboard.offsetLeft - EDGE_OFFSET;
      const minY = chessboard.offsetTop - EDGE_OFFSET;
      const maxX =
        chessboard.offsetLeft + chessboard.clientWidth - MAX_X_OFFSET;
      const maxY =
        chessboard.offsetTop + chessboard.clientHeight - MAX_Y_OFFSET;
      const x = e.clientX - CURSOR_OFFSET;
      const y = e.clientY - CURSOR_OFFSET;
      activePiece.style.position = "absolute";

      //updates piece position on mouse movement, making sure the piece cannot get out of the board
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
    //check if the piece is grabbed
    if (activePiece && chessboard) {
      //calculates what x and y(position) the piece is being placed
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - BOARD_HEIGHT) / GRID_SIZE)
      );

      //finds the piece grabbed on the pieces to be updated
      const currentPiece = pieces.find((p) => p.samePosition(grabPosition));

      //check if the piece was found
      if (currentPiece) {
        //checks if the move played is a valid move
        var sucess = playMoveValidation(
          currentPiece.clone(),
          new Position(x, y)
        );
        //if the move is a valid move, update the position of the piece
        if (!sucess) {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

      //reset the grab
      setActivePiece(null);
    }
  }

  let board = [];

  //updates the board
  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = i + j + 2;
      const piece = pieces.find((p) => p.samePosition(new Position(i, j)));
      let image = piece ? piece.image : undefined;

      let currentPiece =
        activePiece !== null
          ? pieces.find((p) => p.samePosition(grabPosition))
          : undefined;
      let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) =>
            p.samePosition(new Position(i, j))
          )
        : false;

      board.push(
        <Tile
          id={`${piece?.type}-${piece?.team}-${piece?.position.x}-${piece?.position.y}`}
          key={`${j},${i}`}
          image={image}
          number={number}
          highlight={highlight}
        />
      );
    }
  }

  return (
    <>
      <div
        onMouseUp={(e) => dropPiece(e)}
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        id="chessboard"
        ref={chessBoardRef}
      >
        {board}
      </div>
    </>
  );
}
