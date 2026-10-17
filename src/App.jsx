import { useState } from 'react'

import Scoreboard from './components/Scoreboard'
import Header from './components/Header'
import CardGrid from './components/CardGrid'
import WinModal from './components/WinModal'

function shuffleArray(array){
const copiedArray =  [...array]

for (let i = copiedArray.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * (i + 1));

  [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]]
}

return copiedArray

}

const initialCards = [
  { id: 1, name: 'Item One', description: 'This is the first item.' },
  { id: 2, name: 'Item Two', description: 'This is the second item.' },
  { id: 3, name: 'Item Three', description: 'This is the third item.' },
  { id: 4, name: 'Item Four', description: 'This is the fourth item.' },
  { id: 5, name: 'Item Five', description: 'This is the fifth item.' },
  { id: 6, name: 'Item Six', description: 'This is the sixth item.' },
]

function App() {
  const [ bestScore, setBestScore ] = useState(0)
  const [ clickedCards, setClickedCards ] = useState([]) 
  const [ hasLost,  setHasLost ] = useState(false)
  const [ lostStreak, setLostStreak ] =  useState(0)
  const [ cardsArray, setCardsArray] = useState(
    () => shuffleArray(initialCards)
  )

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
    <div>
      <Header />
      <Scoreboard 
        bestScore={bestScore} 
        score={clickedCards.length} 
        hasLost={hasLost}
        lostStreak={lostStreak}/>
      <CardGrid cardsArray={cardsArray} onCardClick={onCardClick}/>
      {hasWon && <WinModal onButtonClick={onButtonClick}/>}
      
    </div>
  )
  
}

export default App
