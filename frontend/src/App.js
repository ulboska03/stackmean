import React, {useContext} from 'react';
import './App.css';
import { ThemeContext } from './Context/ThemeContext';


function App() {
    const { theme, toggleTheme } = useContext(ThemeContext);
  return (
      <div className={`App ${theme}`}>
        <header className="App-header">
          <h1>Welcome to my project ! Test project this is Shugyla</h1>
            <button onClick={toggleTheme}>Фонды ауыстыру</button>
        </header>
      </div>
  );
}

export default App;