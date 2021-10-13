import firebase from "firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
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


const deleteAccount = async (uid) => {
  try {
    const user = app.auth().currentUser;
    const data = app.firestore();
    user.delete();
    data.collection("usuarios").doc(uid).delete();
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

const registerWithEmailAndPassword = async (photoPerfil, name, genero, edad, email, carrera, facultad,matchuid, gustos, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("usuarios").doc(user.uid).set({
      uid: user.uid,
      photoPerfil,
      name,
      genero,
      edad,
      email,
      carrera,
      facultad,
      matchuid,
      gustos,
      authProvider: "local"
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const editprofile = async (photoPerfil, carrera, facultad, gustos) => {
  try {
    const user = app.auth().currentUser
    await db.collection("usuarios").doc(user.uid).update({
      photoPerfil,
      carrera,
      facultad,
      gustos,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendResetEmail = async (email) => {
  try {
    const auth = app.auth();
    auth.sendPasswordResetEmail(email)
    alert("Se ha enviado el enlace para restablecer la contraseña al email!");
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
  editprofile,
  sendResetEmail,
  logout,
};
