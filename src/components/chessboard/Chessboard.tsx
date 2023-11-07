import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../tile/Tile";
import { Referee } from "../../referee/Referee";
import {
  Piece,
  PieceType,
  TeamType,
  HORIZONTAL_AXIS,
  initialBoardState,
  VERTICAL_AXIS,
  Position,
  GRID_SIZE,
  samePosition,
} from "../../Constants";
import torreBlack from "../../assets/images/rook_b.png";
import torreWhite from "../../assets/images/rook_w.png";
import cavaloBlack from "../../assets/images/knight_b.png";
import cavaloWhite from "../../assets/images/knight_w.png";
import bispoBlack from "../../assets/images/bishop_b.png";
import bispoWhite from "../../assets/images/bishop_w.png";
import rainhaBlack from "../../assets/images/queen_b.png";
import rainhaWhite from "../../assets/images/queen_w.png";

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessBoardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  let board = [];

  // let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );
      setGrabPosition({
        x: grabX,
        y: grabY,
      });

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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

  //video parou no 14:30

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessBoardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece?.type,
          currentPiece?.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        } else if (validMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;
              piece.position.x = x;
              piece.position.y = y;

              let promotionRow = piece.team === TeamType.OUR ? 7 : 0;

              if (y === promotionRow && piece.type === PieceType.PAWN) {
                setPromotionPawn(piece);
                modalRef.current?.classList.remove("hidden");
              }
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (PieceType.PAWN === piece.type) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }

      setActivePiece(null);
    }
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType;
        const teamType = piece.team === TeamType.OUR ? "w" : "b";
        let image = "";
        switch (pieceType) {
          case PieceType.ROOK:
            if (teamType === "w") {
              piece.image = torreWhite;
            } else {
              piece.image = torreBlack;
            }
            break;
          case PieceType.BISHOP:
            if (teamType === "w") {
              piece.image = bispoWhite;
            } else {
              piece.image = bispoBlack;
            }
            break;
          case PieceType.KNIGHT:
            if (teamType === "w") {
              piece.image = cavaloWhite;
            } else {
              piece.image = cavaloBlack;
            }
            break;
          case PieceType.QUEEN:
            if (teamType === "w") {
              piece.image = rainhaWhite;
            } else {
              piece.image = rainhaBlack;
            }
            break;
        }
      }
      results.push(piece);
      return results;
    }, [] as Piece[]);

    setPieces(updatedPieces);

    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR;
  }

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = i + j + 2;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={promotionTeamType() ? torreWhite : torreBlack}
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={promotionTeamType() ? bispoWhite : bispoBlack}
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={promotionTeamType() ? cavaloWhite : cavaloBlack}
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={promotionTeamType() ? rainhaWhite : rainhaBlack}
          />
        </div>
      </div>
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
