// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAP_lMt4koWOJ3YKP5xVpN7AXmsQcFWSSk",
    authDomain: "parkers-market.firebaseapp.com",
    projectId: "parkers-market",
    storageBucket: "parkers-market.appspot.com",
    messagingSenderId: "245800208048",
    appId: "1:245800208048:web:c806021a7b4857dec55d75"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

