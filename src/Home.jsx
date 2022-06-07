import { useRef, useState, useEffect } from 'react';
import "./css/Home.css"
import Input from './components/Input.jsx';
import SingleCard from './components/SingleCard.jsx';


function Home() {
  const [memories, setMemories] = useState([]);
  const dbUrl = "https://store-your-mind-default-rtdb.europe-west1.firebasedatabase.app/memories.json"

  useEffect(() => {  
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const memoriesFromDb = [];
      for (const key in responseBody) {
          memoriesFromDb.push(responseBody[key]);
        }
      setMemories(memoriesFromDb);
    })
  },[]);
  function deleteMemory(memory) {
    const index = memories.findIndex(element => element.what === memory.what);
    memories.splice(index,1);
    setMemories(memories.slice());

    fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(memories),
        "headers": {
            "Content-Type": "application/json"
        }
    })
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '.' + mm + '.' + yyyy;
 
  return (
    <div className="App">
      <div>
        <h1 class="hero-header">Store Your Mind</h1> <br />
        <Input />
      </div>
      <h2 class="already-stored">Already Stored</h2>
      
      { memories.map(element =>
          <div className = "wrapper">
            <div>< SingleCard /></div>
            <div className="card"> 
              <div>{element.what}</div>
              <div>{element.how}</div>
              <div className="date">date</div>
            </div>
          </div>)}
    </div>);
}

export default Home;