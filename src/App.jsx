import { useState } from 'react'

import Scoreboard from './components/Scoreboard'
import Header from './components/Header'

function App() {

  const [ bestScore, setBestScore ] = useState(0)
  const [ clickedCards, setClickedCards ] = useState([]) 
  
  return (
    <div>
      <Header />
      <Scoreboard bestScore={bestScore} score={clickedCards.length}/>
    </div>
  )
  
}

export default App
