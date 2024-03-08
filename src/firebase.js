// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu4vlFKamvw19a7vhqbJV_qCSTDSL252Y",
  authDomain: "printerest-clone-ef4d6.firebaseapp.com",
  projectId: "printerest-clone-ef4d6",
  storageBucket: "printerest-clone-ef4d6.appspot.com",
  messagingSenderId: "1036893170682",
  appId: "1:1036893170682:web:4d5702f84653e100321243",
  measurementId: "G-7KG2F3G2T9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
