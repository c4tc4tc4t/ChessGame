import { useEffect, useRef, useState } from "react";
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

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard.clone());
  const [boardStateHistoric, setboardStateHistoric] = useState<Piece[][]>([]);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [gameOverModalVisible, setgameOverModalVisible] =
    useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const checkMateModalRef = useRef<HTMLDivElement>(null);

  const [fiftyMovesDrawRuleCount, setFiftyMovesDrawRuleCount] = useState<number>(0)


  const { pieceCaptured, setPieceCaptured } = useGame();

  useEffect(() => {
    //if 100 moves are played, 50 by each team, it's a draw
    if (fiftyMovesDrawRuleCount >= 100) {
      board.winningTeam = WinningTeamType.DRAW
      setgameOverModalVisible(true)
      setFiftyMovesDrawRuleCount(0)
    }
  }, [fiftyMovesDrawRuleCount]);



  interface CustomHeaderProps {
    title: string;
  }

  //CustomHeader created to style the header of dialog PrimeReact
  const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
  );


  //function that checks if the move played is a three fold repetition draw
  function threefoldRepetitionDraw(): boolean {
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

    //if current board state is repeated 2 times, that means the it appeared 3 times, the current plus 2, so it's a draw by repetition
    if (positionRepeatedCount >= 2) {
      return true
    } else {
      return false
    }
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

    setBoard(() => {
      //clone the board
      const clonedBoard = board.clone();
      //updates the turn
      clonedBoard.totalTurns += 1;

      //updates the pieces of the board after a valid move is played
      playedMoveIsValid = clonedBoard.playMove(
        enPassantMove,
        validMove,
        playedPiece,
        destination,
        setPieceCaptured
      );

      if (clonedBoard.winningTeam !== undefined) {
        setgameOverModalVisible(true);
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


    const isDrawByrepetition: boolean = threefoldRepetitionDraw()
    //if is a draw by repetition shows the modal with draw
    if (isDrawByrepetition) {
      board.winningTeam = WinningTeamType.DRAW
      setgameOverModalVisible(true)
    }


    setboardStateHistoric([...boardStateHistoric, board.pieces]);

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
    setgameOverModalVisible(false);
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
          onHide={() => setgameOverModalVisible(false)}
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