import { PieceType, TeamType } from "../../Types";
import { Piece, Position } from "../../models";


describe('Piece Class Tests', () => {
  describe('Tests of the gets of the class', () => {
    let position: Position
    beforeEach(() => {
      position = new Position(1, 1);

    })


    it('should correctly identify a Pawn', () => {
      let pawn = new Piece(position, PieceType.PAWN, TeamType.WHITE, false);
      expect(pawn.isPawn).toBe(true);
      expect(pawn.isRook).toBe(false);
      expect(pawn.isKnight).toBe(false);
      expect(pawn.isBishop).toBe(false);
      expect(pawn.isKing).toBe(false);
      expect(pawn.isQueen).toBe(false);

    });

    it('should correctly identify a Rook', () => {
      let rook = new Piece(position, PieceType.ROOK, TeamType.BLACK, false);
      expect(rook.isRook).toBe(true);
      expect(rook.isPawn).toBe(false);
      expect(rook.isKnight).toBe(false);
      expect(rook.isBishop).toBe(false);
      expect(rook.isKing).toBe(false);
      expect(rook.isQueen).toBe(false);

    });
    it('should correctly identify a Knight', () => {
      let knight = new Piece(position, PieceType.KNIGHT, TeamType.WHITE, false);
      expect(knight.isRook).toBe(false);
      expect(knight.isPawn).toBe(false);
      expect(knight.isKnight).toBe(true);
      expect(knight.isBishop).toBe(false);
      expect(knight.isKing).toBe(false);
      expect(knight.isQueen).toBe(false);

    });
    it('should correctly identify a Bishop', () => {
      let bishop = new Piece(position, PieceType.BISHOP, TeamType.BLACK, false);
      expect(bishop.isRook).toBe(false);
      expect(bishop.isPawn).toBe(false);
      expect(bishop.isKnight).toBe(false);
      expect(bishop.isBishop).toBe(true);
      expect(bishop.isKing).toBe(false);
      expect(bishop.isQueen).toBe(false);

    });
    it('should correctly identify a King', () => {
      let king = new Piece(position, PieceType.KING, TeamType.WHITE, false);
      expect(king.isRook).toBe(false);
      expect(king.isPawn).toBe(false);
      expect(king.isKnight).toBe(false);
      expect(king.isBishop).toBe(false);
      expect(king.isKing).toBe(true);
      expect(king.isQueen).toBe(false);

    });
    it('should correctly identify a Queen', () => {
      let queen = new Piece(position, PieceType.QUEEN, TeamType.BLACK, false);
      expect(queen.isRook).toBe(false);
      expect(queen.isPawn).toBe(false);
      expect(queen.isKnight).toBe(false);
      expect(queen.isBishop).toBe(false);
      expect(queen.isKing).toBe(false);
      expect(queen.isQueen).toBe(true);

    });
  })


  describe("samePiecePosition method of Piece class tests", () => {
    let piece: Piece
    let position: Position
    beforeEach(() => {
      position = new Position(2, 2)
      piece = new Piece(position, PieceType.KNIGHT, TeamType.WHITE, false)
    })
    it("Should return true for a same piece position", () => {
      const passedPiecePosition = new Piece(new Position(2, 2), PieceType.ROOK, TeamType.BLACK, false)

      const samePiecePosition = piece.samePiecePosition(passedPiecePosition)

      expect(samePiecePosition).toBeTruthy()
    })
    it("Should return false for a diferent x and y", () => {
      const passedPiecePosition = new Piece(new Position(0, 3), PieceType.ROOK, TeamType.BLACK, false)

      const samePiecePosition = piece.samePiecePosition(passedPiecePosition)

      expect(samePiecePosition).not.toBeTruthy()
    })
    it("Should return false for a diferent x", () => {
      const passedPiecePosition = new Piece(new Position(0, 2), PieceType.ROOK, TeamType.BLACK, false)

      const samePiecePosition = piece.samePiecePosition(passedPiecePosition)

      expect(samePiecePosition).not.toBeTruthy()
    })
    it("Should return false for a diferent y", () => {
      const passedPiecePosition = new Piece(new Position(2, 3), PieceType.ROOK, TeamType.BLACK, false)

      const samePiecePosition = piece.samePiecePosition(passedPiecePosition)

      expect(samePiecePosition).not.toBeTruthy()
    })
    it("Should return true for a same object passed", () => {


      const samePiecePosition = piece.samePiecePosition(piece)

      expect(samePiecePosition).toBeTruthy()
    })
    it("Should throw an error for null", () => {
      expect(() => {
        piece.samePiecePosition(null as any);
      }).toThrow();
    });
  })


  describe("samePosition method of Piece class tests", () => {
    let piece: Piece
    let position: Position
    beforeEach(() => {
      position = new Position(2, 2)
      piece = new Piece(position, PieceType.KNIGHT, TeamType.WHITE, false)
    })
    it("Should return true for a same position", () => {
      const passedPosition = {
        x: 2, y: 2
      }

      const samePosition = piece.samePosition(passedPosition as Position)

      expect(samePosition).toBeTruthy()
    })
    it("Should return false for a diferent x and y", () => {
      const passedPosition = {
        x: 0, y: 3
      }

      const samePosition = piece.samePosition(passedPosition as Position)

      expect(samePosition).not.toBeTruthy()
    })
    it("Should return false for a diferent x", () => {
      const passedPosition = {
        x: 0, y: 2
      }

      const samePosition = piece.samePosition(passedPosition as Position)

      expect(samePosition).not.toBeTruthy()
    })
    it("Should return false for a diferent y", () => {
      const passedPosition = {
        x: 2, y: 3
      }

      const samePosition = piece.samePosition(passedPosition as Position)

      expect(samePosition).not.toBeTruthy()
    })
    it("Should return true for a same object passed", () => {


      const samePosition = piece.samePosition(position)

      expect(samePosition).toBeTruthy()
    })
    it("Should throw an error for null", () => {
      expect(() => {
        piece.samePosition(null as any);
      }).toThrow();
    });
  })

  describe('clone method of Pawn class tests', () => {
    let originalPosition: Position
    let originalPossibleMoves: Position[]
    let originalPiece: Piece

    beforeEach(() => {
      originalPosition = new Position(2, 2)
      originalPossibleMoves = [new Position(3, 2)]
      originalPiece = new Piece(originalPosition, PieceType.BISHOP, TeamType.WHITE, false, originalPossibleMoves)
    })
    it('should create a clone with the same x and y values of Position', () => {

      const clonedPosition = originalPiece.clone();

      expect(clonedPosition.position.x).toBe(originalPiece.position.x);
      expect(clonedPosition.position.y).toBe(originalPiece.position.y);
    });

    it('should not be the same instance as the original', () => {

      const clonedPosition = originalPiece.clone();
      expect(clonedPosition).not.toBe(originalPiece);
    });

    it('should not affect the original piece when the position of the clone is modified', () => {

      const clonedPosition = originalPiece.clone();
      clonedPosition.position.x = 7;

      expect(originalPiece.position.x).toBe(2);
    });
    it('should not affect the original piece when the possible moves of the clone is modified', () => {

      const clonedPosition = originalPiece.clone();
      clonedPosition.possibleMoves?.push({ x: 3, y: 3 } as Position)
      expect(originalPiece.possibleMoves).not.toContain({ x: 3, y: 3 });
    });
  });
});

