import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SingleCard from './components/SingleCard';


function App() {
  return (
    <div>
      <Routes>
          <Route path="" exact element={ <Home /> } />
          <Route path="/card" exact element={ <SingleCard /> } />
      </Routes>
    </div>
  )
}

export default App;
