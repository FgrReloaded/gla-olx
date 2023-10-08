import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA8TGR5MvhkkZufKHnRkuhYRYPxS0ZyKCE",
  authDomain: "chat-9f807.firebaseapp.com",
  projectId: "chat-9f807",
  storageBucket: "chat-9f807.appspot.com",
  messagingSenderId: "215293272700",
  appId: "1:215293272700:web:7a2107312b1fa92f215ff9",
  measurementId: "G-PHPPT6GEMB"
};
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };