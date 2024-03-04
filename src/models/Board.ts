import { PieceType, TeamType, WinningTeamType } from "../Types";
import {
  GetPossibleBishopMoves,
  GetPossibleKingMoves,
  GetPossibleKnightMoves,
  GetPossiblePawnMoves,
  GetPossibleQueenMoves,
  GetPossibleRookMoves,
  getCastlingMoves,
} from "../referee/rules";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
  pieces: Piece[];
  totalTurns: number;
  winningTeam?: WinningTeamType
  kingIsInCheck?: boolean = false

  constructor(pieces: Piece[], totalTurns: number) {
    this.pieces = pieces;
    this.totalTurns = totalTurns;
  }

  get currentTeam(): TeamType {
    return this.totalTurns % 2 === 0 ? TeamType.BLACK : TeamType.WHITE;
  }

  calculateAllMoves() {
    //get possible moves of pieces
    for (const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces);
    }

    //add castling moves to king
    for (const king of this.pieces.filter((p) => p.isKing)) {
      if (king.possibleMoves === undefined) continue;
      king.possibleMoves = [
        ...king.possibleMoves,
        ...getCastlingMoves(king, this.pieces),
      ];
    }

    //looks for checks and dangerous moves and filters to current team moves
    this.checkCurrentTeamMoves();

    //reset the possiblemoves of the enemy team's turn
    for (const piece of this.pieces.filter(
      (p) => p.team !== this.currentTeam
    )) {
      piece.possibleMoves = [];
    }

    //checkmate logic
    if (this.pieces.filter(p => p.team === this.currentTeam).some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0)) return

    //winner check logic, if the game is over and king is not attacked, it's a draw
    if (!this.kingIsInCheck) {
      this.winningTeam = WinningTeamType.DRAW
    } else {
      this.winningTeam = (this.currentTeam === TeamType.WHITE) ? WinningTeamType.BLACK : WinningTeamType.WHITE
    }

  }

  checkCurrentTeamMoves() {
    //filters pieces by team
    for (const piece of this.pieces.filter(
      (p) => p.team === this.currentTeam
    )) {
      //if piece dont have possible moves, no need for verification
      if (piece.possibleMoves === undefined) continue;

      //loops through each move of each piece
      for (const move of piece.possibleMoves) {
        //clones the board to keep original state
        const simulatedBoard = this.clone();

        simulatedBoard.pieces = simulatedBoard.pieces.filter(
          (p) => !p.samePosition(move)
        );

        //finds the piece on the clonedboard and updates position to move target
        simulatedBoard.pieces.find((p) =>
          p.samePiecePosition(piece)
        )!.position = move.clone()

        //finds the king on the clonedboard
        const clonedKing = simulatedBoard.pieces.find(
          (p) => p.isKing && p.team === simulatedBoard.currentTeam
        )!;


        //loops through pieces of enemy team
        for (const enemy of simulatedBoard.pieces.filter(
          (p) => p.team !== simulatedBoard.currentTeam
        )) {
          //get enemys possible moves to calculate danger and checks
          enemy.possibleMoves = simulatedBoard.getValidMoves(
            enemy,
            simulatedBoard.pieces
          );

          //pawns cannot capture as they move, so remove those moves that can capture the king
          if (enemy.isPawn) {
            if (
              enemy.possibleMoves.some(
                (m) =>
                  m.x !== enemy.position.x &&
                  m.samePosition(clonedKing?.position)
              )
            ) {
              piece.possibleMoves = piece.possibleMoves?.filter(
                (m) => !m.samePosition(move)
              );
            }
          } else {

            //if king is in check by any move, removes all moves from all pieces that cannot block the attack or capture the piece
            if (
              enemy.possibleMoves.some((m) =>
                m.samePosition(clonedKing?.position)
              )
            ) {
              //king is in check update for draw logic
              this.kingIsInCheck = true
              piece.possibleMoves = piece.possibleMoves?.filter(
                (m) => !m.samePosition(move)
              );

            } else {
              this.kingIsInCheck = false
            }
          }
        }
      }
    }
  }

  //gets the possible moves of the piece
  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
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

  playMove(
    enPassantMove: boolean,
    validMove: boolean,
    playedPiece: Piece,
    destination: Position,
    setPieceCaptured: (captured: boolean) => void
  ): boolean {
    const pawnDirection = playedPiece.team === TeamType.WHITE ? 1 : -1;
    const destinationPiece = this.pieces.find((p) =>
      p.samePosition(destination)
    );

    //checks if the played move is a valid castling move
    if (
      playedPiece.isKing &&
      destinationPiece?.isRook &&
      destinationPiece.team === playedPiece.team
    ) {
      //calculates the direction of the castling
      const direction =
        destinationPiece.position.x - playedPiece.position.x > 0 ? 1 : -1;
      const newKingXPosition = playedPiece.position.x + direction * 2;

      //executes the castling between king and rook
      this.pieces = this.pieces.map((p) => {
        if (p.samePiecePosition(playedPiece)) {
          p.position.x = newKingXPosition;
        } else if (p.samePiecePosition(destinationPiece)) {
          p.position.x = newKingXPosition - direction;
        }
        return p;
      });

      //change hasMoved to true property so king and rook cannot execute castling again
      playedPiece.hasMoved = true
      destinationPiece.hasMoved = true

      this.calculateAllMoves();
      return true;
    }

    //checks if the played move is a valid enPassant move
    if (enPassantMove) {
      //reduces to remove the captured piece
      this.pieces = this.pieces.reduce((results, piece) => {
        //finds the played piece
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) (piece as Pawn).enPassant = false;
          //piece moves to destination after captures of the pawn
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;
          results.push(piece);
        } else if (
          !piece.samePosition(
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          //removes the enPassant of a piece after uses the special 2 tiles move
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    } else if (validMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        //finds the played piece
        if (piece.samePiecePosition(playedPiece)) {
          //checks if a piece is captured for draw logic
          if (this.pieces.some(p => p.samePosition(destination) && p.team !== playedPiece.team)) {
            setPieceCaptured(true)
          }

          if (piece.isPawn)
            (piece as Pawn).enPassant =
              Math.abs(playedPiece.position.y - destination.y) === 2 &&
              piece.type === PieceType.PAWN;
          //pushes the piece with position played
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;
          results.push(piece);
          //else if executes the captures logic, because if there's a piece on destination, that piece will not be pushed into results
        } else if (!piece.samePosition(destination)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      this.calculateAllMoves();
    } else {
      return false;
    }

    return true;
  }

  clone(): Board {
    return new Board(
      this.pieces.map((p) => p.clone()),
      this.totalTurns
    );
  }
}
