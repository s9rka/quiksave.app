import { Routes, Route } from 'react-router-dom';
import React from "react";
import './css/main.scss';
import Home from './Home';
import Storage from './components/Storage';
import Input from './components/Input';


export default function App() {
    
  return (
    <Routes>
      <Route path="" exact element={<Home />} />
      <Route path="/storage" exact element={<Storage />} />
      <Route path="/quiksave" exact element={<Input />} />
    </Routes>
  );
}