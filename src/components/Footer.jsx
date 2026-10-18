function Footer() {
    return (
        <footer className="footer">
            <p>
                Player data and images from{' '}
                <a 
                    href="https://www.thesportsdb.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    TheSportsDB
                    <span className="visually-hidden"> (opens in a new tab)</span>
                </a>.
            </p>

            <p>
                Built by <strong>Eben Badger</strong> as part of{' '}
                <a 
                    href="https://www.theodinproject.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    The Odin Project
                    <span className="visually-hidden"> (opens in a new tab)</span>
                </a>.{' '}
                <a 
                    href="https://github.com/Badger-cmyk/memory-card" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View source code on GitHub
                    <span className="visually-hidden"> (opens in a new tab)</span>
                </a>.
            </p>
        </footer>
    )
}

export default Footer