import logo from './logo.svg';
import me from './me.jpeg';
import './App.css';
import Base from './componets/Base';
import Figure from './componets/Figure';
import { useState } from 'react';
import { ErrorContext } from './createContext/ErrorContext';
import { HideFooterContext } from './createContext/HideFooterContext';

function App() {
  const [errors, setErrors] = useState(0);
  const [wordCompleted, setWordCompleted] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  const printWinMessage = () => {
    setWordCompleted(true);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            Powered by React
            
      </header>
      <div className="Game">
      <button onClick={refreshPage}>Click to reload! ↺</button>
        <h1>Hangman</h1>
        <p>Find the hidden word - Enter a letter</p>
        <HideFooterContext.Provider value={{hideFooter, setHideFooter}}>
          <ErrorContext.Provider value={{errors, setErrors}}>
            <Figure wordCompleted={wordCompleted}/>
            <Base  printWinMessage={printWinMessage}/>
          </ErrorContext.Provider>
        </HideFooterContext.Provider>
      </div>
      {hideFooter === false && <div className="App-footer"> 
        <img src={me} className="App-me" alt="logo" />
            Created by: McClaine Beirne
      </div>}
    </div>
  );
}

export default App;
