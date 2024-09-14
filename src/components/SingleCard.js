import React from "react";
import "./SingleCard.css";

function SingleCard({ card, handleFlip, displayFront, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleFlip(card);
    }
    console.log("flipped card", card);
  };

  return (
    <div className="card">
      <div className={displayFront ? "displayFront" : ""}>
        <img
          className="front"
          src={card.src}
          alt="card front"
          width={200}
          height={200}
        />
        <img
          className="back"
          src="./img/cover.png"
          onClick={handleClick}
          alt="card back"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default SingleCard;
