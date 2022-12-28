// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_8i5_0LjCSzRnI1RO3uO7fwCupqgFdOg",
  authDomain: "whereiswaldo-2b048.firebaseapp.com",
  projectId: "whereiswaldo-2b048",
  storageBucket: "whereiswaldo-2b048.appspot.com",
  messagingSenderId: "231900435702",
  appId: "1:231900435702:web:8c9ab569c2f0bbdd3b48d7",
  measurementId: "G-1JHFXDBD9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function getFirebaseConfig() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return firebaseConfig;
    }
  }