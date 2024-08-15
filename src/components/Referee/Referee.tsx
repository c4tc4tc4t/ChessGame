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
import { bestMoveConverted, convertToPosition, isAgressiveMove, isBotCastling, sortBestMovesByScore } from "../../otherFunctions/StockFishFunctions";

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [boardStateHistoric, setBoardStateHistoric] = useState<Piece[][]>([]);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [pieceCaptured, setPieceCaptured] = useState<boolean>();
  const [gameOverModalVisible, setGameOverModalVisible] =
    useState<boolean>(false);
  const [fenSend, setFenSend] = useState<string>('');

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

  useEffect(() => {
    if (fiftyMovesDrawRuleCount >= 100) {
      setFiftyMovesDrawCallback();
    }
  }, [fiftyMovesDrawRuleCount, setFiftyMovesDrawCallback]);


  useEffect(() => {
    //if 100 moves are played, 50 by each team, it's a draw
    if (fiftyMovesDrawRuleCount >= 100) {
      board.winningTeam = WinningTeamType.DRAW
      setGameOverModalVisible(true)
      setFiftyMovesDrawRuleCount(0)
    }
  }, [fiftyMovesDrawRuleCount]);

  useEffect(() => {
    const isDrawByrepetition: boolean = threefoldRepetitionDraw(board)

    const isinsufficientMaterialDraw = insufficientMaterialDraw(board);

    //if is a draw by repetition or draw by insufficient material shows the modal with draw
    if (isDrawByrepetition || isinsufficientMaterialDraw) {
      board.winningTeam = WinningTeamType.DRAW
      setGameOverModalVisible(true)
    }

    if (board.totalTurns !== 1) setBoardStateHistoric([...boardStateHistoric, board.pieces]);

    // const FENReturn: string = stockFishRequest(FENSend)

  }, [board])

  useEffect(() => {

    const fetchData = async () => {
      if (board.currentTeam === TeamType.BLACK) {
        const bestMovesStockFish: bestMoveStockFish[] = await stockFishRequest(fenSend);

        let bestMovesConverted: bestMoveConverted[] = bestMovesStockFish.map(stockFishMove => ({
          move: convertToPosition(stockFishMove.move),
          score: stockFishMove.score
        }));

        bestMovesConverted = sortBestMovesByScore(bestMovesConverted)
        let agressiveMove: boolean = false;

        let movePlayed: bestMoveConverted;

        bestMovesConverted.forEach((bestMove, index) => {
          agressiveMove = isAgressiveMove(bestMove.move.from, bestMove.move.to, board, bestMove.score)

          if (agressiveMove || index === 0) {
            movePlayed = bestMove
            console.log(movePlayed)
          }
        })

        board.pieces.forEach((piece) => {

          if (piece.position.samePosition(movePlayed.move.from)) {
            let botMove = isBotCastling(piece, movePlayed)
            playMoveValidation(piece, botMove)
          }
        })

      }
    };

    fetchData();
  }, [board.totalTurns]);





  interface CustomHeaderProps {
    title: string;
  }

  //CustomHeader created to style the header of dialog PrimeReact
  const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
  );

  function fakeBoardSetup(playedPiece: Piece, destination: Position) {
    const from: string = playedPiece.position.positionConvert()
    const to: string = destination.positionConvert()

    const destinationPiece = board.pieces.find((p) =>
      p.samePosition(destination)
    );

    //checks if the played move is a valid castling move
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

      fakeBoard.move({ from: from, to: to })
    }


    const newFen = fakeBoard.fen()
    setFenSend(newFen)
    console.log(fakeBoard.ascii())
  }


  //function that checks if the move played is a three fold repetition draw
  function threefoldRepetitionDraw(board: Board): boolean {
    let positionRepeatedCount = 0
    //boardstatehistoric is an array that contains Piece[], meaning an array that contain each board State played saved
    boardStateHistoric.forEach((boardState) => {
      //compare the type, team and position of every state played with the current state
      const allPiecesMatch = boardState.every(piece1 => {
        return board.pieces.some(piece2 => {
          return piece1.type === piece2.type &&
            piece1.team === piece2.team &&
            piece1.position.samePosition(piece2.position);
        });
      })
      //checks if the current state is repeated
      if (allPiecesMatch) positionRepeatedCount++
    })

    //if current board state is repeated 2 times, means that the position appeared 3 times, current +2 , so, it's a draw by repetition
    if (positionRepeatedCount >= 2) {
      return true
    } else {
      return false
    }
  }

  //function that checks if it is a draw by insuficcient material
  function insufficientMaterialDraw(board: Board): boolean {
    //gets the quantity of pieces on the board
    const pieceQuantity: number = board.pieces.length
    let containBishopOrKnight: boolean = false;

    //checks if there's a remaining knight or bishop on the board
    board.pieces.forEach((piece) => {
      if (piece.isBishop || piece.isKnight) containBishopOrKnight = true
    })
    //if there's only 2 pieces left, that means that only kings are left, so it's a draw
    if (pieceQuantity <= 2) {
      return true
      //if there's 3 pieces left and 1 of then it's a knight or a bishop, it's a draw
    } else if (pieceQuantity <= 3 && containBishopOrKnight) {
      return true
    }
    return false
  }

  function playMoveValidation(
    playedPiece: Piece,
    destination: Position
  ): boolean {
    //checks if the piece have possible moves, if not, it means that all moves are invalid
    if (playedPiece.possibleMoves === undefined) return false;
    //check if it is white's turn or black's turn, so only pieces of the team's turn can move
    if (playedPiece.team === TeamType.WHITE && board.totalTurns % 2 !== 1)
      return false;
    if (playedPiece.team === TeamType.BLACK && board.totalTurns % 2 !== 0)
      return false;

    let playedMoveIsValid = false;

    //check if the move played is into the possibleMoves array
    const validMove = playedPiece.possibleMoves?.some((m) =>
      m.samePosition(destination)
    );

    //if validmove is false return false, because the move played was not a possible move
    if (!validMove) return false;

    //check if the move played is a enPassant move
    const enPassantMove: boolean = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    );

    fakeBoardSetup(playedPiece, destination)

    setBoard(() => {
      //clone the board
      const clonedBoard = board.clone();
      //updates the turn
      clonedBoard.totalTurns += 1;

      const destinationPiece = board.getPieceAt(destination);
      const captured = destinationPiece && destinationPiece.team !== playedPiece.team;

      //updates the pieces of the board after a valid move is played
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

      //set the updated board
      return clonedBoard;
    });

    //check the promotion row of the piece
    let promotionRow = playedPiece.team === TeamType.WHITE ? 7 : 0;

    //check if the piece is a pawn and if the move played is a promotion
    if (destination.y === promotionRow && playedPiece.isPawn) {
      //shows the modal promotion to choose a piece
      modalRef.current?.classList.remove("hidden");
      //updates the promotionPawn with the pawn played for further verifications
      setPromotionPawn(() => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();

        return clonedPlayedPiece;
      });
    }

    //if a pawn is moves or a piece is captured the fifty move rule is reseted, otherwise it keeps counting
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

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    //attributes the direction of the pawn based on his team
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;

    //check if is pawn
    if (type === PieceType.PAWN) {
      //check if the move is enpassant, if wants to move 1 tile on x and 1 tile on y
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        //finds if the piece with the enPassant move exist on the board and then returns
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );
        if (piece) return true;
      }
    }

    return false;
  }

  function promotePawn(pieceType: PieceType) {
    //if there's not a pawn being promoted, return
    if (promotionPawn === undefined) {
      return;
    }

    setBoard(() => {
      //clone the board to keep the original state
      const clonedBoard = board.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        //finds the pawn the board
        if (piece.samePiecePosition(promotionPawn)) {
          //push the selected piece(queen, rook, etc..) ti replace the pawn
          results.push(
            new Piece(piece.position.clone(), pieceType, piece.team, true)
          );
        } else {
          results.push(piece);
        }

        return results;
      }, [] as Piece[]);

      //re-calculate moves so new piece have possible moves
      clonedBoard.calculateAllMoves();

      return clonedBoard;
    });

    //hides the promotion modal
    modalRef.current?.classList.add("hidden");
  }

  //returns the pawn team to the promoted piece
  function promotionTeamType() {
    return promotionPawn?.team === TeamType.WHITE ? "w" : "b";
  }

  function restartGame() {
    setGameOverModalVisible(false);
    fakeBoard.reset()
    setBoard(initialBoard.clone());
  }

  return (
    <>
      <div style={{ color: "white" }}>{board.totalTurns}</div>
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
            <Button onClick={() => restartGame()}>Play Again</Button>
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