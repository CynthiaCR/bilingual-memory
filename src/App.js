import React, { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

import "./App.css";

const cardImages = [
  { key: 1, src: "/img/bike.png", matched: false },
  { key: 2, src: "/img/chocolate.png", matched: false },
  { key: 3, src: "/img/coffee.png", matched: false },
  { key: 4, src: "/img/flowers.png", matched: false },
  { key: 5, src: "/img/meditate.png", matched: false },
  { key: 6, src: "/img/water.png", matched: false },
];

const cardTranslation = [
  { key: 1, src: "/img/bike_spanish.png", matched: false },
  { key: 2, src: "/img/chocolate_spanish.png", matched: false },
  { key: 3, src: "/img/coffee_spanish.png", matched: false },
  { key: 4, src: "/img/flowers_spanish.png", matched: false },
  { key: 5, src: "/img/meditate_spanish.png", matched: false },
  { key: 6, src: "/img/water_spanish.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [flippedCard1, setFlippedCard1] = useState(null);
  const [flippedCard2, setflippedCard2] = useState(null);
  const [disabled, setDisabled] = useState(false);

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

  // start the game - show the cards
  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div className="App">
      <h3>Strengthen your memory, expand your vocabulary!</h3>
      <button onClick={shuffle}> New Game</button>
      {/* <p>Turns: {turns}</p> */}
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
