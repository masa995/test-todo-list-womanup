// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpSSaNz5oH-ZSSdcuwoyYjK4HAXjlBUWo",
  authDomain: "test-todo-list-56b22.firebaseapp.com",
  databaseURL: "https://test-todo-list-56b22-default-rtdb.firebaseio.com",
  projectId: "test-todo-list-56b22",
  storageBucket: "test-todo-list-56b22.appspot.com",
  messagingSenderId: "267930648728",
  appId: "1:267930648728:web:36c7210932eb7fbf8050ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);