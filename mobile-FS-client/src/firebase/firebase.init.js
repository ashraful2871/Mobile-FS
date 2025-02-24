// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALmARTF7zcaYAUOFce1AufLMRXXplBYJ0",
  authDomain: "mobile-fs.firebaseapp.com",
  projectId: "mobile-fs",
  storageBucket: "mobile-fs.firebasestorage.app",
  messagingSenderId: "73077308037",
  appId: "1:73077308037:web:68e64cec0a7c69da4747ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
