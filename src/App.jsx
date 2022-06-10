import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SingleCard from './components/SingleCard';
import FlipCard from './components/FlipCard';
import './components/FlipCard.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

export default function App() {
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
      const cardOutput = memoriesFromDb.map((element, index) => {return  {id: index +1, variant: "hover", front: element.what, back: element.how + element.why}})
      setFlipCards(cardOutput);
    })
  },[]);

  
  const cards = [
    {
      id: "1",
      variant: "hover",
      front: "Hover",
      back: "Back"
    },
    {
      id: "2",
      variant: "click",
      front: "Click",
      back: "Back"
    },
    {
      id: "3",
      variant: "focus",
      front: "Focus",
      back: "Back"
    }
  ];


  return (
    <div>
      <div className="container">
        <div className="row h-100">
          <div class="col d-flex flex-column flex-md-row justify-content-around align-items-center">
            {flipCards.map((card) => (
              <FlipCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
      <div>
      <Routes>
          <Route path="" exact element={ <Home /> } />
          <Route path="/card" exact element={ <SingleCard /> } />
      </Routes>
    </div>
  </div>
  );
}
