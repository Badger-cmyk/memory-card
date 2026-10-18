import Card from "./Card"

function CardGrid({onCardClick, cardsArray}) {
    

  return(
    <div className="card-grid">
        {cardsArray.map((player) => (
            <Card key={player.id}
              name={player.name} 
              onCardClick={onCardClick} 
              id={player.id}
              image={player.image}/>
        ))}
    </div>
  )
}

export default CardGrid