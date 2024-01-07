import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import { GetPossibleQueenMoves } from "../../../referee/rules";

describe("queen possible moves test", () => {
  describe("Tests of the queen on a empty board", () => {
    let emptyBoard: Piece[];
    beforeEach(() => {
      emptyBoard = [];
    });
    it("should return possible moves for a queen on the center of the board", () => {
      const queenWhiteCenter = new Piece(
        new Position(3, 3),
        PieceType.QUEEN,
        TeamType.WHITE,
        false
      );
      const queenBlackCenter = new Piece(
        new Position(3, 3),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCenter: Position[] = GetPossibleQueenMoves(
        queenWhiteCenter,
        emptyBoard
      );
      const possibleMovesBlackCenter: Position[] = GetPossibleQueenMoves(
        queenBlackCenter,
        emptyBoard
      );

      //Possiveis movimentos da rainha na posição 3,3
      const expectedPositionsCenter: Position[] = [
        new Position(4, 4),
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7),

        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),

        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),

        new Position(2, 4),
        new Position(1, 5),
        new Position(0, 6),

        new Position(3, 4),
        new Position(3, 5),
        new Position(3, 6),
        new Position(3, 7),

        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(4, 3),
        new Position(5, 3),
        new Position(6, 3),
        new Position(7, 3),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),


      ];

      //Testa o os possiveis movimentos da rainha branca no centro do tabuleiro
      expect(possibleMovesWhiteCenter).toEqual(expectedPositionsCenter);
      //Testa o os possiveis movimentos da rainha preto centro do tabuleiro
      expect(possibleMovesBlackCenter).toEqual(expectedPositionsCenter);
    });

    it("should return possible moves for a queen on the corner of the board", () => {
      const queenWhiteCorner = new Piece(
        new Position(0, 0),
        PieceType.QUEEN,
        TeamType.WHITE,
        false
      );
      const queenBlackCorner = new Piece(
        new Position(0, 0),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCorner: Position[] = GetPossibleQueenMoves(
        queenWhiteCorner,
        emptyBoard
      );
      const possibleMovesBlackCorner: Position[] = GetPossibleQueenMoves(
        queenBlackCorner,
        emptyBoard
      );

      //Possiveis movimentos da rainha na posição 0,0
      const expectedPositionsCorner: Position[] = [
        new Position(1, 1),
        new Position(2, 2),
        new Position(3, 3),
        new Position(4, 4),
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7),

        new Position(0, 1),
        new Position(0, 2),
        new Position(0, 3),
        new Position(0, 4),
        new Position(0, 5),
        new Position(0, 6),
        new Position(0, 7),

        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
        new Position(4, 0),
        new Position(5, 0),
        new Position(6, 0),
        new Position(7, 0),
      ];

      //Testa o os possiveis movimentos da rainha branco no canto do tabuleiro
      expect(possibleMovesWhiteCorner).toEqual(expectedPositionsCorner);
      //Testa o os possiveis movimentos da rainha preta canto do tabuleiro
      expect(possibleMovesBlackCorner).toEqual(expectedPositionsCorner);
    });

    it("should return possible moves for a queen on the edge of the board", () => {
      const queenWhiteEdge = new Piece(
        new Position(0, 3),
        PieceType.QUEEN,
        TeamType.WHITE,
        false
      );
      const queenBlackEdge = new Piece(
        new Position(0, 3),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteEdge: Position[] = GetPossibleQueenMoves(
        queenWhiteEdge,
        emptyBoard
      );
      const possibleMovesBlackEdge: Position[] = GetPossibleQueenMoves(
        queenBlackEdge,
        emptyBoard
      );

      //Possiveis movimentos da rainha na posição 0,3
      const expectedPositionsEdge: Position[] = [
        new Position(1, 4),
        new Position(2, 5),
        new Position(3, 6),
        new Position(4, 7),

        new Position(1, 2),
        new Position(2, 1),
        new Position(3, 0),

        new Position(0, 4),
        new Position(0, 5),
        new Position(0, 6),
        new Position(0, 7),

        new Position(0, 2),
        new Position(0, 1),
        new Position(0, 0),

        new Position(1, 3),
        new Position(2, 3),
        new Position(3, 3),
        new Position(4, 3),
        new Position(5, 3),
        new Position(6, 3),
        new Position(7, 3),
      ];

      //Testa o os possiveis movimentos da rainha branca na borda do tabuleiro
      expect(possibleMovesWhiteEdge).toEqual(expectedPositionsEdge);
      //Testa o os possiveis movimentos da rainha preta na borda do tabuleiro
      expect(possibleMovesBlackEdge).toEqual(expectedPositionsEdge);
    });
  });

  describe("Possible moves for white/black queen with white pieces blocking", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 3),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const queen = new Piece(
        new Position(3, 4),
        PieceType.QUEEN,
        TeamType.WHITE,
        false
      );
      const rook = new Piece(
        new Position(2, 4),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const pawnTwo = new Piece(
        new Position(4, 4),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      board.push(pawn);
      board.push(queen);
      board.push(rook);
      board.push(pawnTwo);
    });

    it("Should return possible moves for the white queen with allies blocking", () => {
      const queenWhite = new Piece(
        new Position(3, 3),
        PieceType.QUEEN,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleQueenMoves(
        queenWhite,
        board
      );

      //Possiveis movimentos da rainha na posição 3,3
      const expectedPositions: Position[] = [
        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),

        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),

        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
      ];

      //Testa o os possiveis movimentos da rainha branca cercada por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black queen with enemies blocking", () => {
      const queenBlack = new Piece(
        new Position(3, 3),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleQueenMoves(
        queenBlack,
        board
      );

      //Possiveis movimentos da rainha na posição 3,3
      const expectedPositions: Position[] = [
        new Position(4, 4),
        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),

        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),
        new Position(2, 4),

        new Position(3, 4),
        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(4, 3),
        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
      ];

      //Testa o os possiveis movimentos da rainha preta cercada por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });

  describe("Possible moves for white/black queen with black pieces blocking", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 3),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      const queen = new Piece(
        new Position(3, 4),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );
      const rook = new Piece(
        new Position(2, 4),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );
      const pawnTwo = new Piece(
        new Position(4, 4),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      board.push(pawn);
      board.push(queen);
      board.push(rook);
      board.push(pawnTwo);
    });

    it("Should return possible moves for the white queen with enemies blocking", () => {
      const queenWhite = new Piece(
        new Position(3, 3),
        PieceType.QUEEN,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleQueenMoves(
        queenWhite,
        board
      );

      //Possiveis movimentos da rainha na posição 3,3
      const expectedPositions: Position[] = [
        new Position(4, 4),
        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),

        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),
        new Position(2, 4),

        new Position(3, 4),
        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(4, 3),
        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
      ];

      //Testa o os possiveis movimentos da rainha branca cercado por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black queen with alies blocking", () => {
      const queenBlack = new Piece(
        new Position(3, 3),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleQueenMoves(
        queenBlack,
        board
      );

      //Possiveis movimentos da rainha na posição 3,3
      const expectedPositions: Position[] = [
        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),
        new Position(2, 2),

        new Position(1, 1),
        new Position(0, 0),
        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
      ];

      //Testa o os possiveis movimentos da rainha preta cercado por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });
});
