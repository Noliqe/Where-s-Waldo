import './App.css';
import { getFirebaseConfig } from './firebase-config.js';
import Header from './Components/Header';
import photo from './Images/pokemon-city.png';
import React, { useState, useEffect } from 'react';

function App() {

  const [position, setPosition] = useState(0);
  const [xpos, setXPos] = useState('10px');
  const [ypos, setYPos] = useState('10px');

  function getPos(e){
    let x = e.clientX;
    let y = e.clientY;
    let cursor = "Your Mouse Position Is : " + x + " and " + y ;
    console.log(cursor);
    setXPos(x+'px');
    setYPos(y+'px');
  }


  return (
    <div className="App">
      <Header />
      <div className='backgroundPhoto'>
        <img src={photo} alt='pokemon' className='photo' onClick={getPos}></img>
      </div>
      <div className='clickSquare' style={{ left: xpos, top: ypos}}></div>
    </div>
  );
}

export default App;
