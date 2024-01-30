import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import { GetPossiblePawnMoves } from "../../../referee/rules";

describe("pawn possible moves test", () => {
  describe("Tests of the pawn on a empty board", () => {
    let emptyBoard: Piece[];
    beforeEach(() => {
      emptyBoard = [];
    });
    it("should return possible moves for a pawn on the initial position", () => {
      const pawnWhiteInitial = new Piece(
        new Position(5, 1),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const pawnBlackInitial = new Piece(
        new Position(5, 6),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteInitial: Position[] = GetPossiblePawnMoves(
        pawnWhiteInitial,
        emptyBoard
      );
      const possibleMovesBlackInitial: Position[] = GetPossiblePawnMoves(
        pawnBlackInitial,
        emptyBoard
      );

      //Possiveis movimentos do peão na posição inicial
      const expectedPositionsWhite: Position[] = [
        new Position(5, 2),
        new Position(5, 3),

      ];
      const expectedPositionsBlack: Position[] = [
        new Position(5, 5),
        new Position(5, 4),

      ];

      //Testa o os possiveis movimentos do peão branco na posição inicial do tabuleiro
      expect(possibleMovesWhiteInitial).toEqual(expectedPositionsWhite);
      //Testa o os possiveis movimentos do peão preto na posição inicial do tabuleiro
      expect(possibleMovesBlackInitial).toEqual(expectedPositionsBlack);
    });

    it("should return possible moves for a pawn on that is not on initial position", () => {
      const pawnWhite = new Piece(
        new Position(4, 2),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const pawnBlack = new Piece(
        new Position(5, 5),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhite: Position[] = GetPossiblePawnMoves(
        pawnWhite,
        emptyBoard
      );
      const possibleMovesBlack: Position[] = GetPossiblePawnMoves(
        pawnBlack,
        emptyBoard
      );

      //Possiveis movimentos do peão na posição não inicial
      const expectedPositionsWhite: Position[] = [
        new Position(4, 3),
      ];
      const expectedPositionsBlack: Position[] = [
        new Position(5, 4),
      ];

      //Testa o os possiveis movimentos do peão branco na posição não inicial do tabuleiro
      expect(possibleMovesWhite).toEqual(expectedPositionsWhite);
      //Testa o os possiveis movimentos do peão preto na posição não inicial do tabuleiro
      expect(possibleMovesBlack).toEqual(expectedPositionsBlack);
    });

    it("should return possible moves for a pawn on the end of the board", () => {
      const pawnWhite = new Piece(
        new Position(7, 7),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const pawnBlack = new Piece(
        new Position(0, 0),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhite: Position[] = GetPossiblePawnMoves(
        pawnWhite,
        emptyBoard
      );
      const possibleMovesBlack: Position[] = GetPossiblePawnMoves(
        pawnBlack,
        emptyBoard
      );

      //Possiveis movimentos do peão na final do tabuleiro
      const expectedPositionsWhite: Position[] = [

      ];
      const expectedPositionsBlack: Position[] = [

      ];

      //Testa o os possiveis movimentos do peão branco no final do tabuleiro
      expect(possibleMovesWhite).toEqual(expectedPositionsWhite);
      //Testa o os possiveis movimentos do peão preto no final do tatbileiro
      expect(possibleMovesBlack).toEqual(expectedPositionsBlack);
    });
  })

  describe("Tests of the pawn with an ally/enemy blocking", () => {
    let board: Piece[] = []
    beforeEach(() => {
      const bishop = new Piece(
        new Position(1, 3),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );
      const queen = new Piece(
        new Position(6, 4),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );

      board.push(bishop);
      board.push(queen);

    });
    it("should return an empty array for a pawn with an ally blocking", () => {
      const pawnWhite = new Piece(
        new Position(1, 2),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const pawnBlack = new Piece(
        new Position(6, 5),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteInitial: Position[] = GetPossiblePawnMoves(
        pawnWhite,
        board
      );
      const possibleMovesBlackInitial: Position[] = GetPossiblePawnMoves(
        pawnBlack,
        board
      );

      //Possiveis movimentos do peão com aliados bloqueando
      const expectedPositionsWhite: Position[] = [

      ];
      const expectedPositionsBlack: Position[] = [

      ];

      //Testa o os possiveis movimentos do peão branco com aliados bloqueando
      expect(possibleMovesWhiteInitial).toEqual(expectedPositionsWhite);
      //Testa o os possiveis movimentos do peão preto com aliados bloqueando
      expect(possibleMovesBlackInitial).toEqual(expectedPositionsBlack);
    });

    it("should return an empty array for a pawn with enemies blocking", () => {
      const pawnWhite = new Piece(
        new Position(6, 3),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const pawnBlack = new Piece(
        new Position(1, 4),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhite: Position[] = GetPossiblePawnMoves(
        pawnWhite,
        board
      );
      const possibleMovesBlack: Position[] = GetPossiblePawnMoves(
        pawnBlack,
        board
      );

      //Possiveis movimentos do peão com inimigos bloqueando
      const expectedPositionsWhite: Position[] = [

      ];
      const expectedPositionsBlack: Position[] = [

      ];

      //Testa o os possiveis movimentos do peão branco bloqueado por inimigos
      expect(possibleMovesWhite).toEqual(expectedPositionsWhite);
      //Testa o os possiveis movimentos do peão preto bloqueado por inimigos
      expect(possibleMovesBlack).toEqual(expectedPositionsBlack);
    });
  })

  describe("Tests of the pawn with an ally/enemy on the diagonal tile", () => {
    let board: Piece[] = []
    beforeEach(() => {
      const bishop = new Piece(
        new Position(0, 3),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );
      const bishopTwo = new Piece(
        new Position(2, 3),
        PieceType.BISHOP,
        TeamType.WHITE,
        false
      );
      const queen = new Piece(
        new Position(5, 4),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );
      const queenTwo = new Piece(
        new Position(7, 4),
        PieceType.QUEEN,
        TeamType.BLACK,
        false
      );

      board.push(bishop);
      board.push(bishopTwo);
      board.push(queen);
      board.push(queenTwo);

    });
    it("should return possible moves for a pawn with an allys on diagonal tiles", () => {
      const pawnWhite = new Piece(
        new Position(1, 2),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const pawnBlack = new Piece(
        new Position(6, 5),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhiteInitial: Position[] = GetPossiblePawnMoves(
        pawnWhite,
        board
      );
      const possibleMovesBlackInitial: Position[] = GetPossiblePawnMoves(
        pawnBlack,
        board
      );

      //Possiveis movimentos do peão com aliados bloqueando
      const expectedPositionsWhite: Position[] = [
        new Position(1, 3)
      ];
      const expectedPositionsBlack: Position[] = [
        new Position(6, 4)

      ];

      //Testa o os possiveis movimentos do peão branco com aliados nas diagonais
      expect(possibleMovesWhiteInitial).toEqual(expectedPositionsWhite);
      //Testa o os possiveis movimentos do peão preto com aliados nas diagonais
      expect(possibleMovesBlackInitial).toEqual(expectedPositionsBlack);
    });

    it("should return an empty array for a pawn with enemies on diagonal tile", () => {
      const pawnWhite = new Piece(
        new Position(6, 3),
        PieceType.KING,
        TeamType.WHITE,
        false
      );
      const pawnBlack = new Piece(
        new Position(1, 4),
        PieceType.KING,
        TeamType.BLACK,
        false
      );

      const possibleMovesWhite: Position[] = GetPossiblePawnMoves(
        pawnWhite,
        board
      );
      const possibleMovesBlack: Position[] = GetPossiblePawnMoves(
        pawnBlack,
        board
      );

      //Possiveis movimentos do peão com inimigos bloqueando
      const expectedPositionsWhite: Position[] = [
        new Position(6, 4),
        new Position(5, 4),
        new Position(7, 4)

      ];
      const expectedPositionsBlack: Position[] = [
        new Position(1, 3),
        new Position(0, 3),
        new Position(2, 3)
      ];

      //Testa o os possiveis movimentos do peão branco bloqueado por inimigos
      expect(possibleMovesWhite).toEqual(expectedPositionsWhite);
      //Testa o os possiveis movimentos do peão preto bloqueado por inimigos
      expect(possibleMovesBlack).toEqual(expectedPositionsBlack);
    });
  })
})