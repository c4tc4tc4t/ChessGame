import { Chess } from "chess.js";
import { Board } from "../../models/Board";
import { Piece } from "../../models/Piece";
import { Position } from "../../models/Position";
import { fakeBoardSetup, insufficientMaterialDraw, restartGame, threefoldRepetitionDraw } from "../../utils/boardUtils";
import { PieceType, TeamType } from "../../Types";


// Mock do setState para simular atualização de estados
const mockSetFenSend = jest.fn();
const mockSetBoard = jest.fn();
const mockSetGameOverModalVisible = jest.fn();

// Cria uma instância do Chess para simular o fakeBoard
const fakeBoard = new Chess();

// Mock do tabuleiro inicial
const initialBoard = new Board([], 1);

// Dados de exemplo para testes
const mockPiece = new Piece(new Position(0, 1), PieceType.PAWN, TeamType.WHITE, true);
const destination = new Position(0, 3);


describe("fakeBoardSetup", () => {
  it("Deve atualizar o FEN corretamente em um lance normal", () => {
    fakeBoardSetup(mockPiece, destination, initialBoard, fakeBoard, mockSetFenSend);

    expect(mockSetFenSend).toHaveBeenCalledWith(fakeBoard.fen());
  });

  it("Deve atualizar o FEN corretamente para uma promoção", () => {
    const customFen = "8/P7/8/8/8/8/8/K6k w - - 0 1"; // Peão branco e ambos os Reis
    fakeBoard.load(customFen);

    const pawn = new Piece(new Position(0, 6), PieceType.PAWN, TeamType.WHITE, false);
    const destination = new Position(0, 7); // Movimento para a fileira de promoção

    const boardWithPawn = new Board([pawn], 1);

    fakeBoardSetup(pawn, destination, boardWithPawn, fakeBoard, mockSetFenSend, "q");

    expect(mockSetFenSend).toHaveBeenCalledWith(fakeBoard.fen());
});




  it("Deve atualizar o FEN corretamente para um roque", () => {
    // Posição de tabuleiro com apenas Rei e Torre para Roque curto
    const customFen = "4k2r/8/8/8/8/8/8/R3K3 w KQ - 0 1";

    fakeBoard.load(customFen); // Define manualmente a posição do tabuleiro para o teste

    const king = new Piece(new Position(4, 0), PieceType.KING, TeamType.WHITE, false);
    const rook = new Piece(new Position(7, 0), PieceType.ROOK, TeamType.WHITE, false);

    const boardWithKingRook = new Board([king, rook], 1);

    // Simula o Roque
    fakeBoardSetup(king, new Position(6, 0), boardWithKingRook, fakeBoard, mockSetFenSend);

    expect(mockSetFenSend).toHaveBeenCalledWith(fakeBoard.fen());
});


});


describe("threefoldRepetitionDraw", () => {
    it("Deve retornar verdadeiro quando há empate por repetição", () => {
        const boardState1 = [
            new Piece(new Position(0, 1), PieceType.PAWN, TeamType.WHITE, true)
        ];
        const boardState2 = [
            new Piece(new Position(0, 1), PieceType.PAWN, TeamType.WHITE, true)
        ];
        const boardState3 = [
            new Piece(new Position(0, 1), PieceType.PAWN, TeamType.WHITE, true)
        ];
    
        const mockHistoric = [boardState1, boardState2, boardState3];
    
        expect(threefoldRepetitionDraw(initialBoard, mockHistoric)).toBe(true);
    });
    

  it("Deve retornar falso quando não há empate por repetição", () => {
    const mockHistoric = [
      [mockPiece],
      [],
      [new Piece(new Position(1, 1), PieceType.BISHOP, TeamType.WHITE, true)]
    ];

    expect(threefoldRepetitionDraw(initialBoard, mockHistoric)).toBe(false);
  });
});


describe("insufficientMaterialDraw", () => {
  it("Deve retornar verdadeiro quando houver apenas dois reis", () => {
    const minimalBoard = new Board([
      new Piece(new Position(4, 0), PieceType.KING, TeamType.WHITE, true),
      new Piece(new Position(4, 7), PieceType.KING, TeamType.BLACK, true)
    ], 1);

    expect(insufficientMaterialDraw(minimalBoard)).toBe(true);
  });

  it("Deve retornar falso quando houver material suficiente", () => {
    const fullBoard = new Board([
      new Piece(new Position(4, 0), PieceType.KING, TeamType.WHITE, true),
      new Piece(new Position(4, 7), PieceType.KING, TeamType.BLACK, true),
      new Piece(new Position(2, 1), PieceType.ROOK, TeamType.WHITE, true)
    ], 1);

    expect(insufficientMaterialDraw(fullBoard)).toBe(false);
  });
});


describe("restartGame", () => {
  it("Deve resetar o jogo corretamente", () => {
    restartGame(fakeBoard, mockSetGameOverModalVisible, mockSetBoard, initialBoard);

    expect(mockSetGameOverModalVisible).toHaveBeenCalledWith(false);
    expect(mockSetBoard).toHaveBeenCalledWith(initialBoard.clone());
  });
});
