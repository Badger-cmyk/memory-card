import {  describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

async function renderApp() {
    const { default: App } = await import('./App')
    return render(<App />)
}

function fakeFetch(url){
    const name = decodeURIComponent(
        new URL(url).searchParams.get('p')
    ).replaceAll('_', ' ')

    return Promise.resolve({
        ok: true,
        json: () => 
            Promise.resolve({
                player: [
                    {
                        idPlayer: name,
                        strPlayer: name,
                        strCutout: `${name}.png`
                    }
                ]
            })
    })
}

beforeEach(() => {
    vi.resetModules()
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn(fakeFetch))
})

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('App', () => {
    it('shows the loading message', async () => {
        await renderApp()

        expect(screen.getByText(/loading player cards/i)).toBeInTheDocument()
    })

    it('eventually show the player cards', async () => {
        await renderApp()

        const cards = await screen.findAllByRole('button')

        expect(cards).toHaveLength(12)
        expect(screen.queryByText(/loading player cards/i)).not.toBeInTheDocument()
    })

    it('adds one point when a new card is clicked', async () => {
        const user = userEvent.setup()
        await renderApp()

        const messiCard = await screen.findByRole('button', {
            name: 'Lionel Messi',
        })

        await user.click(messiCard)

        expect(screen.getByText('Score: 1')).toBeInTheDocument()
        expect(screen.getByText('Best Score: 1')).toBeInTheDocument()
    })  

    it('resets the score but preserves the best score when the same card is clicked twice', async () => {
        const user = userEvent.setup()
        await renderApp()

        const messiCard = await screen.findByRole('button', {
            name: 'Lionel Messi',
        })

        await user.click(messiCard)
        await user.click(messiCard)

        expect(screen.getByText('Score: 0')).toBeInTheDocument()
        expect(screen.getByText('Best Score: 1')).toBeInTheDocument()
        expect(screen.getByRole('status')).toHaveTextContent('You lost with a streak of 1');
    })

    it('shows an error message when the players cannot be loaded', async () => {
        vi.stubGlobal('fetch', vi.fn(() => {
            return Promise.reject(new Error('network down'))
        }))

        await renderApp()

        expect(await screen.findByText(/could not load player cards/i)).toBeInTheDocument()
    })
})

