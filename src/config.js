import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDeD0WogSkWlPu1wD7VK3o_q7iKvMfIcqo",
  authDomain: "login-app-786.firebaseapp.com",
  projectId: "login-app-786",
  storageBucket: "login-app-786.appspot.com",
  messagingSenderId: "285629337150",
  appId: "1:285629337150:web:0d9e1b1ea3a37b2c828b6f",
  measurementId: "G-9ZMLCSWY5X"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export default {app , auth , db};


 