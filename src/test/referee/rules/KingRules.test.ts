import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import { GetPossibleKingMoves } from "../../../referee/rules";

describe("king possible moves test", () => {
  describe("Tests of the king on a empty board", () => {
    let emptyBoard: Piece[];
    beforeEach(() => {
      emptyBoard = [];
    });
    it("should return possible moves for a king on the center of the board", () => {
      const kingWhiteCenter = new Piece(
        new Position(3, 3),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const kingBlackCenter = new Piece(
        new Position(3, 3),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCenter: Position[] = GetPossibleKingMoves(
        kingWhiteCenter,
        emptyBoard
      );
      const possibleMovesBlackCenter: Position[] = GetPossibleKingMoves(
        kingBlackCenter,
        emptyBoard
      );

      //Possiveis movimentos do rei na posição 3,3
      const expectedPositionsCenter: Position[] = [
        new Position(3, 4),
        new Position(3, 2),
        new Position(2, 3),
        new Position(4, 3),
        new Position(4, 4),
        new Position(4, 2),
        new Position(2, 2),
        new Position(2, 4),
      ];

      //Testa o os possiveis movimentos do rei branco no centro do tabuleiro
      expect(possibleMovesWhiteCenter).toEqual(expectedPositionsCenter);
      //Testa o os possiveis movimentos do rei preto centro do tabuleiro
      expect(possibleMovesBlackCenter).toEqual(expectedPositionsCenter);
    });

    it("should return possible moves for a king on the corner of the board", () => {
      const kingWhiteCorner = new Piece(
        new Position(0, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const kingBlackCorner = new Piece(
        new Position(0, 0),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCorner: Position[] = GetPossibleKingMoves(
        kingWhiteCorner,
        emptyBoard
      );
      const possibleMovesBlackCorner: Position[] = GetPossibleKingMoves(
        kingBlackCorner,
        emptyBoard
      );

      //Possiveis movimentos do rei na posição 0,0
      const expectedPositionsCorner: Position[] = [
        new Position(0, 1),
        new Position(1, 0),
        new Position(1, 1),
      ];

      //Testa o os possiveis movimentos do rei branco no canto do tabuleiro
      expect(possibleMovesWhiteCorner).toEqual(expectedPositionsCorner);
      //Testa o os possiveis movimentos do rei preto canto do tabuleiro
      expect(possibleMovesBlackCorner).toEqual(expectedPositionsCorner);
    });

    it("should return possible moves for a king on the edge of the board", () => {
      const kingWhiteEdge = new Piece(
        new Position(0, 3),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const kingBlackEdge = new Piece(
        new Position(0, 3),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteEdge: Position[] = GetPossibleKingMoves(
        kingWhiteEdge,
        emptyBoard
      );
      const possibleMovesBlackEdge: Position[] = GetPossibleKingMoves(
        kingBlackEdge,
        emptyBoard
      );

      //Possiveis movimentos do rei na posição 0,3
      const expectedPositionsEdge: Position[] = [
        new Position(0, 4),
        new Position(0, 2),
        new Position(1, 3),
        new Position(1, 4),
        new Position(1, 2),
      ];

      //Testa o os possiveis movimentos do rei branco na borda do tabuleiro
      expect(possibleMovesWhiteEdge).toEqual(expectedPositionsEdge);
      //Testa o os possiveis movimentos do rei preto na borda do tabuleiro
      expect(possibleMovesBlackEdge).toEqual(expectedPositionsEdge);
    });
  });

  describe("Possible moves for white/black king with white pieces blocking", () => {
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
      const kingWhite = new Piece(
        new Position(3, 3),
        PieceType.KING,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleKingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 2),
        new Position(2, 3),
        new Position(4, 2),
        new Position(2, 2),

      ];

      //Testa o os possiveis movimentos do rei branco cercado por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black queen with enemies blocking", () => {
      const kingBlack = new Piece(
        new Position(3, 3),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleKingMoves(
        kingBlack,
        board
      );

      //Possiveis movimentos do rei na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 4),
        new Position(3, 2),
        new Position(2, 3),
        new Position(4, 3),
        new Position(4, 4),
        new Position(4, 2),
        new Position(2, 2),
        new Position(2, 4),

      ];

      //Testa o os possiveis movimentos do rei preto cercado por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });

  describe("Possible moves for white/black king with black pieces blocking", () => {
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

    it("Should return possible moves for the white king with enemies blocking", () => {
      const kingWhite = new Piece(
        new Position(3, 3),
        PieceType.KING,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleKingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 4),
        new Position(3, 2),
        new Position(2, 3),
        new Position(4, 3),
        new Position(4, 4),
        new Position(4, 2),
        new Position(2, 2),
        new Position(2, 4),

      ];

      //Testa o os possiveis movimentos do rei branco cercado por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black king with alies blocking", () => {
      const kingBlack = new Piece(
        new Position(3, 3),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleKingMoves(
        kingBlack,
        board
      );

      //Possiveis movimentos do rei na posição 3,3
      const expectedPositions: Position[] = [
        new Position(3, 2),
        new Position(2, 3),
        new Position(4, 2),
        new Position(2, 2),

      ];

      //Testa o os possiveis movimentos do rei preto cercado por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });
});
