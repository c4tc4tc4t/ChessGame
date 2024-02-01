import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import { GetPossibleKingMoves, GetPossibleRookMoves, getCastlingMoves } from "../../../referee/rules";

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

  describe("Possible moves for white king with white pieces blocking", () => {
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

    it("Should return possible moves for the white king with allies blocking", () => {
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
  });
});

describe('getCastlingMoves', () => {
  describe("castling moves on an empty board, except for the rooks that previously not moved", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      //criando os movimentos das torres manualmente, pois o rei será inserido depois
      const longRookPossibleMoves: Position[] = [
        new Position(6, 0),
        new Position(5, 0),
      ];
      const shortRookPossibleMoves: Position[] = [
        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
      ];

      //Criando ambas as torres para o roque
      const longRook = new Piece(
        new Position(7, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        longRookPossibleMoves
      );
      const shortRook = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        shortRookPossibleMoves
      );

      board.push(longRook);
      board.push(shortRook);
    });

    it("Should return castling moves for the white king that has not moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial
      const expectedPositions: Position[] = [
        new Position(7, 0),
        new Position(0, 0),
      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });

    it("Should return an empty array for the white king that has moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        true
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial, porém se moveu
      const expectedPositions: Position[] = [

      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });

    it("Should return an empty array for the white king that has not moved, but it's not on the initial position", () => {
      const kingWhite = new Piece(
        new Position(5, 0),
        PieceType.KING,
        TeamType.WHITE,
        true
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição 3,3
      const expectedPositions: Position[] = [

      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });
  })

  describe("castling moves on an empty board, except for the rooks that previously moved", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      //criando os movimentos das torres manualmente, pois o rei será inserido depois
      const longRookPossibleMoves: Position[] = [
        new Position(6, 0),
        new Position(5, 0),
      ];
      const shortRookPossibleMoves: Position[] = [
        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
      ];

      //Criando ambas as torres para o roque
      const longRook = new Piece(
        new Position(7, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        true,
        longRookPossibleMoves
      );
      const shortRook = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        true,
        shortRookPossibleMoves
      );

      board.push(longRook);
      board.push(shortRook);
    });
    it("Should return an empty array for the white king that has not moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial
      const expectedPositions: Position[] = [

      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });
  })

  describe("castling moves with a bishop blocking the castle between both rooks", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      //criando os movimentos das torres manualmente, pois o rei será inserido depois
      const longRookPossibleMoves: Position[] = [

      ];
      const shortRookPossibleMoves: Position[] = [

      ];

      //Criando ambas as torres para o roque
      const longRook = new Piece(
        new Position(7, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        longRookPossibleMoves
      );
      const shortRook = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        shortRookPossibleMoves
      );
      const bishopOne = new Piece(
        new Position(1, 0),
        PieceType.BISHOP,
        TeamType.WHITE,
        false,
      );
      const bishopTwo = new Piece(
        new Position(6, 0),
        PieceType.BISHOP,
        TeamType.WHITE,
        false,
      );

      board.push(longRook);
      board.push(shortRook);
      board.push(bishopOne);
      board.push(bishopTwo);
    });
    it("Should return an empty array for the white king that has not moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial
      const expectedPositions: Position[] = [

      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });
  })
  describe("castling moves with tiles 1,0 and 6,0 attacked", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      //criando os movimentos das torres manualmente, pois o rei será inserido depois
      const longRookPossibleMoves: Position[] = [
        new Position(6, 0),
        new Position(5, 0),
      ];
      const shortRookPossibleMoves: Position[] = [
        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
      ];

      //Criando ambas as torres para o roque
      const longRook = new Piece(
        new Position(7, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        longRookPossibleMoves
      );
      const shortRook = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        shortRookPossibleMoves
      );
      const rookOne = new Piece(
        new Position(1, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false,
      );
      const rookTwo = new Piece(
        new Position(6, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false,
      );
      rookOne.possibleMoves = GetPossibleRookMoves(rookOne, board)
      rookTwo.possibleMoves = GetPossibleRookMoves(rookTwo, board)

      board.push(longRook);
      board.push(shortRook);
      board.push(rookOne);
      board.push(rookTwo);
    });
    it("Should return an empty array for the white king that has not moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial
      const expectedPositions: Position[] = [

      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });
  })
  describe("castling moves with tiles 2,0 and 5,0 attacked", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      //criando os movimentos das torres manualmente, pois o rei será inserido depois
      const longRookPossibleMoves: Position[] = [
        new Position(6, 0),
        new Position(5, 0),
      ];
      const shortRookPossibleMoves: Position[] = [
        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
      ];

      //Criando ambas as torres para o roque
      const longRook = new Piece(
        new Position(7, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        longRookPossibleMoves
      );
      const shortRook = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        shortRookPossibleMoves
      );
      const rookOne = new Piece(
        new Position(2, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false,
      );
      const rookTwo = new Piece(
        new Position(5, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false,
      );
      rookOne.possibleMoves = GetPossibleRookMoves(rookOne, board)
      rookTwo.possibleMoves = GetPossibleRookMoves(rookTwo, board)

      board.push(longRook);
      board.push(shortRook);
      board.push(rookOne);
      board.push(rookTwo);
    });
    it("Should return an empty array for the white king that has not moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial
      const expectedPositions: Position[] = [

      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });
  })
  describe("castling moves with tile 3,0 attacked", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      //criando os movimentos das torres manualmente, pois o rei será inserido depois
      const longRookPossibleMoves: Position[] = [
        new Position(6, 0),
        new Position(5, 0),
      ];
      const shortRookPossibleMoves: Position[] = [
        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
      ];

      //Criando ambas as torres para o roque
      const longRook = new Piece(
        new Position(7, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        longRookPossibleMoves
      );
      const shortRook = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        shortRookPossibleMoves
      );
      const rookOne = new Piece(
        new Position(3, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false,
      );

      rookOne.possibleMoves = GetPossibleRookMoves(rookOne, board)

      board.push(longRook);
      board.push(shortRook);
      board.push(rookOne);

    });
    it("Should return castling short for the white king that has not moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial
      const expectedPositions: Position[] = [
        new Position(7, 0)
      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });
  })
  describe("castling moves with king in check", () => {
    let board: Piece[] = [];

    beforeEach(() => {
      //criando os movimentos das torres manualmente, pois o rei será inserido depois
      const longRookPossibleMoves: Position[] = [
        new Position(6, 0),
        new Position(5, 0),
      ];
      const shortRookPossibleMoves: Position[] = [
        new Position(1, 0),
        new Position(2, 0),
        new Position(3, 0),
      ];

      //Criando ambas as torres para o roque
      const longRook = new Piece(
        new Position(7, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        longRookPossibleMoves
      );
      const shortRook = new Piece(
        new Position(0, 0),
        PieceType.ROOK,
        TeamType.WHITE,
        false,
        shortRookPossibleMoves
      );
      const rookOne = new Piece(
        new Position(4, 3),
        PieceType.ROOK,
        TeamType.BLACK,
        false,
      );

      rookOne.possibleMoves = GetPossibleRookMoves(rookOne, board)

      board.push(longRook);
      board.push(shortRook);
      board.push(rookOne);


    });
    it("Should return an empty array for the white king that has not moved", () => {
      const kingWhite = new Piece(
        new Position(4, 0),
        PieceType.KING,
        TeamType.WHITE,
        false
      );


      const castlingMoves: Position[] = getCastlingMoves(
        kingWhite,
        board
      );

      //Possiveis movimentos do rei na posição inicial
      const expectedPositions: Position[] = [

      ];

      //Testa o movimento de roque do rei em ambos os lados
      expect(castlingMoves).toEqual(expectedPositions);
    });
  })

});