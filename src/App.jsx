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
  'Dominik Szoboszlai',
  'Jude Bellingham',
  'Kaka',
  'Paulo Dybala',
  'Joško Gvardiol', 
  'Lucas Bergvall',
  'Erling Haaland',
  'Mohamed Salah',
  'Kylian Mbappe',
  'Harry Kane',
  'Pedro Gonzalez Lopez',
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
      const results = await Promise.allSettled(playerNames.map(fetchPlayer))

      if(ignore) return

      const players = results
        .filter((result) => result.status === 'fulfilled' && result.value)
        .map((result) => result.value)

      if(players.length < MIN_CARDS) {
        setStatus('error')
        return
      }

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

      {status === 'error' && <p className='status-message error-message'>Could not load player cards. Please refresh the page.</p>}

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
