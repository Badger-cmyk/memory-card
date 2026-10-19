# **Memory Card Game**

## **Description**

A football-themed memory game where players click on footballers' cards to earn points without selecting the same player twice. The cards shuffle after each selection, challenging players to remember which footballers they have already clicked.

Player images and data are fetched from TheSportsDB API.

Built as part of The Odin Project's [curriculum](https://www.theodinproject.com/lessons/node-path-react-new-memory-card).

## Live Demo
[Play the game](https://memory-card-chi-five.vercel.app/)

## Built With
- React
- Vite
- TheSportsDB API

## Run Locally

1. Clone the repository:

```bash
   git clone https://github.com/Badger-cmyk/memory-card.git
   cd memory-card
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

4. Open the local address shown in your terminal (usually `http://localhost:5173`).

Built with Node.js 22. No API key setup is needed, because the game uses TheSportsDB's free public key, which is shared with everyone and isn't a secret.

To create a production build and preview it:

```bash
npm run build
npm run preview
```

The free API tier is rate limited, so on a first visit the game may show fewer cards or ask you to try again in a minute.

## What I Learned
- How to fetch data from an external API inside useEffect
- How to handle multiple asynchronous requests using Promise.allSettled
- How to manage game state using React's useState hook
- How to use React's useRef hook to open the win dialog with the native dialog element's showModal method
- How to pass data and event handlers between components using props
- How to derive values like the score and the win condition from existing state instead of storing them separately
- How to set an initial state value lazily, and how to clean up an effect so stale fetches don't update state
- How to update state without mutating it, by copying arrays before changing them
- How to render lists of components dynamically using map and unique keys
- How to implement the Fisher-Yates shuffle algorithm to randomize cards
- How to handle loading states, API errors, and missing player images
- How to use conditional rendering to display different game states
