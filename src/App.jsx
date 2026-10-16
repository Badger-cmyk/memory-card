import { useState } from 'react'

import Scoreboard from './components/Scoreboard'
import Header from './components/Header'
import CardGrid from './components/CardGrid'

function App() {

  const [ bestScore, setBestScore ] = useState(0)
  const [ clickedCards, setClickedCards ] = useState([]) 
  

  const cardsArray = [
    { id: 1, name: 'Item One', description: 'This is the first item.' },
    { id: 2, name: 'Item Two', description: 'This is the second item.' },
    { id: 3, name: 'Item Three', description: 'This is the third item.' },
    { id: 4, name: 'Item Four', description: 'This is the fourth item.' },
    { id: 5, name: 'Item Five', description: 'This is the fifth item.' },
    { id: 6, name: 'Item Six', description: 'This is the sixth item.' },
  ];

  function onCardClick(id) {
    if(!clickedCards.includes(id)){
      

      setClickedCards([...clickedCards, id])

      if(clickedCards.length + 1 > bestScore){
        setBestScore(clickedCards.length + 1)
      }

    }
    else {
      setClickedCards([])
    }
    console.log(`The card with the id ${id} was clicked`)
  }
  
  return (
    <div>
      <Header />
      <Scoreboard bestScore={bestScore} score={clickedCards.length}/>
      <CardGrid cardsArray={cardsArray} onCardClick={onCardClick}/>
      
    </div>
  )
  
}

export default App
