function Card({id, name, onCardClick}) {

    return (
        <button onClick={() => onCardClick(id)}>
            <div>
                <p>{name}</p>
            </div>
        </button>
    )
}


export default Card