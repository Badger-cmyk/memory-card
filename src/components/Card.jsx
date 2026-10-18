import { useState } from "react"

function Card({id, name, image, onCardClick}) {
    const [ imageFailed, setImageFailed ] = useState(false)

    return (
        <button onClick={() => onCardClick(id)}>
            {!imageFailed && (
                <img src={image} alt="" onError={() => setImageFailed(true)}/>
            )}
            <span>{name}</span>
        </button>
    )
}


export default Card