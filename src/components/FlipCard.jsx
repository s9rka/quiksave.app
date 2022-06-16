import { useState, useEffect } from 'react';
import cn from "classnames";

function FlipCard({ card }) {
  const [showBack, setShowBack] = useState(false);
  
  function handleClick() {
    if (card.variant === "click") {
      setShowBack(!showBack);
    }
  }

  return ( 
  <div>
    
    
    <div className="flip-card-outer"
      onClick={handleClick}>
      <div
        className={cn("flip-card-inner", {
          showBack,
          "hover-trigger": card.variant === "hover"
        })}
      >
        
        <div className="card front">
        
          <div className="card-body">
            <div className="card-text-content">{card.front}</div>
            <p className="card-text-content">{card.front1}</p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body">
            <div className="card-text-source">{card.back1}</div>
            <p className="card-text-meaning">{card.back2}</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default FlipCard;