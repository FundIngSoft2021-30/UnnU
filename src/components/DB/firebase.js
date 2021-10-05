import firebase from "firebase";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJ6toDLOGsOo1X8s2r9UPEooXkQ9vRvV0",
  authDomain: "unnuapp-52499.firebaseapp.com",
  databaseURL: "https://unnuapp-52499-default-rtdb.firebaseio.com",
  projectId: "unnuapp-52499",
  storageBucket: "unnuapp-52499.appspot.com",
  messagingSenderId: "132126522043",
  appId: "1:132126522043:web:2c2901ec48a055c339079e",
  measurementId: "G-FVKD3BER01"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = firebase.storage();


const deleteAccount = async () => {
  try {
    const user = app.auth().currentUser
    user.delete()
  } catch (err) {
    console.error(err);
    alert(err.message);
  }

};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, edad, email, carrera, facultad, gustos, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("usuarios").add({
      uid: user.uid,
      name,
      edad,
      email,
      carrera,
      facultad,
      gustos:[],
      authProvider: "local"
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await firebase.resetPassword(email)
    alert("Se ha enviado el enlace para restablecer la contraseña al email!");
    this.navigation.navigate('Login')
  } catch (err) {
    console.error(err);
    alert(err.message);
  }

};

const logout = () => {
  auth.signOut();

};

export {
  auth,
  storage,
  db,
  deleteAccount,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
