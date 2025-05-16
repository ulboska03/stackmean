import React, {lazy, useContext} from 'react';
import './App.css';
import { ThemeContext } from './Context/ThemeContext';
import {BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import Products from "./pages/Product";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link> |
            </nav>
            Suspense fallback={<div>Loading...</div>}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
            </Routes>
            <div className={`App ${theme}`}>
                <header className="App-header">
                    <h1>Welcome to my project ! Test project this is Shugyla</h1>
                    <button onClick={toggleTheme}>Фонды ауыстыру</button>
                </header>
            </div>
        </Router>
    );
}

export default App;