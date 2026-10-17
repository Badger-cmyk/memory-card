function Scoreboard({bestScore, score, hasLost, lostStreak}) {
    return (
        <div>
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
            {hasLost && <p>You lost with a streak of {lostStreak}. Try Again</p>}
        </div>
    )
}

export default Scoreboard