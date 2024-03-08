import { Position } from "../models";

export function convertToPosition(stockFishMove: string) {
  const xLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const moveArray = stockFishMove.split('');

  let initialX: number = -1
  let destinationX: number = -1
  let initialY: number = parseInt(moveArray[1], 10);
  let destinationY: number = parseInt(moveArray[3], 10);

  xLetters.forEach((letter, index) => {
    if (letter === moveArray[0]) {
      initialX = index
    }
    if (letter === moveArray[2]) {
      destinationX = index
    }
  })
  return { from: new Position(initialX, initialY), to: new Position(destinationX, destinationY) }
}

//fazer função para calcular o movimento mais agressivo com captura