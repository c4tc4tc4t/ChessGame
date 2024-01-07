import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import { GetPossibleRookMoves } from "../../../referee/rules/RookRules";

describe("Rook possible moves test", () => {
  describe("Tests of the rook on a empty board", () => {
    let emptyBoard: Piece[];
    beforeEach(() => {
      emptyBoard = [];
    });
    it("should return possible moves for a rook on the center of the board", () => {
      const rookWhiteCenter = new Piece(
        new Position(3, 3),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const rookBlackCenter = new Piece(
        new Position(3, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCenter: Position[] = GetPossibleRookMoves(
        rookWhiteCenter,
        emptyBoard
      );
      const possibleMovesBlackCenter: Position[] = GetPossibleRookMoves(
        rookBlackCenter,
        emptyBoard
      );

      //Possiveis movimentos da torre na posição 3,3
      const expectedPositionsCenter: Position[] = [
        new Position(3, 4),
        new Position(3, 5),
        new Position(3, 6),
        new Position(3, 7),

        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),

        new Position(4, 3),
        new Position(5, 3),
        new Position(6, 3),
        new Position(7, 3),

      ];

      //Testa o os possiveis movimentos da torre branca no centro do tabuleiro
      expect(possibleMovesWhiteCenter).toEqual(expectedPositionsCenter);
      //Testa o os possiveis movimentos da torre preto centro do tabuleiro
      expect(possibleMovesBlackCenter).toEqual(expectedPositionsCenter);
    });

    it("should return possible moves for a rook on the corner of the board", () => {
      const rookWhiteCorner = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const rookBlackCorner = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCorner: Position[] = GetPossibleRookMoves(
        rookWhiteCorner,
        emptyBoard
      );
      const possibleMovesBlackCorner: Position[] = GetPossibleRookMoves(
        rookBlackCorner,
        emptyBoard
      );

      //Possiveis movimentos da torre na posição 0,0
      const expectedPositionsCorner: Position[] = [
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

      //Testa o os possiveis movimentos da torre branco no canto do tabuleiro
      expect(possibleMovesWhiteCorner).toEqual(expectedPositionsCorner);
      //Testa o os possiveis movimentos da torre preta canto do tabuleiro
      expect(possibleMovesBlackCorner).toEqual(expectedPositionsCorner);
    });

    it("should return possible moves for a rook on the edge of the board", () => {
      const rookWhiteEdge = new Piece(
        new Position(0, 3),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const rookBlackEdge = new Piece(
        new Position(0, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteEdge: Position[] = GetPossibleRookMoves(
        rookWhiteEdge,
        emptyBoard
      );
      const possibleMovesBlackEdge: Position[] = GetPossibleRookMoves(
        rookBlackEdge,
        emptyBoard
      );

      //Possiveis movimentos da torre na posição 0,3
      const expectedPositionsEdge: Position[] = [
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

      //Testa o os possiveis movimentos da torre branca na borda do tabuleiro
      expect(possibleMovesWhiteEdge).toEqual(expectedPositionsEdge);
      //Testa o os possiveis movimentos da torre preta na borda do tabuleiro
      expect(possibleMovesBlackEdge).toEqual(expectedPositionsEdge);
    });
  });

  describe("Possible moves for white/black rook with white pieces blocking", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 3),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const rook = new Piece(
        new Position(3, 4),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      board.push(pawn);
      board.push(rook);
    });

    it("Should return possible moves for the white rook with allies blocking", () => {
      const rookWhite = new Piece(
        new Position(3, 3),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleRookMoves(
        rookWhite,
        board
      );

      //Possiveis movimentos da torre na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
      ];

      //Testa o os possiveis movimentos da torre branca cercada por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black rook with enemies blocking", () => {
      const rookBlack = new Piece(
        new Position(3, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleRookMoves(
        rookBlack,
        board
      );

      //Possiveis movimentos da torre na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 4),
        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
        new Position(4, 3),
      ];

      //Testa o os possiveis movimentos da torre preta cercada por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });

  describe("Possible moves for white/black rook with black pieces blocking", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 3),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      const rook = new Piece(
        new Position(3, 4),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );
      board.push(pawn);
      board.push(rook);
    });

    it("Should return possible moves for the white rook with enemies blocking", () => {
      const rookWhite = new Piece(
        new Position(3, 3),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleRookMoves(
        rookWhite,
        board
      );

      //Possiveis movimentos da torre na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 4),
        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
        new Position(4, 3),
      ];

      //Testa o os possiveis movimentos da torre branca cercado por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black rook with alies blocking", () => {
      const rookBlack = new Piece(
        new Position(3, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleRookMoves(
        rookBlack,
        board
      );

      //Possiveis movimentos da torre na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 2),
        new Position(3, 1),
        new Position(3, 0),

        new Position(2, 3),
        new Position(1, 3),
        new Position(0, 3),
      ];

      //Testa o os possiveis movimentos da torre preta cercado por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });
});
