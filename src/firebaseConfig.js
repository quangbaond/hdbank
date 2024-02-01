// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVy8P-tdhITSlm8TK9MhWy--onWHU4Dqw",
    // authDomain: "localhost",
    projectId: "hdbank-41467",
    // storageBucket: "hdbank-1221d.appspot.com",
    // messagingSenderId: "129342467350",
    appId: "1:659540809132:web:0a2b48105335d4e5ded609",
    // measurementId: "G-WXBNF0YQW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth(app)


export { app, auth }