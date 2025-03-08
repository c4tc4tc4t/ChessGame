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
    //checa se o elemento clicado é uma peça
    if (pieceElement.classList.contains("chess-piece") && chessboard) {
      //calcula grab x e y
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - BOARD_HEIGHT) / GRID_SIZE)
      );
      //atualiza o grabPosition com os novos X e Y
      setGrabPosition(new Position(grabX, grabY));

      //calcula a posição do mouse - offset
      const x = e.clientX - PIECE_CENTER_OFFSET;
      const y = e.clientY - PIECE_CENTER_OFFSET;
      //atualiza a posição da peça ao click do mouse
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

      //atualiza a posição da peça no movimento do mouse, para garantir que a peça não saia para fora do tabuleiro
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
    //checa se a peça foi selecionada
    if (activePiece && chessboard) {
      //calcula x e y que a peça está sendo colocada
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - BOARD_HEIGHT) / GRID_SIZE)
      );

      //acha a peça selecionada nas peças para ser atualizada
      const currentPiece = pieces.find((p) => p.samePosition(grabPosition));

      //checa se a peça foi encontrada
      if (currentPiece) {
        //checa se o movimento jogado é valido
        var sucess = playMoveValidation(
          currentPiece.clone(),
          new Position(x, y)
        );
        //se o movimento é valido, atualiza a posição da peça
        if (!sucess) {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

      //reset
      setActivePiece(null);
    }
  }

  let board = [];

  //atualiza o tabuleiro
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
