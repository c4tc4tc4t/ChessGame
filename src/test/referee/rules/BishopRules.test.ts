import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import { GetPossibleBishopMoves } from "../../../referee/rules";

describe("Bishop possible moves test", () => {
  describe("Tests of the bishop on a empty board", () => {
    let emptyBoard: Piece[];
    beforeEach(() => {
      emptyBoard = [];
    });
    it("should return possible moves for a bishop on the center of the board", () => {
      const bishopWhiteCenter = new Piece(
        new Position(3, 3),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );
      const bishopBlackCenter = new Piece(
        new Position(3, 3),
        PieceType.BISHOP,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCenter: Position[] = GetPossibleBishopMoves(
        bishopWhiteCenter,
        emptyBoard
      );
      const possibleMovesBlackCenter: Position[] = GetPossibleBishopMoves(
        bishopBlackCenter,
        emptyBoard
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositionsCenter: Position[] = [
        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),
        new Position(4, 4),
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7),

        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),
        new Position(2, 4),
        new Position(1, 5),
        new Position(0, 6),
      ];

      //Testa o os possiveis movimentos do bispo branco no centro do tabuleiro
      expect(possibleMovesWhiteCenter).toEqual(expectedPositionsCenter);
      //Testa o os possiveis movimentos do bispo preto centro do tabuleiro
      expect(possibleMovesBlackCenter).toEqual(expectedPositionsCenter);
    });

    it("should return possible moves for a bishop on the corner of the board", () => {
      const bishopWhiteCorner = new Piece(
        new Position(0, 0),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );
      const bishopBlackCorner = new Piece(
        new Position(0, 0),
        PieceType.BISHOP,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCorner: Position[] = GetPossibleBishopMoves(
        bishopWhiteCorner,
        emptyBoard
      );
      const possibleMovesBlackCorner: Position[] = GetPossibleBishopMoves(
        bishopBlackCorner,
        emptyBoard
      );

      //Possiveis movimentos do bispo na posição 0,0
      const expectedPositionsCorner: Position[] = [
        new Position(1, 1),
        new Position(2, 2),
        new Position(3, 3),
        new Position(4, 4),
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7),
      ];

      //Testa o os possiveis movimentos do bispo branco no canto do tabuleiro
      expect(possibleMovesWhiteCorner).toEqual(expectedPositionsCorner);
      //Testa o os possiveis movimentos do bispo preto canto do tabuleiro
      expect(possibleMovesBlackCorner).toEqual(expectedPositionsCorner);
    });

    it("should return possible moves for a bishop on the edge of the board", () => {
      const bishopWhiteEdge = new Piece(
        new Position(0, 3),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );
      const bishopBlackEdge = new Piece(
        new Position(0, 3),
        PieceType.BISHOP,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteEdge: Position[] = GetPossibleBishopMoves(
        bishopWhiteEdge,
        emptyBoard
      );
      const possibleMovesBlackEdge: Position[] = GetPossibleBishopMoves(
        bishopBlackEdge,
        emptyBoard
      );

      //Possiveis movimentos do bispo na posição 0,3
      const expectedPositionsEdge: Position[] = [
        new Position(1, 4),
        new Position(2, 5),
        new Position(3, 6),
        new Position(4, 7),

        new Position(1, 2),
        new Position(2, 1),
        new Position(3, 0),
      ];

      //Testa o os possiveis movimentos do bispo branco na borda do tabuleiro
      expect(possibleMovesWhiteEdge).toEqual(expectedPositionsEdge);
      //Testa o os possiveis movimentos do bispo preto na borda do tabuleiro
      expect(possibleMovesBlackEdge).toEqual(expectedPositionsEdge);
    });
  });

  describe("Possible moves for white/black bishop with white pieces blocking", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 4),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const rook = new Piece(
        new Position(2, 4),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      board.push(pawn);
      board.push(rook);
    });

    it("Should return possible moves for the white bishop with allies blocking", () => {
      const bishopWhite = new Piece(
        new Position(3, 3),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleBishopMoves(
        bishopWhite,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [
        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),

        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),
      ];

      //Testa o os possiveis movimentos do bispo branco cercado por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black bishop with enemies blocking", () => {
      const bishopBlack = new Piece(
        new Position(3, 3),
        PieceType.BISHOP,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleBishopMoves(
        bishopBlack,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [
        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),
        new Position(4, 4),

        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),
        new Position(2, 4),
      ];

      //Testa o os possiveis movimentos do bispo preto cercado por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });

  describe("Possible moves for white/black bishop with black pieces blocking", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 4),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      const rook = new Piece(
        new Position(2, 4),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );
      board.push(pawn);
      board.push(rook);
    });

    it("Should return possible moves for the white bishop with enemies blocking", () => {
      const bishopWhite = new Piece(
        new Position(3, 3),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleBishopMoves(
        bishopWhite,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [
        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),
        new Position(4, 4),

        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),
        new Position(2, 4),
      ];

      //Testa o os possiveis movimentos do bispo branco cercado por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black bishop with alies blocking", () => {
      const bishopBlack = new Piece(
        new Position(3, 3),
        PieceType.BISHOP,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleBishopMoves(
        bishopBlack,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [
        new Position(2, 2),
        new Position(1, 1),
        new Position(0, 0),

        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),
      ];

      //Testa o os possiveis movimentos do bispo preto cercado por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });
});
