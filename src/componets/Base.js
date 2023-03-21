import { isMobile } from "react-device-detect";
import { useState, useEffect, useContext } from "react";
import { HideFooterContext } from '../createContext/HideFooterContext';
import { ErrorContext } from "../createContext/ErrorContext";
import '../styles/Base.css';

const Base = ({printWinMessage}) => {

    const {setHideFooter} = useContext(HideFooterContext);
    const {errors, setErrors} = useContext(ErrorContext);

    const [answer, setAnswer] = useState([]); 
    const [hidden, setHidden] = useState([]);
    const [lettersUsed, setLettersUsed] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [userInput, setUserInput] = useState("");

    const showHidden = hidden.map((letter, index) =>
     <h1 key={index}>{letter}</h1>
     );
    const showLettersUsed = lettersUsed.map(letter => letter + ", " );

    // for the letter input box 
    const handleChange = (event) => {
        setUserInput(event.target.value.toLowerCase());
    }

    const onFocus = () => {
        if(isMobile) {
            setHideFooter(true);
        }
        return
    }

    const onBlur = () => {
        setHideFooter(false);
    }

    const fetchData = () => {
        return fetch('https://random-word-api.herokuapp.com/word')
              .then((response) => response.json())
              .then((data) => {
                console.log(data[0])
                const word = data[0];
                const array = word.split("");
                const hiddenArray = [];
                setAnswer(array);
                for (let i = 0; i < array.length; i++) {
                    hiddenArray.push("?");
                }
                setHidden(hiddenArray);
              });
            }
    
    useEffect(()  => {
      fetchData();
      }, [])

  const checkForWinOrLose = () => {
        if (!hidden.includes("?") && errors < 5){
            setGameOver(true);
            printWinMessage();
        }
        if (errors === 5) {
            setGameOver(true);
            setHidden(answer);
        }
        return;
      }

    const submitGuess = (event) => {
        event.preventDefault();
        if (userInput.length === 0 || lettersUsed.includes(userInput) || hidden.includes(userInput)){
            setUserInput('');
            return;
        }
        let result = answer.includes(userInput);
        if (result) {
            let newHidden = hidden;
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] === userInput) {
                    newHidden[i] = userInput;
                }
            }
            setHidden(newHidden);
        } else {
            setErrors(errors + 1);
            if (!lettersUsed.includes(userInput)) {
                setLettersUsed([...lettersUsed, userInput]);
            }
        }
        setUserInput('');
        checkForWinOrLose();
        return;
    }


    return (
        <div className="container">
            <div className="word">
                {showHidden}
            </div>
            <br />
            <form onSubmit={submitGuess} className="input-guess">
                <label>
                    Enter letter here: <input  maxLength={1} 
                                        value={userInput} 
                                        onChange={handleChange}
                                        onFocus={onFocus} 
                                        onBlur={onBlur}
                                        readOnly={gameOver}/>
                </label>
                <label>
                    <input type="submit"  onClick={submitGuess} value={"→"}/>
                </label>
            </form>
            Wrong letters used:
            <div className="letters-used">
                {showLettersUsed}
            </div>  
        </div>
    )
}
export default Base;