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



  return (
    <div className="App">
      <Header numPoke={numPoke} pokeLeft={pokeLeft}/>
      <Background photo={photo} checkLocation={checkLocation} catchedPoke={catchedPoke} pokeLeft={pokeLeft} displayPoke={displayPoke}/>
    </div>
  );
}

export default App;

// Initialize Firebase Performance Monitoring
getPerformance();

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
