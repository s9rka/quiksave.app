import { Routes, Route } from 'react-router-dom';
import React from "react";
import './App.css';
import Home from './Home';
import Storage from './components/Storage';




export default function App() {

  

  return (
        <Routes>
            <Route path="" exact element={ <Home /> } />
            <Route path="/storage" exact element= { <Storage />} />
        </Routes>
  );
}
