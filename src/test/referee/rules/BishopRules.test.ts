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
        TeamType.OUR,
        false
      );
      const bishopBlackCenter = new Piece(
        new Position(3, 3),
        PieceType.BISHOP,
        TeamType.OPPONENT,
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
        new Position(0, 0),
        new Position(1, 1),
        new Position(2, 2),
        new Position(4, 4),
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7),

        new Position(0, 6),
        new Position(1, 5),
        new Position(2, 4),
        new Position(4, 2),
        new Position(5, 1),
        new Position(6, 0),
      ];

      //Testa o os possiveis movimentos do bispo branco no centro do tabuleiro
      expect(possibleMovesWhiteCenter).toEqual(
        expect.arrayContaining(expectedPositionsCenter)
      );
      expect(expectedPositionsCenter).toEqual(
        expect.arrayContaining(possibleMovesWhiteCenter)
      );
      //Testa o os possiveis movimentos do bispo no preto centro do tabuleiro
      expect(possibleMovesBlackCenter).toEqual(
        expect.arrayContaining(expectedPositionsCenter)
      );
      expect(expectedPositionsCenter).toEqual(
        expect.arrayContaining(possibleMovesBlackCenter)
      );
    });

    it("should return possible moves for a bishop on the corner of the board", () => {
      const bishopWhiteCorner = new Piece(
        new Position(0, 0),
        PieceType.BISHOP,
        TeamType.OUR,
        false
      );
      const bishopBlackCorner = new Piece(
        new Position(0, 0),
        PieceType.BISHOP,
        TeamType.OPPONENT,
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
      expect(possibleMovesWhiteCorner).toEqual(
        expect.arrayContaining(expectedPositionsCorner)
      );
      expect(expectedPositionsCorner).toEqual(
        expect.arrayContaining(possibleMovesWhiteCorner)
      );
      //Testa o os possiveis movimentos do bispo no preto canto do tabuleiro
      expect(possibleMovesBlackCorner).toEqual(
        expect.arrayContaining(expectedPositionsCorner)
      );
      expect(expectedPositionsCorner).toEqual(
        expect.arrayContaining(possibleMovesBlackCorner)
      );
    });

    it("should return possible moves for a bishop on the edge of the board", () => {
      const bishopWhiteEdge = new Piece(
        new Position(0, 3),
        PieceType.BISHOP,
        TeamType.OUR,
        false
      );
      const bishopBlackEdge = new Piece(
        new Position(0, 3),
        PieceType.BISHOP,
        TeamType.OPPONENT,
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
      expect(possibleMovesWhiteEdge).toEqual(
        expect.arrayContaining(expectedPositionsEdge)
      );
      expect(expectedPositionsEdge).toEqual(
        expect.arrayContaining(possibleMovesWhiteEdge)
      );
      //Testa o os possiveis movimentos do bispo no preto na borda do tabuleiro
      expect(possibleMovesBlackEdge).toEqual(
        expect.arrayContaining(expectedPositionsEdge)
      );
      expect(expectedPositionsEdge).toEqual(
        expect.arrayContaining(possibleMovesBlackEdge)
      );
    });
  });
});
