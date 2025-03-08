import { Board } from "../../models/Board";
import { Pawn } from "../../models/Pawn";
import { Position } from "../../models/Position";
import { PieceType, TeamType } from "../../Types";
import { isEnPassantMove } from "../../utils/moveUtils";

describe("isEnPassantMove", () => {
    let board: Board;

    beforeEach(() => {
        // Cria um tabuleiro vazio para cada teste
        board = new Board([], 1);
    });

    it("Deve retornar true para um movimento válido de en passant para as brancas", () => {
        const pawn = new Pawn(new Position(4, 4), TeamType.WHITE, false); // Não se moveu ainda
        const enemyPawn = new Pawn(new Position(5, 4), TeamType.BLACK, true, true); // Disponível para en passant
        board.pieces.push(pawn, enemyPawn);

        const result = isEnPassantMove(
            pawn.position,
            new Position(5, 5),
            PieceType.PAWN,
            TeamType.WHITE,
            board
        );

        expect(result).toBe(true);
    });

    it("Deve retornar true para um movimento válido de en passant para as pretas", () => {
        const pawn = new Pawn(new Position(4, 3), TeamType.BLACK, false);
        const enemyPawn = new Pawn(new Position(3, 3), TeamType.WHITE, true, true); // En Passant ativado
        board.pieces.push(pawn, enemyPawn);

        const result = isEnPassantMove(
            pawn.position,
            new Position(3, 2),
            PieceType.PAWN,
            TeamType.BLACK,
            board
        );

        expect(result).toBe(true);
    });

    it("Deve retornar false se não houver um peão disponível para en passant", () => {
        const pawn = new Pawn(new Position(4, 4), TeamType.WHITE, false);
        const enemyPawn = new Pawn(new Position(5, 4), TeamType.BLACK, true, false); // En Passant desativado
        board.pieces.push(pawn, enemyPawn);

        const result = isEnPassantMove(
            pawn.position,
            new Position(5, 5),
            PieceType.PAWN,
            TeamType.WHITE,
            board
        );

        expect(result).toBe(false);
    });

    it("Deve retornar false se não for um peão tentando o movimento", () => {
        const enemyPawn = new Pawn(new Position(5, 4), TeamType.BLACK, true, true); // En Passant ativado
        board.pieces.push(enemyPawn);

        const result = isEnPassantMove(
            new Position(4, 4),
            new Position(5, 5),
            PieceType.KNIGHT, // Cavalo tentando fazer en passant (inválido)
            TeamType.WHITE,
            board
        );

        expect(result).toBe(false);
    });

    it("Deve retornar false para um movimento inválido mesmo com en passant disponível", () => {
        const pawn = new Pawn(new Position(4, 4), TeamType.WHITE, false);
        const enemyPawn = new Pawn(new Position(5, 4), TeamType.BLACK, true, true); // En Passant ativado
        board.pieces.push(pawn, enemyPawn);

        const result = isEnPassantMove(
            pawn.position,
            new Position(6, 5), // Movimento inválido para en passant
            PieceType.PAWN,
            TeamType.WHITE,
            board
        );

        expect(result).toBe(false);
    });
});
