import { useEffect, useRef, useState } from "react";
import {
  PieceType,
  TeamType,
  initialBoardState,
  samePosition,
} from "../../Constants";
import Chessboard from "../chessboard/Chessboard";
import {
  GetPossibleBishopMoves,
  GetPossibleKingMoves,
  GetPossibleKnightMoves,
  GetPossiblePawnMoves,
  GetPossibleQueenMoves,
  GetPossibleRookMoves,
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

export default function Referee() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updatePossibleMoves();
  }, []);

  function updatePossibleMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = getValidMoves(p, currentPieces);
        return p;
      });
    });
  }

  function playMove(playedPiece: Piece, destination: Position): boolean {
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

    const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

    if (enPassantMove) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (samePosition(piece.position, playedPiece.position)) {
          piece.enPassant = false;
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          results.push(piece);
        } else if (
          !samePosition(
            piece.position,
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      updatePossibleMoves();
      setPieces(updatedPieces);
    } else if (validMove) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (samePosition(piece.position, playedPiece.position)) {
          piece.enPassant =
            Math.abs(playedPiece.position.y - destination.y) === 2 &&
            piece.type === PieceType.PAWN;
          piece.position.x = destination.x;
          piece.position.y = destination.y;

          let promotionRow = piece.team === TeamType.OUR ? 7 : 0;

          if (destination.y === promotionRow && piece.type === PieceType.PAWN) {
            modalRef.current?.classList.remove("hidden");
            setPromotionPawn(piece);
          }
          results.push(piece);
        } else if (
          !samePosition(
            piece.position,
            new Position(destination.x, destination.y)
          )
        ) {
          if (PieceType.PAWN === piece.type) {
            piece.enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);
      //30:30
      updatePossibleMoves();
      setPieces(updatedPieces);
    } else {
      return false;
    }
    return true;
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
        const piece = pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
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
        validMove = pawnMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, pieces);
        break;

      case PieceType.QUEEN:
        validMove = queenMove(initialPosition, desiredPosition, team, pieces);
        break;
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, pieces);
    }

    return validMove;
  }

  function getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return GetPossiblePawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return GetPossibleKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return GetPossibleBishopMoves(piece, boardState);
      case PieceType.ROOK:
        return GetPossibleRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return GetPossibleQueenMoves(piece, boardState);
      case PieceType.KING:
        return GetPossibleKingMoves(piece, boardState);

      default:
        return [];
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

    updatePossibleMoves();
    setPieces(updatedPieces);

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
      <Chessboard playMove={playMove} pieces={pieces} />
    </>
  );
}
