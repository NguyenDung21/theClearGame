import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputPoints, setInputPoints] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [clickedNumbers, setClickedNumbers] = useState([]);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isAllCleared, setIsAllCleared] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (numbers.length > 0 && clickedNumbers.length === numbers.length) {
      setIsAllCleared(true);
      clearInterval(intervalId);
    }
  }, [clickedNumbers, numbers, intervalId]);

  const startTimer = () => {
    // If there is already a timer running, don't start a new one
    if (intervalId) return;

    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10); // 10 ms for hundredth of a second
    setIntervalId(id);
  };

  const handleRestart = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setInputPoints('');
    setNumbers([]);
    setPositions([]);
    setClickedNumbers([]);
    setTime(0);
    setIsGameOver(false);
    setIsAllCleared(false);
  };

  const generateNumbers = () => {
    const count = parseInt(inputPoints, 10);
    if (isNaN(count) || count <= 0) {
      alert('Please enter a valid number!');
      return;
    }
    const generatedNumbers = Array.from({ length: count }, (_, i) => i + 1);
    setNumbers(generatedNumbers);
    setPositions(generateRandomPositions(count));
    setClickedNumbers([]);
    setIsGameOver(false);
    setIsAllCleared(false);
    setTime(0);
    startTimer(); // Start the timer when numbers are generated
  };

  const generateRandomPositions = (count) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * (800 - 50); // 50 is the diameter of each number button
      const y = Math.random() * (800 - 50); // 50 is the diameter of each number button
      positions.push({ x, y });
    }
    return positions;
  };

  const handleNumberClick = (number) => {
    const currentIndex = clickedNumbers.length;
    const nextCorrectNumber = currentIndex + 1;

    if (number !== nextCorrectNumber) {
      setIsGameOver(true);
      clearInterval(intervalId);
      return;
    }

    setClickedNumbers([...clickedNumbers, number]);
  };

  return (
    <div className="App">
      <h1>LET'S PLAY</h1>
      <div>
        <label>POINT: </label>
        <input
          type="text"
          value={inputPoints}
          onChange={(e) => setInputPoints(e.target.value)}
        />
        <button onClick={generateNumbers}>Generate</button>
      </div>
      <div>
        <label>Time: </label>
        <span>{(time / 1000).toFixed(2)} seconds</span>
      </div>
      <div>
        <button onClick={handleRestart}>Restart</button>
      </div>
      {isGameOver && <div className="message">Game Over!</div>}
      {isAllCleared && <div className="message">ALL CLEARED!</div>}
      <div className="number-container">
        {numbers.map((number, index) => (
          <button
            key={number}
            className={`number-button ${clickedNumbers.includes(number) ? 'clicked' : ''}`}
            onClick={() => handleNumberClick(number)}
            disabled={isGameOver}
            style={{
              top: `${positions[index].y}px`,
              left: `${positions[index].x}px`,
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;