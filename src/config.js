import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// new 





// Initialize Firebase
// ... 
const firebaseConfig = {
  apiKey: "AIzaSyAKUfK609B1HVgP3jJIrucWwk96lycRYF0",
  authDomain: "blogging-app-180e5.firebaseapp.com",
  projectId: "blogging-app-180e5",
  storageBucket: "blogging-app-180e5.appspot.com",
  messagingSenderId: "4451930945",
  appId: "1:4451930945:web:cbe424e8e316f8e429c7c0"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export default {app , auth , db};


 