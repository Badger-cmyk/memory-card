import Card from "./Card"

function CardGrid({onCardClick, cardsArray}) {
    

  return(
    <div>
        {cardsArray.map((item) => (
            <Card key={item.id} name={item.name} onCardClick={onCardClick} id={item.id}/>
        ))}
    </div>
  )
}

export default CardGrid