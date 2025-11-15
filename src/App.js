import React, { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

import "./App.css";

const cardImages = [
  { key: 1, src: "./img/bike.png", matched: false },
  { key: 2, src: "./img/chocolate.png", matched: false },
  { key: 3, src: "./img/coffee.png", matched: false },
  { key: 4, src: "./img/flowers.png", matched: false },
  { key: 5, src: "./img/meditate.png", matched: false },
  { key: 6, src: "./img/water.png", matched: false },
];

const cardTranslation = [
  { key: 1, src: "./img/bikeSpanish.png", matched: false },
  { key: 2, src: "./img/chocolateSpanish.png", matched: false },
  { key: 3, src: "./img/coffeeSpanish.png", matched: false },
  { key: 4, src: "./img/flowersSpanish.png", matched: false },
  { key: 5, src: "./img/meditateSpanish.png", matched: false },
  { key: 6, src: "./img/waterSpanish.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [flippedCard1, setFlippedCard1] = useState(null);
  const [flippedCard2, setflippedCard2] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showScoreIncrease, setShowScoreIncrease] = useState(false);
  const [pointsGained, setPointsGained] = useState(0);
  const [scoreAnimating, setScoreAnimating] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // shuffle the card array
  const shuffle = () => {
    const shuffleCards = [...cardImages, ...cardTranslation]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFlippedCard1(null);
    setflippedCard2(null);

    // set the shuffled cards
    setCards(shuffleCards);
    setTurns(0);
    setScore(0);
    setGameComplete(false);
  };

  // check if the flipped cards match
  useEffect(() => {
    if (flippedCard1 && flippedCard2) {
      if (flippedCard1.key === flippedCard2.key) {
        setDisabled(true);

        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.key === flippedCard1.key) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        
        // Increment score and show feedback
        const pointsToAdd = 10;
        setScore((prevScore) => prevScore + pointsToAdd);
        setPointsGained(pointsToAdd);
        setShowScoreIncrease(true);
        setScoreAnimating(true);
        
        // Hide the score increase notification after animation
        setTimeout(() => {
          setShowScoreIncrease(false);
          setScoreAnimating(false);
        }, 2000);
        
        resetFlippedCards();
      } else {
        setTimeout(() => resetFlippedCards(), 1000);
      }
    }
  }, [flippedCard1, flippedCard2]);

  // set the flipped cards
  const handleFlip = (card) => {
    console.log("flipped card", card);
    flippedCard1 ? setflippedCard2(card) : setFlippedCard1(card);
  };

  // reset the flipped cards
  const resetFlippedCards = () => {
    setFlippedCard1(null);
    setflippedCard2(null);
    setTurns(turns + 1);
    setDisabled(false);
  };

  // check if all cards are matched
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameComplete(true);
    }
  }, [cards]);

  // start the game - show the cards
  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div className="App">
      <h3>Strengthen your memory, expand your vocabulary!</h3>
      <div className="game-header">
        <button onClick={shuffle} className={gameComplete ? 'new-game-prominent' : ''}>
          New Game
        </button>
        <div className="score-container">
          <p className="score">Score: <span className={`score-value ${scoreAnimating ? 'animate' : ''}`}>{score}</span></p>
          {showScoreIncrease && (
            <div className="score-increase">
              +{pointsGained} points!
            </div>
          )}
        </div>
      </div>
      {/* <p>Turns: {turns}</p> */}
      {gameComplete && (
        <div className="congratulations-overlay">
          <div className="congratulations-modal">
            <h2 className="congratulations-title">🎉 Congratulations! 🎉</h2>
            <p className="congratulations-message">
              You've matched all the pairs!
            </p>
            <p className="final-score">Final Score: <span className="final-score-value">{score}</span></p>
            <button onClick={shuffle} className="congratulations-button">
              Play Again
            </button>
          </div>
        </div>
      )}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleFlip={handleFlip}
            displayFront={
              card === flippedCard1 || card === flippedCard2 || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
