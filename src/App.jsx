import { useEffect, useState } from 'react'

import Scoreboard from './components/Scoreboard'
import Header from './components/Header'
import CardGrid from './components/CardGrid'
import WinModal from './components/WinModal'
import Footer from './components/Footer'

function shuffleArray(array){
const copiedArray =  [...array]

for (let i = copiedArray.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * (i + 1));

  [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]]
}

return copiedArray

}

const playerNames = [
  'Nico Paz',
  'Paolo Maldini',
  'Lionel Messi',
  'Cristiano Ronaldo',
  'Jude Bellingham',
  'Kaka',
  'Paulo Dybala',
  'Erling Haaland',
  'Mohamed Salah',
  'Kylian Mbappe',
  'Harry Kane',
  'Raphinha'
]

const MIN_CARDS = 6

async function fetchPlayer(name) {
  const searchName = name.replaceAll(' ', '_')
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${searchName}`
  )

  if(!response.ok){
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data = await response.json()
  const player = data.player?.[0]

  if(!player?.strCutout) return null

  return {
    id: player.idPlayer,
    name: player.strPlayer,
    image: player.strCutout
  }
}

const CACHE_KEY = 'memory-card-players'
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000 

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if(!raw) return null

    const cached = JSON.parse(raw)
    const isFresh = Date.now() - cached.savedAt < CACHE_MAX_AGE
    const sameList = 
      JSON.stringify(cached.names) === JSON.stringify(playerNames)

    if(!isFresh || !sameList || !Array.isArray(cached.players)) return null
    if(cached.players.length < MIN_CARDS) return null

    return cached.players
  } catch {
    return null
  }
}

function writeCache(players) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), names: playerNames, players })
    )
  } catch {
    //storage full or blocked, game still works
  }
}

let inFlight = null

function fetchAllPlayers() {
  inFlight ??= Promise.allSettled(playerNames.map(fetchPlayer))
  return inFlight
}

function App() {
  const [ bestScore, setBestScore ] = useState(0)
  const [ clickedCards, setClickedCards ] = useState([]) 
  const [ hasLost,  setHasLost ] = useState(false)
  const [ lostStreak, setLostStreak ] =  useState(0)
  const [ status, setStatus ] = useState('loading')
  const [ cardsArray, setCardsArray] = useState([])

  useEffect(() => {
    let ignore = false

    async function loadPlayers() {

      const cached = readCache()

      if(cached) {
        setCardsArray(shuffleArray(cached))
        setStatus('ready')
        return
      }

      const results = await fetchAllPlayers()
      if(ignore) return

      const players = results
      .filter((result) => result.status === 'fulfilled' && result.value)
      .map((result) => result.value)

      if(players.length < MIN_CARDS){
        setStatus('error')
        return
      }

      const anyRequestFailed = results.some(
        (result) => result.status === 'rejected'
      )
      if(!anyRequestFailed) writeCache(players)

      setCardsArray(shuffleArray(players))
      setStatus('ready')
    }

    loadPlayers()

    return () => {
      ignore = true
    }
  }, [])

  const hasWon = cardsArray.length > 0 && clickedCards.length === cardsArray.length

  function onCardClick(id) {
    if(!clickedCards.includes(id)){
      

      setClickedCards([...clickedCards, id])
      setHasLost(false)

      if(clickedCards.length + 1 > bestScore){
        setBestScore(clickedCards.length + 1)
      }

    }
    else {
      setLostStreak(clickedCards.length)
      setClickedCards([])
      setHasLost(true)
    }

    setCardsArray(shuffleArray(cardsArray))
  }

  function onButtonClick(){
    setHasLost(false)
    setClickedCards([])
    setCardsArray(shuffleArray(cardsArray))
  }

  return (
    <div className='app'>
      <Header />

      {status === 'loading' && <p className='status-message'>Loading player cards...</p>}

      {status === 'error' && (
        <p className='status-message error-message'>
          Could not load player cards. The service may be busy, so please wait a minute and then reload the page once.
        </p>
      )}

      {status === 'ready' && (
        <>
          <Scoreboard 
            bestScore={bestScore} 
            score={clickedCards.length} 
            hasLost={hasLost}
            lostStreak={lostStreak}
          />

          <CardGrid 
            cardsArray={cardsArray} 
            onCardClick={onCardClick}
          />
        </>
      )}

      {hasWon && <WinModal onButtonClick={onButtonClick}/>}

      <Footer />
    </div>
  )
  
}

export default App
