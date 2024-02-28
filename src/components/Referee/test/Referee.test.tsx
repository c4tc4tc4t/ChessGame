import { fireEvent, render, screen } from "@testing-library/react"
import Referee from '../Referee'

describe('Referee', () => {

  it('works', () => {
    render(<Referee />)

    const pawn = screen.getByTestId('pawn-w-0-1')

    expect(pawn).toBeInTheDocument()

    fireEvent.mouseDown(pawn, {clientX: 47, clientY: 655})

    fireEvent(
      pawn,
      new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: 44, clientY: 556
      }),
    )

    fireEvent.mouseUp(pawn, { 
      clientX: 44, clientY: 556
    })

    // the piece has moved to 0-2. 0-1 doesn't exist anymore.
    expect(screen.queryByTestId('pawn-w-0-1')).not.toBeInTheDocument()
  }) 
})