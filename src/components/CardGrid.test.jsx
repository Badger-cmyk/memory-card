import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CardGrid from "./CardGrid";

const players = [
    {id: '1', name: 'Lionel Messi', image: 'messi.png'},
    {id: '2', name: 'Kaka', image: 'kaka.png'},
    {id: '3', name: 'Harry Kane', image: 'kane.png'}
]

describe('CardGrid', () => {
    it('renders one card for each player, in the order given', () => {
        render(<CardGrid cardsArray={players} onCardClick={() => {}} />)

        const cards = screen.getAllByRole('button')

        expect(cards).toHaveLength(3)
        expect(cards[0]).toHaveTextContent('Lionel Messi')
        expect(cards[1]).toHaveTextContent('Kaka')
        expect(cards[2]).toHaveTextContent('Harry Kane')
    })

    it('calls onCardClick with the id of the card that was clicked', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<CardGrid cardsArray={players} onCardClick={handleClick}/>)

        await user.click(screen.getByRole('button', { name: 'Kaka' }))

        expect(handleClick).toHaveBeenCalledTimes(1)
        expect(handleClick).toHaveBeenCalledWith('2')
    })

    it('renders no cards when the list is empty', () => {
        render(<CardGrid cardsArray={[]} onCardClick={() => []}/>)

        expect(screen.queryAllByRole('button')).toHaveLength(0)
    })
})