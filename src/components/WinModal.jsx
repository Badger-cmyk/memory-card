import { useRef, useEffect } from "react"

function WinModal({onButtonClick}) {
    const dialogRef = useRef(null)

    useEffect(() => {
        if(dialogRef.current){
            dialogRef.current.showModal()
        }
    }, [])

    return (
            <dialog ref={dialogRef} onCancel={onButtonClick} className="win-modal">
                <h2>You Win!</h2>
                <button onClick={onButtonClick}>Play Again</button>
            </dialog>
    )
}

export default WinModal