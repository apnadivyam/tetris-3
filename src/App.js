// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  const [gameOver, setGameOver] = useState(false);
  return (
    <div className="App">
      {gameOver ? (
        <div>
          <h1>!!! Game Over !!!</h1>
        </div>
      ) : (
        <Game rows={10} columns={12} gameOver={() => setGameOver(true)} />
      )}
      hii
    </div>
  );
}

export default App;
