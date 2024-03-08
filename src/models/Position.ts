export class Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  samePosition(otherPosition: Position) {
    return this.x === otherPosition.x && this.y === otherPosition.y
  }

  positionConvert(): string {
    const xLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = this.y + 1;
    const xAxis = xLetters[this.x];
    return `${xAxis}${yAxis}`;
  }

  clone(): Position {
    return new Position(this.x, this.y)
  }
}