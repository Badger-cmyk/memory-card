import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import WinModal from './WinModal'

beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function() {
        this.setAttribute('open', '')
    })
})

describe('WinModal', () => {
    it('opens itself as a modal when it appears', () => {
        render(<WinModal onButtonClick={() => {}}/>)

        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1)
    })

    it('shows the win message and a play again button', () => {
        render(<WinModal onButtonClick={() => {}}/>)

        expect(screen.getByRole('heading', { name: /you win/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Play Again' })).toBeInTheDocument()
    })

    it('calls onButtonClick when Play Again is clicked', async () => {
        const user = userEvent.setup()
        const handleRestart = vi.fn()

        render(<WinModal onButtonClick={handleRestart}/>)

        await user.click(screen.getByRole('button', { name: 'Play Again'}))

        expect(handleRestart).toHaveBeenCalledTimes(1)
    })

    it('restarts the game when Escape closes the dialog', () => {
        const handleRestart = vi.fn()

        render(<WinModal onButtonClick={handleRestart} />)

        fireEvent(
            screen.getByRole('dialog'),
            new Event('cancel', {bubbles: false, cancelable: true })
        )

        expect(handleRestart).toHaveBeenCalledTimes(1)
    })
})