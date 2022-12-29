import './App.css';
import { getFirebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import Header from './Components/Header';
import Background from './Components/Background';
import photo from './Components/Images/pokemon-city.png';
import React, { useState, useEffect } from 'react';

function App() {
  const [numPoke, setNumPoke] = useState(3);
  const [pokeLeft, setPokeLeft] =useState({
    Squirtle: true,
    Smeargle: true,
    Kabuto: true
});
const [counter, setCounter] = useState(0);
const [isActive, setIsActive] = useState(false);
const [username, setUsername] = useState('');
const [gamePopUp, setGamePopUp] = useState('block');

  const db = getFirestore();

    const checkLocation = async (Poke) => {
      const querySnapshot = await getDocs(collection(db, Poke));
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data().xRef);
        arr.push(doc.data().yRef);
      });
      return arr;
}

  const catchedPoke = () => {
    setNumPoke(numPoke -1);
}

  // replace true with false at hook
  const displayPoke = (poke) => {
    if (poke === 'Squirtle') {
        setPokeLeft((prevState) => ({
            ...prevState,
            Squirtle: false,
        }))
    } else if (poke === 'Smeargle') {
        setPokeLeft((prevState) => ({
            ...prevState,
            Smeargle: false,
        }))
    } else if (poke === 'Kabuto') {
        setPokeLeft((prevState) => ({
            ...prevState,
            Kabuto: false,
        }))
    }
}

  // Setup timer
  useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setCounter(counter => counter + 1);
        }, 1000);
      } else if (!isActive && counter !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
  }, [isActive, counter]);

  // toggle timer
  const toggleTimer = () => {
    if (!isActive) {
      return setIsActive(true);
    }
    setIsActive(false);
  }

  // save username
  const saveUsername = (event) => {
    event.preventDefault()
    setUsername(event.target[0].value);
    setGamePopUp('none');
  }

  const renderGamePopUp = () => {
    if (gamePopUp === 'block') {
      return (
        <div className='gamePopUp' style={{display: gamePopUp}}>
        <div className='gamePopUpShadow'>
        <div className='gamePopUpContainer'>
          <h3>Enter your name to catch Pokemons!</h3>
          <form onSubmit={saveUsername}>
          <input type='text' className='inputUsername' id='inputUsername' maxLength="12" required></input>
          <input type='submit'></input>
          </form>
        </div>
        </div>
      </div>
      )
    }
  }


  return (
    <div className="App">
      <Header numPoke={numPoke} pokeLeft={pokeLeft} counter={counter}/>
      <Background photo={photo} checkLocation={checkLocation} catchedPoke={catchedPoke} pokeLeft={pokeLeft} displayPoke={displayPoke} toggleTimer={toggleTimer}/>
      {renderGamePopUp()}
    </div>
  );
}

export default App;

// Initialize Firebase Performance Monitoring
getPerformance();

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
