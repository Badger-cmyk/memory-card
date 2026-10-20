import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Card from "./Card";

describe('Card', () => {
    it('shows the player name on a button', () => {
        render(<Card id="1" name="Lionel Messi" image="messi.png" onCardClick={() => {}} />)

        expect(screen.getByRole('button', { name: 'Lionel Messi' })).toBeInTheDocument()
    })

    it('calls onCardClick with its id when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn()

        render(<Card id="1" name="Lionel Messi" image="messi.png" onCardClick={handleClick}/>)

        await user.click(screen.getByRole('button', { name: 'Lionel Messi' }))

        expect(handleClick).toHaveBeenCalledTimes(1)
        expect(handleClick).toHaveBeenCalledWith('1')

    })
})