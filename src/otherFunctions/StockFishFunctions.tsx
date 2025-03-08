
import { Piece, Position } from "../models";
import { Board } from "../models/Board";
import { tileIsEmptyOrOccupiedByOpponent } from "../referee/rules/GeneralRules";
import { PieceType } from "../Types";

export function convertToPosition(stockFishMove: string): convertedMove {
  const xLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  let isPromotion = false;
  let promotionPiece = '';
  let moveArray: string[] = [];

  if (stockFishMove.length > 4) {
    isPromotion = true;
    promotionPiece = stockFishMove[4];
    moveArray = stockFishMove.slice(0, 4).split('');
  } else {
    moveArray = stockFishMove.split('');
  }



  let initialX: number = -1
  let destinationX: number = -1
  let initialY: number = parseInt(moveArray[1], 10) - 1;
  let destinationY: number = parseInt(moveArray[3], 10) - 1;

  xLetters.forEach((letter, index) => {
    if (letter === moveArray[0]) {
      initialX = index
    }
    if (letter === moveArray[2]) {
      destinationX = index
    }
  })
  return { from: new Position(initialX, initialY), to: new Position(destinationX, destinationY), isPromotion: isPromotion, promotionPiece: promotionPiece }
}

export function sortBestMovesByScore(moves: bestMoveConverted[]): bestMoveConverted[] {
  return moves.sort((a, b) => b.score - a.score);
}


export function pieceRanking(piece: Piece): number {
  if (piece.isPawn) {
    return 1
  } else if (piece.isKnight || piece.isBishop) {
    return 3
  } else if (piece.isRook) {
    return 5
  } else if (piece.isQueen) {
    return 9
  } else {
    return 0
  }
}

//fazer função para calcular o movimento mais agressivo com captura
export function isAgressiveMove(initialPosition: Position, destinationPosition: Position, currentBoard: Board, score: number): boolean {
  let initialPieceRank: number = 0
  let destinationPieceRank: number = 0

  let initialPiece: Piece | null = null

  if (!tileIsEmptyOrOccupiedByOpponent(destinationPosition, currentBoard.pieces, currentBoard.currentTeam)) return false

  if (score <= 0) return false

  currentBoard.pieces.forEach((piece) => {
    if (piece.position.samePosition(initialPosition)) {
      initialPieceRank = pieceRanking(piece)
      initialPiece = piece
    }
    if (piece.position.samePosition(destinationPosition)) {
      destinationPieceRank = pieceRanking(piece)

    }
  })

  if (initialPieceRank === 0 || destinationPieceRank === 0) return false

  if (destinationPieceRank > initialPieceRank) {
    const simulatedBoard = currentBoard.clone()

    simulatedBoard.pieces = simulatedBoard.pieces.filter(
      (p) => !p.samePosition(destinationPosition) || !p.samePosition(initialPosition)
    );

    if (initialPiece) {
      const initialPieceClone = (initialPiece as Piece).clone()
      initialPieceClone.position = destinationPosition
      simulatedBoard.pieces.push(initialPieceClone)
    }

    //loops through pieces of enemy team
    for (const enemy of simulatedBoard.pieces.filter(
      (p) => p.team !== simulatedBoard.currentTeam
    )) {


      //get enemys possible moves to calculate danger and checks
      enemy.possibleMoves = simulatedBoard.getValidMoves(
        enemy,
        simulatedBoard.pieces
      );

      if (
        enemy.possibleMoves.some((m) =>
          m.samePosition(destinationPosition)
        )
      ) {
        return true
      }
    }
  }

  return false
}

export function isBotCastling(piece: Piece, movePlayed: bestMoveConverted): Position {

  if (!piece.isKing) return movePlayed.move.to


  if (movePlayed.move.from.samePosition(new Position(4, 7)) && movePlayed.move.to.samePosition(new Position(6, 7))) {
    return new Position(7, 7)
  }
  if (movePlayed.move.from.samePosition(new Position(4, 7)) && movePlayed.move.to.samePosition(new Position(1, 7))) {
    return new Position(0, 7)
  }
  if (movePlayed.move.from.samePosition(new Position(4, 0)) && movePlayed.move.to.samePosition(new Position(6, 7))) {
    return new Position(7, 0)
  }
  if (movePlayed.move.from.samePosition(new Position(4, 0)) && movePlayed.move.to.samePosition(new Position(1, 7))) {
    return new Position(0, 0)
  }

  return movePlayed.move.to
}

export function pieceTypeConversor(pieceType: PieceType) {
  switch (pieceType) {
    case "queen":
      return "q"
      break;
    case "rook":
      return 'r'
      break
    case "bishop":
      return "b"
    case "knight":
      return 'n'
    default:
      return 'error'
      break;
  }
}

interface convertedMove {
  from: Position,
  to: Position,
  isPromotion?: boolean,
  promotionPiece?: string
}

export interface bestMoveConverted {
  move: convertedMove,
  score: number
}