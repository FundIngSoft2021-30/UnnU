
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/firebase-firestore'
import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { firestore } from 'firebase-admin';


const firebaseConfig = {
    apiKey: "AIzaSyB95Iw8IUQgR_4nXLIz8ETsCB-YohHhCnQ",
    authDomain: "unnu-007.firebaseapp.com",
    projectId: "unnu-007",
    storageBucket: "unnu-007.appspot.com",
    messagingSenderId: "528011385990",
    appId: "1:528011385990:web:94cba36e0f33e89eca8507",
    measurementId: "G-52MFSC7T5N"
  };
console.log(defaultProject.name)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.getFirestore();

export default {firebase, db,};
