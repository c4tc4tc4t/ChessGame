import { PieceType, TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import { Board } from "../../models/Board"
import { Pawn } from "../../models/Pawn";

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

      originalBoard = new Board(pieces, 1)
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
    describe("tests with pieces with all types", () => {
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

        pieces.push(pawnWhite, rookWhite, bishopWhite, knightWhite, kingWhite, queenWhite)
        pieces.push(pawnBlack, rookBlack, bishopBlack, knightBlack, kingBlack, queenBlack)


        originalBoard = new Board(pieces, 1)
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
    })

    describe("test with towers protecting and attacking kings", () => {
      let originalBoard: Board;
      let pieces: Piece[] = []

      let kingWhite: Piece
      let kingBlack: Piece

      beforeEach(() => {
        kingWhite = new Piece(new Position(4, 1), PieceType.KING, TeamType.WHITE, false)
        kingBlack = new Piece(new Position(4, 6), PieceType.KING, TeamType.BLACK, false)

        const pieceAttacking = new Piece(new Position(4, 2), PieceType.ROOK, TeamType.WHITE, true)

        pieces.push(kingBlack, kingWhite)
        pieces.push(pieceAttacking)

        originalBoard = new Board(pieces, 2)
      })
      it('Should remove moves that put the king in check from possibleMoves', () => {


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

  describe('Tests of the calculateAllMoves method', () => {
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

      pieces.push(pawnWhite, rookWhite, bishopWhite, knightWhite, kingWhite, queenWhite)
      pieces.push(pawnBlack, rookBlack, bishopBlack, knightBlack, kingBlack, queenBlack)


      originalBoard = new Board(pieces, 1)
    })

    afterEach(() => {
      originalBoard = [] as any as Board
    })

    it('Should update all possible moves and clean enemy possible moves calculateAllMoves', () => {

      originalBoard.calculateAllMoves();

      // Verifica se os movimentos possíveis foram atualizados corretamente para o time atual
      expect(pawnWhite.possibleMoves).toContainEqual(new Position(0, 2));
      expect(pawnWhite.possibleMoves).toContainEqual(new Position(0, 3));
      expect(rookWhite.possibleMoves).toContainEqual(new Position(1, 2));
      expect(bishopWhite.possibleMoves).toContainEqual(new Position(1, 2));
      expect(knightWhite.possibleMoves).toContainEqual(new Position(2, 3));
      expect(kingWhite.possibleMoves).toContainEqual(new Position(4, 2));
      expect(queenWhite.possibleMoves).toContainEqual(new Position(7, 3));

      // Verifica se os movimentos possíveis foram removidos (limpos) para o time adversário
      originalBoard.pieces.filter(p => p.team !== originalBoard.currentTeam).forEach(piece => {
        expect(piece.possibleMoves).toEqual([]);
      });
    });
  })
  describe("Tests castling of calculateAllMoves", () => {
    let pieces: Piece[] = []
    const king: Piece = new Piece(new Position(4, 0), PieceType.KING, TeamType.WHITE, false)
    const rook: Piece = new Piece(new Position(7, 0), PieceType.ROOK, TeamType.WHITE, false)

    pieces.push(king, rook)

    const originalBoard: Board = new Board(pieces, 1)

    it("Should test if king receives castlingMoves after calculateAllMoves", () => {
      originalBoard.calculateAllMoves()

      expect(king.possibleMoves).toContainEqual(new Position(7, 0));
    })
  })


  describe('Tests of the playMove method', () => {
    describe('Normal movements and en passant tests', () => {


      let originalBoard: Board;
      let pieces: Piece[] = []
      let pawnWhite: Pawn
      let pawnBlack: Pawn
      let bishopWhite: Piece
      let knightWhite: Piece
      let queenWhite: Piece

      beforeEach(() => {
        pawnWhite = new Pawn(new Position(1, 4), TeamType.WHITE, true)
        pawnBlack = new Pawn(new Position(0, 4), TeamType.BLACK, true)
        bishopWhite = new Piece(new Position(2, 1), PieceType.BISHOP, TeamType.WHITE, false)
        knightWhite = new Piece(new Position(3, 1), PieceType.KNIGHT, TeamType.WHITE, false)
        queenWhite = new Piece(new Position(5, 1), PieceType.QUEEN, TeamType.WHITE, false)

        pieces.push(pawnWhite, bishopWhite, knightWhite, queenWhite)
        pieces.push(pawnBlack)


        originalBoard = new Board(pieces, 1)
      })

      afterEach(() => {
        originalBoard = [] as any as Board
      })

      it('Should test if the move played is updated correctly', () => {

        const bishopMove = originalBoard.playMove(false, true, bishopWhite, new Position(0, 3))

        expect(bishopWhite.position).toEqual(new Position(0, 3));
        expect(bishopMove).toBeTruthy();
        expect(bishopWhite.hasMoved).toBeTruthy();

      });

      it('Should test if the invalid move played is not updated', () => {

        const bishopMove = originalBoard.playMove(false, false, bishopWhite, new Position(2, 2))

        expect(bishopWhite.position).not.toEqual(new Position(2, 2));
        expect(bishopMove).not.toBeTruthy();
        expect(bishopWhite.hasMoved).not.toBeTruthy();

      });

      it('Should test if the en passant move played is updated correctly', () => {

        const enPassantMove = originalBoard.playMove(true, true, pawnWhite, new Position(0, 5))

        expect(pawnWhite.position).toEqual(new Position(0, 5));
        expect(enPassantMove).toBeTruthy();
        expect(originalBoard.pieces).not.toContain(pawnBlack);

      });

    })

    describe('castling tests', () => {
      let originalBoard: Board;
      let pieces: Piece[] = []
      let rookWhite: Piece
      let kingWhite: Piece

      beforeEach(() => {
        rookWhite = new Piece(new Position(7, 0), PieceType.ROOK, TeamType.WHITE, false)
        kingWhite = new Piece(new Position(4, 0), PieceType.KING, TeamType.WHITE, false)

        pieces.push(rookWhite, kingWhite)


        originalBoard = new Board(pieces, 1)
      })

      afterEach(() => {
        originalBoard = [] as any as Board
      })

      it('Should test if the castling move played is updated correctly', () => {

        const castlingMove = originalBoard.playMove(false, true, kingWhite, new Position(7, 0))

        expect(kingWhite.position).toEqual(new Position(6, 0));
        expect(castlingMove).toBeTruthy();
        expect(kingWhite.hasMoved).toBeTruthy();
        expect(rookWhite.position).toEqual(new Position(5, 0));

      });
    })

  })
})