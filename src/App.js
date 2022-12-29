import './App.css';
import { getFirebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getPerformance } from 'firebase/performance';
import Header from './Components/Header';
import Background from './Components/Background';
import photo from './Components/Images/pokemon-city.png';
import React, { useState, useEffect } from 'react';

function App() {


  return (
    <div className="App">
      <Header />
      <Background photo={photo}/>
    </div>
  );
}

export default App;

// Initialize Firebase Performance Monitoring
getPerformance();

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
