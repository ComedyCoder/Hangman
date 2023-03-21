import { useContext } from "react";
import { ErrorContext } from "../createContext/ErrorContext";
import '../styles/Figure.css';

const Figure = ({ wordCompleted }) => {
    const {errors} = useContext(ErrorContext);
    return (
        <div>
            {/* CODE BELOW FROM https://github.com/anandms101/Hangman/blob/master/index.html */}
            <svg height="250" width="200" className="figure-container">
                {/* <!-- Rod --> */}
                <line x1="60" y1="20" x2="140" y2="20" stroke="white"/>
                <line x1="140" y1="20" x2="140" y2="50" stroke="white"/>
                <line x1="60" y1="20" x2="60" y2="230" stroke="white"/>
                <line x1="20" y1="230" x2="100" y2="230" stroke="white"/>

                {/* <!-- Head --> */}
                {errors >= 1 && <circle cx="140" cy="70" r="20" stroke="white"/>}
                {/* <!-- Body --> */}
                {errors >= 2 && <line x1="140" y1="90" x2="140" y2="150" stroke="white"/>}
                {/* <!-- Arms --> */}
                {errors >= 3 && <line x1="140" y1="120" x2="120" y2="100"  stroke="white"/>}
                {errors >= 4 && <line x1="140" y1="120" x2="160" y2="100"  stroke="white"/>}
                {/* <!-- Legs --> */}
                {errors >= 5 && <line x1="140" y1="150" x2="120" y2="180" stroke="white"/>}
                {errors >= 6 && <line x1="140" y1="150" x2="160" y2="180" stroke="white"/>}
            </svg>
            {errors >= 6 && 
                <div className='lose-message'>
                    <h1>You Lose</h1>
                    <p>reload to play again.</p>
                </div>
            }
            {wordCompleted &&
             <div className='win-message'>
                    <h1>You Win!</h1>
                    <p>reload to play again.</p>
                </div>
            }
        </div>
    )
}
export default Figure;