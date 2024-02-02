import { TeamType } from "../../Types";
import { Position } from "../../models";
import { Pawn } from "../../models/Pawn";

describe('clone method of Pawn class tests', () => {
  let originalPosition: Position
  let originalPossibleMoves: Position[]
  let originalPawn: Pawn

  beforeEach(() => {
    originalPosition = new Position(2, 2)
    originalPossibleMoves = [new Position(3, 2)]
    originalPawn = new Pawn(originalPosition, TeamType.WHITE, false, false, originalPossibleMoves)
  })
  it('should create a clone with the same x and y values of Position', () => {

    const clonedPosition = originalPawn.clone();
    console.log(clonedPosition)
    expect(clonedPosition.position.x).toBe(originalPawn.position.x);
    expect(clonedPosition.position.y).toBe(originalPawn.position.y);
  });

  it('should not be the same instance as the original', () => {

    const clonedPosition = originalPawn.clone();
    expect(clonedPosition).not.toBe(originalPawn);
  });

  it('should not affect the original pawn when the position of the clone is modified', () => {

    const clonedPosition = originalPawn.clone();
    clonedPosition.position.x = 7;

    expect(originalPawn.position.x).toBe(2);
  });
  it('should not affect the original pawn when the possible moves of the clone is modified', () => {

    const clonedPosition = originalPawn.clone();
    clonedPosition.possibleMoves?.push({ x: 3, y: 3 } as Position)
    expect(originalPawn.possibleMoves).not.toContain({ x: 3, y: 3 });
  });
});