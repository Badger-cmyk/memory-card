import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Scoreboard from "./Scoreboard";

describe('Scoreboard', () => {
    it('shows the score and the best score', () => {
        render(<Scoreboard score={3} bestScore={5} hasLost={false} lostStreak={0}/>)

        expect(screen.getByText('Score: 3')).toBeInTheDocument()
        expect(screen.getByText('Best Score: 5')).toBeInTheDocument()
    })

    it('shows the streak in the loss message after a loss', () => {
        render(<Scoreboard score={0} bestScore={4} hasLost={true} lostStreak={4}/>)

        expect(screen.getByRole('status')).toHaveTextContent('You lost with a streak of 4')
    })

    it('shows no loss message when the player has not lost', () => {
        render(<Scoreboard score={2} bestScore={4} hasLost={false} lostStreak={0}/>)

        expect(screen.queryByText(/you lost/i)).not.toBeInTheDocument()
    })
})