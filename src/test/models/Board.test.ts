import { PieceType, TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import { Board } from "../../models/Board"
import { Pawn } from "../../models/Pawn";
import { GetPossibleRookMoves } from "../../referee/rules";

describe('Board Class Tests', () => {
  describe('Tests of the getValidMoves method', () => {
    let originalBoard: Board;
    let pieces: Piece[] = []
    let pawn: Pawn
    let rook: Piece
    let bishop: Piece
    let knight: Piece
    let king: Piece
    let queen: Piece
    beforeEach(() => {
      pawn = new Pawn(new Position(0, 1), TeamType.WHITE, false)
      rook = new Piece(new Position(1, 1), PieceType.ROOK, TeamType.WHITE, false)
      bishop = new Piece(new Position(2, 1), PieceType.BISHOP, TeamType.WHITE, false)
      knight = new Piece(new Position(3, 1), PieceType.KNIGHT, TeamType.WHITE, false)
      king = new Piece(new Position(4, 1), PieceType.KING, TeamType.WHITE, false)
      queen = new Piece(new Position(5, 1), PieceType.QUEEN, TeamType.WHITE, false)
      pieces.push(pawn, rook, bishop, knight, king, queen)

      originalBoard = new Board(pieces, 0)
    })
    it("Should return valid moves of the pawn", () => {
      const pawnValidMoves = originalBoard.getValidMoves(pawn, pieces)

      const expectedValidMoves = [
        new Position(0, 2),
        new Position(0, 3),
      ]
      expect(pawnValidMoves).toEqual(expectedValidMoves)
    })

    it("Should return valid moves of the rook", () => {
      const rookValidMoves = originalBoard.getValidMoves(rook, pieces)

      const expectedValidMoves = [
        new Position(1, 2),
        new Position(1, 3),
        new Position(1, 4),
        new Position(1, 5),
        new Position(1, 6),
        new Position(1, 7),
        new Position(1, 0),
      ]

      expect(rookValidMoves).toEqual(expectedValidMoves)
    })

    it("Should return valid moves of the bishop", () => {
      const bishopValidMoves = originalBoard.getValidMoves(bishop, pieces)

      const expectedValidMoves = [
        new Position(1, 0),
        new Position(3, 2),
        new Position(4, 3),
        new Position(5, 4),
        new Position(6, 5),
        new Position(7, 6),
        new Position(3, 0),
        new Position(1, 2),
        new Position(0, 3),
      ]

      expect(bishopValidMoves).toEqual(expectedValidMoves)
    })

    it("Should return valid moves of the knight", () => {
      const knightValidMoves = originalBoard.getValidMoves(knight, pieces)

      const expectedValidMoves = [
        new Position(4, 3),
        new Position(5, 2),
        new Position(2, 3),
        new Position(1, 2),
        new Position(5, 0),
        new Position(1, 0),

      ]

      expect(knightValidMoves).toEqual(expectedValidMoves)
    })

    it("Should return valid moves of the king", () => {
      const kingValidMoves = originalBoard.getValidMoves(king, pieces)

      const expectedValidMoves = [
        new Position(4, 2),
        new Position(4, 0),
        new Position(5, 2),
        new Position(5, 0),
        new Position(3, 0),
        new Position(3, 2),

      ]

      expect(kingValidMoves).toEqual(expectedValidMoves)
    })

    it("Should return valid moves of the queen", () => {
      const queenValidMoves = originalBoard.getValidMoves(queen, pieces)

      const expectedValidMoves = [
        new Position(6, 2),
        new Position(7, 3),
        new Position(6, 0),
        new Position(4, 0),
        new Position(4, 2),
        new Position(3, 3),
        new Position(2, 4),
        new Position(1, 5),
        new Position(0, 6),
        new Position(5, 2),
        new Position(5, 3),
        new Position(5, 4),
        new Position(5, 5),
        new Position(5, 6),
        new Position(5, 7),
        new Position(5, 0),
        new Position(6, 1),
        new Position(7, 1),

      ]

      expect(queenValidMoves).toEqual(expectedValidMoves)
    })
  })

  describe("tests of checkCurrentTeamMoves method", () => {
    let originalBoard: Board;
    let pieces: Piece[] = []
    let pawnWhite: Pawn
    let pawnBlack: Pawn
    let rookWhite: Piece
    let rookBlack: Piece
    let bishopWhite: Piece
    let bishopBlack: Piece
    let knightWhite: Piece
    let knightBlack: Piece
    let kingWhite: Piece
    let kingBlack: Piece
    let queenWhite: Piece
    let queenBlack: Piece
    beforeEach(() => {
      pawnWhite = new Pawn(new Position(0, 1), TeamType.WHITE, false)
      pawnBlack = new Pawn(new Position(0, 6), TeamType.BLACK, false)
      rookWhite = new Piece(new Position(1, 1), PieceType.ROOK, TeamType.WHITE, false)
      rookBlack = new Piece(new Position(1, 6), PieceType.ROOK, TeamType.BLACK, false)
      bishopWhite = new Piece(new Position(2, 1), PieceType.BISHOP, TeamType.WHITE, false)
      bishopBlack = new Piece(new Position(2, 6), PieceType.BISHOP, TeamType.BLACK, false)
      knightWhite = new Piece(new Position(3, 1), PieceType.KNIGHT, TeamType.WHITE, false)
      knightBlack = new Piece(new Position(3, 6), PieceType.KNIGHT, TeamType.BLACK, false)
      kingWhite = new Piece(new Position(4, 1), PieceType.KING, TeamType.WHITE, false)
      kingBlack = new Piece(new Position(4, 6), PieceType.KING, TeamType.BLACK, false)
      queenWhite = new Piece(new Position(5, 1), PieceType.QUEEN, TeamType.WHITE, false)
      queenBlack = new Piece(new Position(5, 6), PieceType.QUEEN, TeamType.BLACK, false)

      const pieceAttacking = new Piece(new Position(3, 2), PieceType.ROOK, TeamType.WHITE, true)
      pieces.push(pawnWhite, rookWhite, bishopWhite, knightWhite, kingWhite, queenWhite)
      pieces.push(pawnBlack, rookBlack, bishopBlack, knightBlack, kingBlack, queenBlack)
      pieces.push(pieceAttacking)

      originalBoard = new Board(pieces, 0)
    })

    afterEach(() => {
      originalBoard = [] as any as Board
    })

    it('tests of if current team have moves updated', () => {


      originalBoard.calculateAllMoves();

      // Verificar se as peças do currentTeam têm movimentos possíveis atualizados
      for (const piece of originalBoard.pieces) {
        if (piece.team === originalBoard.currentTeam) {
          expect(piece.possibleMoves).not.toEqual([]);
        } else {
          // Verificar se as peças do outro time têm seus movimentos possíveis vazios ou não modificados
          expect(piece.possibleMoves).toEqual([]);
        }
      }
    });

    test('Movimentos que colocam o rei em cheque são removidos dos possibleMoves', () => {


      const pieceWithRiskyMove = new Piece(new Position(4, 5), PieceType.ROOK, TeamType.BLACK, true)
      const riskyMove = new Position(5, 5)
      const possibleMove = new Position(4, 3)

      originalBoard.pieces.push(pieceWithRiskyMove)

      for (const piece of originalBoard.pieces) {
        piece.possibleMoves = originalBoard.getValidMoves(piece, originalBoard.pieces);
      }

      originalBoard.checkCurrentTeamMoves();

      // Verificar se o movimento arriscado foi removido dos possibleMoves da peça
      expect(pieceWithRiskyMove.possibleMoves).not.toContainEqual(riskyMove);
      expect(pieceWithRiskyMove.possibleMoves).toContainEqual(possibleMove);
    });


  })
})