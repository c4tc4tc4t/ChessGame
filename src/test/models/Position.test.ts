import { Position } from "../../models";

describe("samePosition method of Position class tests", () => {
  let position: Position
  beforeEach(() => {
    position = new Position(2, 2)
  })
  it("Should return true for a same position", () => {
    const passedPosition = {
      x: 2, y: 2
    }

    const samePosition = position.samePosition(passedPosition as Position)

    expect(samePosition).toBeTruthy()
  })
  it("Should return false for a diferent x and y", () => {
    const passedPosition = {
      x: 0, y: 3
    }

    const samePosition = position.samePosition(passedPosition as Position)

    expect(samePosition).not.toBeTruthy()
  })
  it("Should return false for a diferent x", () => {
    const passedPosition = {
      x: 0, y: 2
    }

    const samePosition = position.samePosition(passedPosition as Position)

    expect(samePosition).not.toBeTruthy()
  })
  it("Should return false for a diferent y", () => {
    const passedPosition = {
      x: 2, y: 3
    }

    const samePosition = position.samePosition(passedPosition as Position)

    expect(samePosition).not.toBeTruthy()
  })
  it("Should return true for a same object passed", () => {


    const samePosition = position.samePosition(position)

    expect(samePosition).toBeTruthy()
  })
  it("Should throw an error for null", () => {
    expect(() => {
      position.samePosition(null as any);
    }).toThrow();
  });
})

describe('clone method of Position class tests', () => {
  let originalPosition: Position
  beforeEach(() => {
    originalPosition = new Position(4, 3)
  })
  it('should create a clone with the same x and y values', () => {

    const clonedPosition = originalPosition.clone();
    expect(clonedPosition.x).toBe(originalPosition.x);
    expect(clonedPosition.y).toBe(originalPosition.y);
  });

  it('should not be the same instance as the original', () => {

    const clonedPosition = originalPosition.clone();
    expect(clonedPosition).not.toBe(originalPosition);
  });

  it('should not affect the original position when the clone is modified', () => {

    const clonedPosition = originalPosition.clone();
    clonedPosition.x = 7;
    expect(originalPosition.x).toBe(4);
  });
});
