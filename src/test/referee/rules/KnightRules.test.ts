import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import { GetPossibleKnightMoves } from "../../../referee/rules";

describe("Bishop possible moves test", () => {
  describe("Tests of Knight on empty Board", () => {
    let emptyBoard: Piece[];
    beforeEach(() => {
      emptyBoard = [];
    });
    it("should return possible moves for a Knight on the center of the board", () => {
      const knightWhiteCenter = new Piece(
        new Position(3, 3),
        PieceType.KNIGHT,
        TeamType.WHITE,
        false
      );
      const knightBlackCenter = new Piece(
        new Position(3, 3),
        PieceType.KNIGHT,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCenter: Position[] = GetPossibleKnightMoves(
        knightWhiteCenter,
        emptyBoard
      );
      const possibleMovesBlackCenter: Position[] = GetPossibleKnightMoves(
        knightBlackCenter,
        emptyBoard
      );

      //Possiveis movimentos do cavalo na posição 3,3
      const expectedPositionsCenter: Position[] = [
        new Position(4, 5),
        new Position(5, 4),
        new Position(2, 5),
        new Position(1, 4),
        new Position(4, 1),
        new Position(5, 2),
        new Position(2, 1),
        new Position(1, 2),

      ];

      //Testa o os possiveis movimentos do cavalo branco no centro do tabuleiro
      expect(possibleMovesWhiteCenter).toEqual(expectedPositionsCenter);
      //Testa o os possiveis movimentos do cavalo preto centro do tabuleiro
      expect(possibleMovesBlackCenter).toEqual(expectedPositionsCenter);
    });

    it("should return possible moves for a knight on the corner of the board", () => {
      const bishopWhiteCorner = new Piece(
        new Position(0, 0),
        PieceType.KNIGHT,
        TeamType.WHITE,
        false
      );
      const bishopBlackCorner = new Piece(
        new Position(0, 0),
        PieceType.KNIGHT,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteCorner: Position[] = GetPossibleKnightMoves(
        bishopWhiteCorner,
        emptyBoard
      );
      const possibleMovesBlackCorner: Position[] = GetPossibleKnightMoves(
        bishopBlackCorner,
        emptyBoard
      );

      //Possiveis movimentos do cavalo na posição 0,0
      const expectedPositionsCorner: Position[] = [
        new Position(1, 2),
        new Position(2, 1),
      ];

      //Testa o os possiveis movimentos do cavalo branco no canto do tabuleiro
      expect(possibleMovesWhiteCorner).toEqual(expectedPositionsCorner);
      //Testa o os possiveis movimentos do cavalo no preto canto do tabuleiro
      expect(possibleMovesBlackCorner).toEqual(expectedPositionsCorner);
    });

    it("should return possible moves for a bishop on the edge of the board", () => {
      const bishopWhiteEdge = new Piece(
        new Position(0, 3),
        PieceType.KNIGHT,
        TeamType.WHITE,
        false
      );
      const bishopBlackEdge = new Piece(
        new Position(0, 3),
        PieceType.KNIGHT,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteEdge: Position[] = GetPossibleKnightMoves(
        bishopWhiteEdge,
        emptyBoard
      );
      const possibleMovesBlackEdge: Position[] = GetPossibleKnightMoves(
        bishopBlackEdge,
        emptyBoard
      );

      //Possiveis movimentos do cavalo na posição 0,3
      const expectedPositionsEdge: Position[] = [
        new Position(1, 5),
        new Position(2, 4),
        new Position(1, 1),
        new Position(2, 2),
      ];

      //Testa o os possiveis movimentos do cavalo branco na borda do tabuleiro
      expect(possibleMovesWhiteEdge).toEqual(expectedPositionsEdge);
      //Testa o os possiveis movimentos do cavalo no preto na borda do tabuleiro
      expect(possibleMovesBlackEdge).toEqual(expectedPositionsEdge);
    });
  })

  describe("Possible moves for white/black knight with white/black pieces blocking", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 4),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const pawnTwo = new Piece(
        new Position(4, 3),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      const pawnThree = new Piece(
        new Position(4, 2),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const rook = new Piece(
        new Position(2, 4),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );
      const rookTwo = new Piece(
        new Position(2, 3),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const rookThree = new Piece(
        new Position(2, 2),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );
      const bishop = new Piece(
        new Position(3, 2),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );
      const bishopTwo = new Piece(
        new Position(3, 4),
        PieceType.BISHOP,
        TeamType.BLACK,
        false
      );
      board.push(pawn);
      board.push(pawnTwo);
      board.push(pawnThree);
      board.push(rook);
      board.push(rookTwo);
      board.push(rookThree);
      board.push(bishop);
      board.push(bishopTwo);
    });

    it("Should return possible moves for the white bishop with allies/enemies blocking", () => {
      const bishopWhite = new Piece(
        new Position(3, 3),
        PieceType.KNIGHT,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleKnightMoves(
        bishopWhite,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [
        new Position(4, 5),
        new Position(5, 4),
        new Position(2, 5),
        new Position(1, 4),
        new Position(4, 1),
        new Position(5, 2),
        new Position(2, 1),
        new Position(1, 2),
      ];

      //Testa o os possiveis movimentos do bispo branco cercado por aliados/inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });

    it("Should return possible moves for the black bishop with allies/enemies blocking", () => {
      const bishopBlack = new Piece(
        new Position(3, 3),
        PieceType.KNIGHT,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleKnightMoves(
        bishopBlack,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [
        new Position(4, 5),
        new Position(5, 4),
        new Position(2, 5),
        new Position(1, 4),
        new Position(4, 1),
        new Position(5, 2),
        new Position(2, 1),
        new Position(1, 2),
      ];

      //Testa o os possiveis movimentos do bispo preto cercado por aliados/inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });
  describe("Possible moves for white/black knight cornered by white pieces", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      const pawn = new Piece(
        new Position(4, 5),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const pawnTwo = new Piece(
        new Position(5, 4),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const pawnThree = new Piece(
        new Position(2, 5),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const rook = new Piece(
        new Position(4, 1),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const queen = new Piece(
        new Position(1, 4),
        PieceType.QUEEN,
        TeamType.WHITE,
        false
      );
      const rookTwo = new Piece(
        new Position(5, 2),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const rookThree = new Piece(
        new Position(2, 1),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );
      const bishop = new Piece(
        new Position(1, 2),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );

      board.push(pawn);
      board.push(pawnTwo);
      board.push(pawnThree);
      board.push(queen);
      board.push(rook);
      board.push(rookTwo);
      board.push(rookThree);
      board.push(bishop);
    });

    it("Should return possible moves for the white bishop cornered by allies", () => {
      const bishopWhite = new Piece(
        new Position(3, 3),
        PieceType.KNIGHT,
        TeamType.WHITE,
        false
      );

      const possibleMoves: Position[] = GetPossibleKnightMoves(
        bishopWhite,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [];

      //Testa o os possiveis movimentos do bispo branco cercado por aliados
      expect(possibleMoves).toEqual(expectedPositions);
    });
    it("Should return possible moves for the black bishop cornered by enemies", () => {
      const bishopBlack = new Piece(
        new Position(3, 3),
        PieceType.KNIGHT,
        TeamType.BLACK,
        false
      );

      const possibleMoves: Position[] = GetPossibleKnightMoves(
        bishopBlack,
        board
      );

      //Possiveis movimentos do bispo na posição 3,3
      const expectedPositions: Position[] = [
        new Position(4, 5),
        new Position(5, 4),
        new Position(2, 5),
        new Position(1, 4),
        new Position(4, 1),
        new Position(5, 2),
        new Position(2, 1),
        new Position(1, 2),
      ];

      //Testa o os possiveis movimentos do bispo preto cercado por inimigos
      expect(possibleMoves).toEqual(expectedPositions);
    });
  });
})
