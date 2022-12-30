import './App.css';
import { getFirebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import {
  getFirestore,
  collection,
  getDocs,
  serverTimestamp,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import Header from './Components/Header';
import Background from './Components/Background';
import photo from './Components/Images/pokemon-city.png';
import Scores from './Components/scores';
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
const [highscore, setHighscore] = useState('');
const [loadHS, setLoadHS] = useState(0);
const [loadScoreboard, setLoadScoreboard] = useState(false);

  const db = getFirestore();

    // check location of poke
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
    toggleTimer();
  }

  // stops timer when 0 pokes are left
  useEffect(() => {
    if (numPoke === 0) {
      toggleTimer();
      uploadScore();
      setLoadHS(1);
      setNumPoke(false);
    }
  }, [numPoke]);

  // Saves a new score to Cloud Firestore.
async function uploadScore() {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), 'Scoreboard'), {
      Name: username,
      Score: counter,
      Timestamp: serverTimestamp()
    });
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

// load scores from firebase
const getScore = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'Scoreboard'), orderBy('Score', 'asc'), orderBy('Timestamp', 'asc')));
  let arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
    console.log(doc.data());
  });
  setHighscore(arr);
}

  //render game popup before starting game
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
    useEffect(() => {
      if (loadHS === 1) {
        getScore();
        setLoadScoreboard(true);
      }
    }, [loadHS]);

  // generate template for each score
  const scoreContainer = () => {
    let scoreArr = [];
    for (let i = 0; i < highscore.length; i++) {
      scoreArr.push(
      <Scores 
       key={i} 
       index={i} 
       username={highscore[i].Name}
       score={highscore[i].Score}/>
       )
     }
     return (
      <div className="allScores">
     {scoreArr}
   </div>
     )
  }

  // render scoreboard after game
  const renderScoreboard = () => {
    if (loadScoreboard) {
      return (
        <div className='scoreboard'>
          <div className='scoreboardShadow'>
            <div className='scoreboardContainer'>
              <h2>Scoreboard</h2>
              {scoreContainer()}
            </div>
          </div>
        </div>
      )
    }
  }


  return (
    <div className="App">
      <Header numPoke={numPoke} pokeLeft={pokeLeft} counter={counter} username={username}/>
      <Background photo={photo} checkLocation={checkLocation} catchedPoke={catchedPoke} pokeLeft={pokeLeft} displayPoke={displayPoke} toggleTimer={toggleTimer}/>
      {renderGamePopUp()}
      {renderScoreboard()}
    </div>
  );
}

export default App;

// Initialize Firebase Performance Monitoring
getPerformance();

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
