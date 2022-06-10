import { useState, useEffect } from 'react';
import cn from "classnames";

function FlipCard({ card }) {
  const [showBack, setShowBack] = useState(false);
  const [memories, setMemories] = useState([]);
  const [flipCards, setFlipCards] = useState([]);
  const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"

  useEffect(() => {  
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const memoriesFromDb = [];
      for (const key in responseBody) {
          memoriesFromDb.push(responseBody[key]);
        }
      setMemories(memoriesFromDb);
      const cardOutput = memoriesFromDb.map((element, index) => {return  {id: index +1, variant: "click", front: element.what, back1: element.how, back2: element.why}})
      setFlipCards(cardOutput);
    })
  },[]);
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
            <p className="card-text-content">{card.front}</p>
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