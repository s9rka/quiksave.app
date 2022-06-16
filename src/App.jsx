import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';


export default function App() {
  return (
    <div>
      <div>
      <Routes>
          <Route path="" exact element={ <Home /> } />
      </Routes>
    </div>
  </div>
  );
}
