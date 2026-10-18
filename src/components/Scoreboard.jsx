function Scoreboard({bestScore, score, hasLost, lostStreak}) {
    return (
        <div className="scoreboard">
            <div className="scoreboard-stats">
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>
            <p className="loss-message" role="status">
                {hasLost ? `You lost with a streak of ${lostStreak}. Try Again.` : ''}
            </p>
        </div>
    )
}

export default Scoreboard