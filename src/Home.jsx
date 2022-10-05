import {useState} from 'react';
import "./css/Home.scss"
import Input from './components/Input.jsx';
import logo from './assets/logo.svg';

function Home() {
  
  const [showHero, setShowHero] = useState(true);
  const [showApp, setShowApp] = useState(false);

  const togglehero = () => {
    setShowHero(current => !current);
    setShowApp(current => !current);
  }
  
  return (
    <div className="App">
        <div className={showHero ? "header" : "no-header"}>
          <div className='hero-header-box'>
            <h1 className="hero-header">
              <span className="hero-header-main">Quiksave</span>
              <span className="hero-header-sub">Simple notepad</span>
            </h1>
            <div className="hero-logo">
                <img src={logo} alt="store-your-mind-logo"></img>
            </div>
            <div className="button-container">
              <div onClick={togglehero}className="button hero-button">Write</div>
            </div>
          </div>
        </div>
        {showApp && <Input />}  
    </div>)
}
export default Home;


// Flip card
/* useEffect(() => {  
  fetch(dbUrl).then(response => response.json())
  .then(responseBody => {
    const memoriesFromDb = [];
    for (const key in responseBody) {
        memoriesFromDb.push(responseBody[key]);
      }
    setMemories(memoriesFromDb);
    const cardOutput = memoriesFromDb.map((element, index) => {return  {id: index +1, variant: "click", front: element.what, front1: element.category, back1: element.how, back2: element.why}})
    setFlipCards(cardOutput);
  })
},[]);
*/
