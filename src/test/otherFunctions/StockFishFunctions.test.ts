import { Piece } from "../../models/Piece";
import { Position } from "../../models/Position";
import { bestMoveConverted, convertToPosition, isBotCastling, pieceRanking, pieceTypeConversor, sortBestMovesByScore } from "../../otherFunctions/StockFishFunctions";
import { PieceType, TeamType } from "../../Types";


// Mock das classes e objetos
class MockPiece extends Piece {
  constructor(position: Position, type: PieceType, team: TeamType) {
    super(position, type, team, false); // hasMoved = false
  }
}

// Testes para convertToPosition
describe("convertToPosition", () => {
  it("Deve converter um movimento padrão para posições corretas", () => {
    const result = convertToPosition("e2e4");
    expect(result).toEqual({
      from: new Position(4, 1),
      to: new Position(4, 3),
      isPromotion: false,
      promotionPiece: ""
    });
  });

  it("Deve reconhecer uma promoção e identificar a peça correta", () => {
    const result = convertToPosition("e7e8q");
    expect(result).toEqual({
      from: new Position(4, 6),
      to: new Position(4, 7),
      isPromotion: true,
      promotionPiece: "q"
    });
  });
});

// Testes para sortBestMovesByScore
describe("sortBestMovesByScore", () => {
  it("Deve ordenar os melhores movimentos por pontuação", () => {
    const moves: bestMoveConverted[] = [
      { move: { from: new Position(0, 0), to: new Position(0, 1) }, score: 20 },
      { move: { from: new Position(1, 1), to: new Position(2, 2) }, score: 30 },
      { move: { from: new Position(3, 3), to: new Position(4, 4) }, score: 10 },
    ];

    const sortedMoves = sortBestMovesByScore(moves);
    expect(sortedMoves[0].score).toBe(30);
    expect(sortedMoves[1].score).toBe(20);
    expect(sortedMoves[2].score).toBe(10);
  });
});

// Testes para pieceRanking
describe("pieceRanking", () => {
  it("Deve retornar a pontuação correta para uma rainha", () => {
    const queen = new MockPiece(new Position(0, 0), PieceType.QUEEN, TeamType.WHITE);
    expect(pieceRanking(queen)).toBe(9);
  });

  it("Deve retornar zero para uma peça inválida", () => {
    const invalidPiece = new MockPiece(new Position(0, 0), "INVALID" as PieceType, TeamType.WHITE);
    expect(pieceRanking(invalidPiece)).toBe(0);
  });
});

// Testes para pieceTypeConversor
describe("pieceTypeConversor", () => {
  it("Deve converter a rainha para 'q'", () => {
    expect(pieceTypeConversor(PieceType.QUEEN)).toBe("q");
  });

  it("Deve retornar 'error' para uma peça inválida", () => {
    expect(pieceTypeConversor("INVALID" as PieceType)).toBe("error");
  });
});

// Testes para isBotCastling
describe("isBotCastling", () => {
  it("Deve identificar um roque curto para as brancas", () => {
    const king = new MockPiece(new Position(4, 7), PieceType.KING, TeamType.WHITE);
    const move = { move: { from: new Position(4, 7), to: new Position(6, 7) }, score: 0 };
    expect(isBotCastling(king, move)).toEqual(new Position(7, 7));
  });

  it("Deve retornar a posição original se não for um roque", () => {
    const king = new MockPiece(new Position(4, 7), PieceType.KING, TeamType.WHITE);
    const move = { move: { from: new Position(4, 7), to: new Position(5, 5) }, score: 0 };
    expect(isBotCastling(king, move)).toEqual(new Position(5, 5));
  });
});
