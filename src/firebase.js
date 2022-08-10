// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWnnmNvi8W3Zs42KpPUesDKq-uQe1zvbo",
  authDomain: "wheretogo-193c7.firebaseapp.com",
  databaseURL: "https://wheretogo-193c7-default-rtdb.firebaseio.com",
  projectId: "wheretogo-193c7",
  storageBucket: "wheretogo-193c7.appspot.com",
  messagingSenderId: "208225636620",
  appId: "1:208225636620:web:ec3db4364de6375ee0f929",
  measurementId: "G-1FE4CK9JLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);