import { Chess } from "chess.js";
import { Board } from "../models/Board";
import { Piece } from "../models/Piece";
import { Position } from "../models/Position";
import { SetStateAction } from "react";


  export function fakeBoardSetup(playedPiece: Piece, destination: Position, board: Board, fakeBoard: Chess, setFenSend: any, promotionPiece?: string) {
    const from: string = playedPiece.position.positionConvert()
    const to: string = destination.positionConvert()
    // const isPromotion: 

    const destinationPiece = board.pieces.find((p) =>
      p.samePosition(destination)
    );

    //checa se o movimento jogado é um movimento de roque valido
    if (
      !playedPiece.hasMoved && !destinationPiece?.hasMoved &&
      playedPiece.isKing &&
      destinationPiece?.isRook &&
      destinationPiece.team === playedPiece.team
    ) {
      if (destination.x === 0) {
        fakeBoard.move('O-O-O')
      } else {
        fakeBoard.move('O-O')

      }
    } else {

      if (promotionPiece) {
        console.log('entrou aqui')
        fakeBoard.move({ from: from, to: to, promotion: promotionPiece })
      } else {

        fakeBoard.move({ from: from, to: to })
      }
    }


    const newFen = fakeBoard.fen()
    setFenSend(newFen)
    console.log(fakeBoard.ascii())
  }

    //função que checa se o movimento jogado é um empate por repetição
    export function threefoldRepetitionDraw(board: Board, boardStateHistoric: Piece[][]): boolean {
      const serializedStates = boardStateHistoric.map(state =>
          state.map(piece => ({
              type: piece.type,
              team: piece.team,
              position: `${piece.position.x},${piece.position.y}`
          }))
      );
  
      const occurrences = serializedStates.filter(
          state => JSON.stringify(state) === JSON.stringify(serializedStates[serializedStates.length - 1])
      ).length;
  
      return occurrences >= 3;
  }
  

    //função que checa se é um empate por material insuficiente
export function insufficientMaterialDraw(board: Board): boolean {
        //pega a quantidade de peças no tabuleiro
        const pieceQuantity: number = board.pieces.length
        let containBishopOrKnight: boolean = false;
    
        //checa se tem algum cavalo ou bispo sobrando no tabuleiro
        board.pieces.forEach((piece) => {
          if (piece.isBishop || piece.isKnight) containBishopOrKnight = true
        })
        //se tem apenas 2 peças sobrando, significa que sobraram apenas reis, então é um empate
        if (pieceQuantity <= 2) {
          return true
          //Se tem 3 peças sobrando e uma delas é um cavalo ou um bispo, então é um empate
        } else if (pieceQuantity <= 3 && containBishopOrKnight) {
          return true
        }
        return false
      }

export function restartGame(fakeBoard: Chess, setGameOverModalVisible: (value: SetStateAction<boolean>) => void, setBoard: (value: SetStateAction<Board>) => void, initialBoard: Board) {
    setGameOverModalVisible(false);
    fakeBoard.reset()
    setBoard(initialBoard.clone());
  }

      