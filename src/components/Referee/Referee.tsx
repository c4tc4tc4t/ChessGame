import { useCallback, useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
import Chessboard from "../chessboard/Chessboard";
import { Piece, Position } from "../../models";
import { PieceType, TeamType, WinningTeamType } from "../../Types";
import { Pawn } from "../../models/Pawn";
import { Board } from "../../models/Board";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./Referee.css";
import { useGame } from "../../customHooks/useGame";
import { bestMoveStockFish, stockFishRequest } from "../../otherFunctions/APIRequest";
import { bestMoveConverted, convertToPosition, isAgressiveMove, isBotCastling, pieceTypeConversor, sortBestMovesByScore } from "../../otherFunctions/StockFishFunctions";
import { fakeBoardSetup, insufficientMaterialDraw, restartGame, threefoldRepetitionDraw } from "../../utils/boardUtils";
import { isEnPassantMove } from "../../utils/moveUtils";

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [boardStateHistoric, setBoardStateHistoric] = useState<Piece[][]>([]);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [promotionPieceFinal, setPromotionPieceFinal] = useState<string | null>(null);
  const [pieceCaptured, setPieceCaptured] = useState<boolean>();
  const [gameOverModalVisible, setGameOverModalVisible] =
    useState<boolean>(false);
  const [fenSend, setFenSend] = useState<string>('');

  const [pendingMove, setPendingMove] = useState<{
    playedPiece: Piece;
    destination: Position;
  } | null>(null);
  const [promotionCompleted, setPromotionCompleted] = useState<boolean>(false);



  const modalRef = useRef<HTMLDivElement>(null);

  const checkMateModalRef = useRef<HTMLDivElement>(null);

  const [fiftyMovesDrawRuleCount, setFiftyMovesDrawRuleCount] = useState<number>(0)

  const { fakeBoard } = useGame();

  const setFiftyMovesDrawCallback = useCallback(() => {
    setBoard((prevBoard) => {

      const newBoard = new Board([...prevBoard.pieces], prevBoard.totalTurns);
      newBoard.winningTeam = WinningTeamType.DRAW;

      return newBoard;
    });
    setGameOverModalVisible(true);
    setFiftyMovesDrawRuleCount(0);
  }, []);

  // Atualiza o estado quando um peão precisa ser promovido
  useEffect(() => {
    if (promotionPawn && promotionPieceFinal) {
      console.log("🔥 promotionPawn atualizado, chamando promotePawn()");

      switch (promotionPieceFinal.toLowerCase()) {
        case "q":
          console.log("🎯 Promovendo para rainha");
          promotePawn(PieceType.QUEEN);
          break;
        case "r":
          console.log("🎯 Promovendo para torre");
          promotePawn(PieceType.ROOK);
          break;
        case "b":
          console.log("🎯 Promovendo para bispo");
          promotePawn(PieceType.BISHOP);
          break;
        case "n":
          console.log("🎯 Promovendo para cavalo");
          promotePawn(PieceType.KNIGHT);
          break;
        default:
          console.warn("⚠️ Peça de promoção desconhecida, promovendo para rainha.");
          promotePawn(PieceType.QUEEN);
          break;
      }
    }
  }, [promotionPawn, promotionPieceFinal]); // Executa sempre que `promotionPawn` ou `promotionPiece` forem atualizados




  useEffect(() => {
    if (fiftyMovesDrawRuleCount >= 100) {
      setFiftyMovesDrawCallback();
    }
  }, [fiftyMovesDrawRuleCount, setFiftyMovesDrawCallback]);


  useEffect(() => {
    //se 100 movimentos forem jogados, 50 por cada equipe é um empate
    if (fiftyMovesDrawRuleCount >= 100) {
      board.winningTeam = WinningTeamType.DRAW
      setGameOverModalVisible(true)
      setFiftyMovesDrawRuleCount(0)
    }
  }, [fiftyMovesDrawRuleCount]);

  useEffect(() => {
    const isDrawByrepetition: boolean = threefoldRepetitionDraw(board, boardStateHistoric)

    const isinsufficientMaterialDraw = insufficientMaterialDraw(board);

    //se é um empate por repetição ou por insuficiência material, mostra o modal de empate
    if (isDrawByrepetition || isinsufficientMaterialDraw) {
      board.winningTeam = WinningTeamType.DRAW
      setGameOverModalVisible(true)
    }

    if (board.totalTurns !== 1) setBoardStateHistoric([...boardStateHistoric, board.pieces]);

    // const FENReturn: string = stockFishRequest(FENSend)

  }, [board])

  useEffect(() => {
    const fetchData = async () => {
      if (board.currentTeam === TeamType.BLACK || promotionCompleted) {
        const bestMovesStockFish: bestMoveStockFish[] = await stockFishRequest(fenSend);

        let bestMovesConverted: bestMoveConverted[] = bestMovesStockFish.map(stockFishMove => ({
          move: convertToPosition(stockFishMove.move),
          score: stockFishMove.score
        }));

        bestMovesConverted = sortBestMovesByScore(bestMovesConverted);
        let agressiveMove: boolean = false;
        let movePlayed: bestMoveConverted | null = null;

        bestMovesConverted.forEach((bestMove, index) => {
          agressiveMove = isAgressiveMove(bestMove.move.from, bestMove.move.to, board, bestMove.score);

          if (agressiveMove || index === 0) {
            movePlayed = bestMove;
          }
        });

        board.pieces.forEach((piece) => {
          if (piece.position.samePosition(movePlayed!.move.from)) {
            let botMove = isBotCastling(piece, movePlayed!);
            if (movePlayed?.move.isPromotion) {
              playMoveValidation(piece, botMove, movePlayed?.move.promotionPiece);
            } else {
              playMoveValidation(piece, botMove);
            }
          }
        });

        // Resetar o estado após a promoção ser concluída e a API ter sido chamada
        setPromotionCompleted(false);
      }
    };

    fetchData();
  }, [board.totalTurns, promotionCompleted]); // Agora espera a promoção estar concluída



  interface CustomHeaderProps {
    title: string;
  }

  const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
  );

  function playMoveValidation(
    playedPiece: Piece,
    destination: Position,
    promotionPiece?: string
  ): boolean {
    //checa se a peça tem movimentos possiveis, se não, significa que todos os movimentos são invalidos
    if (playedPiece.possibleMoves === undefined) return false;
    //checak se é turno das brancas ou das pretas, assim apenas o time da vez pode mover
    if (playedPiece.team === TeamType.WHITE && board.totalTurns % 2 !== 1)
      return false;
    if (playedPiece.team === TeamType.BLACK && board.totalTurns % 2 !== 0)
      return false;

    let playedMoveIsValid = false;

    //checa se o movimento jogado está dentro do array possibleMoves
    const validMove = playedPiece.possibleMoves?.some((m) =>
      m.samePosition(destination)
    );

    //se validMove é false, significa que o movimento jogado não era possivel
    if (!validMove) return false;

    //checa se o movimento jogado é um movimento enPassant
    const enPassantMove: boolean = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team,
      board
    );

    //checa a linha para promoção da peça
    let promotionRow = playedPiece.team === TeamType.WHITE ? 7 : 0;

    if (promotionPiece) {
      fakeBoardSetup(playedPiece, destination, board, fakeBoard, setFenSend, promotionPiece)
    } else {
      //dar um jeito dessa promoção estar dando erro, tem que enviar o promotion certo para api, esperar o modal abrir e talz
      if (!(playedPiece.isPawn && destination.y === promotionRow)) {
        fakeBoardSetup(playedPiece, destination, board, fakeBoard, setFenSend);
      }
    }

    setBoard(() => {
      //clona o tabuleiro
      const clonedBoard = board.clone();
      //atualiza o turno
      clonedBoard.totalTurns += 1;

      const destinationPiece = board.getPieceAt(destination);
      const captured = destinationPiece && destinationPiece.team !== playedPiece.team;

      //atualiza as peças do tabuleiro após um movimento valido
      playedMoveIsValid = clonedBoard.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination,
      );



      // Se uma peça foi capturada e o movimento é válido, atualiza o estado local
      if (captured && playedMoveIsValid) {
        setPieceCaptured(true);
      }

      if (clonedBoard.winningTeam !== undefined) {
        setGameOverModalVisible(true);
      }

      return clonedBoard;
    });




    if (destination.y === promotionRow && playedPiece.isPawn) {
      setPromotionPawn(() => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });

      // Armazena a peça de promoção antes de chamar o modal ou processar a promoção automática
      setPromotionPieceFinal(promotionPiece ?? '');

      if (playedPiece.team === TeamType.WHITE) {
        setPendingMove({ playedPiece, destination });
        // Mostra o modal de promoção para o jogador humano
        modalRef.current?.classList.remove("hidden");
      }
      return false
    }




    //se o peão se mover ou uma peça for capturada, a regra do empate de 50 movimentos é resetada.
    if (playedPiece.isPawn || pieceCaptured) {
      setFiftyMovesDrawRuleCount(0)
    } else {
      setFiftyMovesDrawRuleCount(prevCount => prevCount + 1);
    }



    setPieceCaptured(false)

    if (playedMoveIsValid) {
    }
    return playedMoveIsValid;
  }

  function promotePawn(pieceType: PieceType) {
    if (!promotionPawn) return;

    if (pendingMove) {
      const { playedPiece, destination } = pendingMove;

      const convertedPieceType: string = pieceTypeConversor(pieceType);
      fakeBoardSetup(playedPiece, destination, board, fakeBoard, setFenSend, convertedPieceType);

      setPendingMove(null);
    }

    setBoard(() => {
      const clonedBoard = board.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(new Piece(piece.position.clone(), pieceType, piece.team, true));
        } else {
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);

      clonedBoard.calculateAllMoves();
      return clonedBoard;
    });

    modalRef.current?.classList.add("hidden");

    // Sinaliza que a promoção foi concluída e o FEN atualizado
    setPromotionCompleted(true);
  }


  function promotionTeamType() {
    return promotionPawn?.team === TeamType.WHITE ? "w" : "b";
  }

  return (
    <>
      <div style={{ color: 'white' }}>{board.totalTurns}</div>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img alt="promoteRook"
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/rook_${promotionTeamType()}.png`}
          />
          <img alt="promoteBishop"
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/bishop_${promotionTeamType()}.png`}
          />
          <img alt="promoteKnight"
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/knight_${promotionTeamType()}.png`}
          />
          <img alt="promoteQueen"
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/queen_${promotionTeamType()}.png`}
          />
        </div>
      </div>
      <div ref={checkMateModalRef}>
        <Dialog
          header={
            <CustomHeader
              title={
                board.winningTeam === WinningTeamType.DRAW
                  ? "DRAW"
                  : `${board.winningTeam === WinningTeamType.BLACK ? "Black" : "White"} Won!!!`
              }
            />
          }
          visible={gameOverModalVisible}
          style={{ width: "50vw" }}
          onHide={() => setGameOverModalVisible(false)}
        >
          <div className="flex justify-content-center">
            <Button onClick={() => restartGame(fakeBoard, setGameOverModalVisible, setBoard, initialBoard)}>Play Again</Button>
          </div>
        </Dialog>
      </div>
      <Chessboard
        playMoveValidation={playMoveValidation}
        pieces={board.pieces}
      />
    </>
  );
}