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
        <div className='header'>
        <svg width="161" height="140" viewBox="0 0 205 178" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M153.435 88.7793L203.825 118.373L153.435 147.967L102.479 177.561V118.373L153.435 88.7793Z" fill="#874B4B"/>
          <path d="M51.5223 88.7793L0 118.373L51.5223 147.967L102.478 177.561V118.373L51.5223 88.7793Z" fill="#874B4B"/>
          <path d="M0.565918 59.1855V118.373L51.522 147.967V88.7795L0.565918 59.1855Z" fill="black"/>
          <path d="M204.391 59.6934V118.523L153.78 147.938V89.1082L204.391 59.6934Z" fill="#0083C1"/>
          <path d="M205 59.0742V118.262L153.78 147.856V88.6681L205 59.0742Z" fill="black"/>
          <path d="M102.441 59.0744L51.2203 88.6683L0 59.0744L51.2203 29.4805L102.441 59.0744Z" fill="black"/>
          <path d="M153.661 29.48L102.44 59.0739L51.2202 29.48L102.44 0L153.661 29.48Z" fill="black"/>
          <path d="M153.661 118.375L102.44 147.969L51.2202 118.375L102.44 88.7812L153.661 118.375Z" fill="white"/>
          <path d="M153.661 88.7814L102.44 118.375L51.2202 88.7814L102.44 59.1875L153.661 88.7814Z" fill="white"/>
          <path d="M204.881 59.0744L153.661 88.6683L102.44 59.0744L153.661 29.4805L204.881 59.0744Z" fill="black"/>
        </svg>
        <div className='header-text'>
        <h1 class="hero-header">Store Your Mind </h1>
        <em>A tool to better monitor your thoughts</em>
        </div>
        </div>

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