import { fireEvent, render, screen } from "@testing-library/react";
import Chessboard from "../Chessboard";
import { initialBoard } from "../../../Constants";

describe("Chessboard", () => {
  it("works", () => {
    const play = jest.fn();
    render(
      <Chessboard playMoveValidation={play} pieces={initialBoard.pieces} />
    );

    const pawn = screen.getByTestId("pawn-w-0-1");

    fireEvent.mouseDown(pawn, { clientX: 47, clientY: 655 });

    fireEvent(
      pawn,
      new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: 44,
        clientY: 556,
      })
    );

    fireEvent.mouseUp(pawn, {
      clientX: 44,
      clientY: 556,
    });

    expect(play).toBeCalledWith(
      {
        image: "assets/images/pawn_w.png",
        position: { x: 0, y: 1 },
        type: "pawn",
        team: "w",
        hasMoved: false,
        possibleMoves: [
          { x: 0, y: 2 },
          { x: 0, y: 3 },
        ],
      },
      { x: 0, y: 2 }
    );
  });
});
