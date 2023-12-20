import { PieceType, TeamType } from "../../../Types";
import { Piece, Position } from "../../../models";
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from "../../../referee/rules/GeneralRules";

describe("General Rules Test", () => {
  describe("Tests the function TileIsOccupied", () => {
    let board: Piece[] = [];
    beforeEach(() => {
      const pawnWhiteOne: Piece = new Piece(
        new Position(3, 3),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const pawnWhiteTwo: Piece = new Piece(
        new Position(0, 4),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      const pawnWhiteTree: Piece = new Piece(
        new Position(0, 0),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );

      const rookWhite: Piece = new Piece(
        new Position(5, 1),
        PieceType.ROOK,
        TeamType.WHITE,
        false
      );

      const pawnBlackOne: Piece = new Piece(
        new Position(4, 4),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      const pawnBlackTwo: Piece = new Piece(
        new Position(0, 5),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      const pawnBlackTree: Piece = new Piece(
        new Position(7, 7),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );

      const rookBlack: Piece = new Piece(
        new Position(1, 5),
        PieceType.ROOK,
        TeamType.BLACK,
        false
      );
      board.push(
        pawnWhiteOne,
        pawnWhiteTwo,
        pawnWhiteTree,
        rookWhite,
        pawnBlackOne,
        pawnBlackTwo,
        pawnBlackTree,
        rookBlack
      );
    });
    it("Should test if the occupied tile return true", () => {
      const tileOccupied = tileIsOccupied(new Position(3, 3), board);

      //Verifica se tileOccupied é true
      expect(tileOccupied).toBe(true);
    });

    it("Should test if the empty tile return false", () => {
      const tileEmpty = tileIsOccupied(new Position(2, 2), board);

      //Verifica se tileEmpty é false
      expect(tileEmpty).toBe(false);
    });

    it("Should test if the occupied tile on the corner return true", () => {
      const tileOccupied = tileIsOccupied(new Position(0, 4), board);

      //Verifica se tileOccupied é true
      expect(tileOccupied).toBe(true);
    });
  });

  describe("Test the function tileIsOccupiedByOpponent", () => {
    it("Should test if the empty file on a empty board return false", () => {
      const board: Piece[] = [];
      const tileEmpty = tileIsOccupiedByOpponent(
        new Position(3, 3),
        board,
        TeamType.WHITE
      );

      //Verifica se tileEmpty é false
      expect(tileEmpty).toBe(false);
    });

    it("Should test if the tile containing an ally return false", () => {
      const board: Piece[] = [];
      const pawnAlly: Piece = new Piece(
        new Position(3, 3),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      board.push(pawnAlly);
      const tileOccupiedByAlly = tileIsOccupiedByOpponent(
        new Position(3, 3),
        board,
        TeamType.WHITE
      );

      //Verifica se tileOccupiedByAlly é false
      expect(tileOccupiedByAlly).toBe(false);
    });

    it("Should test if the tile containing an enemy return true", () => {
      const board: Piece[] = [];
      const pawnEnemy: Piece = new Piece(
        new Position(3, 3),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      board.push(pawnEnemy);
      const tileOccupiedByOpponent = tileIsOccupiedByOpponent(
        new Position(3, 3),
        board,
        TeamType.WHITE
      );

      //Verifica se tileOccupiedByOpponent é true
      expect(tileOccupiedByOpponent).toBe(true);
    });
    it("Should test if a tile outside of the board return false", () => {
      const board: Piece[] = [];
      const tileOutside = tileIsOccupiedByOpponent(
        new Position(-1, 9),
        board,
        TeamType.WHITE
      );

      //Verifica se tileOutside é false
      expect(tileOutside).toBe(false);
    });
  });
  describe("Test the function tileIsEmptyOrOccupiedByOpponent", () => {
    it("Should tet if a empty tile return true", () => {
      const board: Piece[] = [];
      const emptyTile = tileIsEmptyOrOccupiedByOpponent(
        new Position(3, 3),
        board,
        TeamType.WHITE
      );

      //Verifica se emptyTile é true
      expect(emptyTile).toBe(true);
    });

    it("Should test if the tile containing an ally return false", () => {
      const board: Piece[] = [];
      const pawnAlly: Piece = new Piece(
        new Position(3, 3),
        PieceType.PAWN,
        TeamType.WHITE,
        false
      );
      board.push(pawnAlly);
      const tileOccupiedByAlly = tileIsEmptyOrOccupiedByOpponent(
        new Position(3, 3),
        board,
        TeamType.WHITE
      );

      //Verifica se tileOccupiedByAlly é false
      expect(tileOccupiedByAlly).toBe(false);
    });

    it("Should test if the tile containing an enemy return true", () => {
      const board: Piece[] = [];
      const pawnEnemy: Piece = new Piece(
        new Position(3, 3),
        PieceType.PAWN,
        TeamType.BLACK,
        false
      );
      board.push(pawnEnemy);
      const tileOccupiedByOpponent = tileIsEmptyOrOccupiedByOpponent(
        new Position(3, 3),
        board,
        TeamType.WHITE
      );

      //Verifica se tileOccupiedByOpponent é true
      expect(tileOccupiedByOpponent).toBe(true);
    });
  });
});
