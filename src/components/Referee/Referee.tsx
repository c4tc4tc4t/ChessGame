import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import Chessboard from "../chessboard/Chessboard";
import {
  bishopMove,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from "../../referee/rules";
import torreBlack from "../../assets/images/rook_b.png";
import torreWhite from "../../assets/images/rook_w.png";
import cavaloBlack from "../../assets/images/knight_b.png";
import cavaloWhite from "../../assets/images/knight_w.png";
import bispoBlack from "../../assets/images/bishop_b.png";
import bispoWhite from "../../assets/images/bishop_w.png";
import rainhaBlack from "../../assets/images/queen_b.png";
import rainhaWhite from "../../assets/images/queen_w.png";
import { Piece, Position } from "../../models";
import { PieceType, TeamType } from "../../Types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updatePossibleMoves();
  }, []);

  function updatePossibleMoves() {
    board.calculateAllMoves();
  }

  function playMove(playedPiece: Piece, destination: Position): boolean {
    let playedMoveIsValid = false;
    const validMove = isValidMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    const enPassantMove: boolean = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    setBoard((previousBoard) => {
      playedMoveIsValid = board.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination
      );

      return board.clone();
    });

    let promotionRow = playedPiece.team === TeamType.OUR ? 7 : 0;

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove("hidden");
      setPromotionPawn(playedPiece);
    }

    return playedMoveIsValid;
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
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

  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    let validMove = false;

    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;

      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
        break;
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        );
    }

    return validMove;
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return;
    }

    board.pieces = board.pieces.reduce((results, piece) => {
      if (piece.samePiecePosition(promotionPawn)) {
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

    updatePossibleMoves();

    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR;
  }

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={promotionTeamType() ? torreWhite : torreBlack}
            alt=""
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={promotionTeamType() ? bispoWhite : bispoBlack}
            alt=""
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={promotionTeamType() ? cavaloWhite : cavaloBlack}
            alt=""
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={promotionTeamType() ? rainhaWhite : rainhaBlack}
            alt=""
          />
        </div>
      </div>
      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  );
}
