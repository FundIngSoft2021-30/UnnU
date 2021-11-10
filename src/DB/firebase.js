import firebase from "firebase";
import "firebase/storage";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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

const registerWithEmailAndPassword = async (photoPerfil, name, genero, edad, email, carrera, facultad, mensajes, matchuid, likesdados,numEventos, likesrecibidos, gustos, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    user.sendEmailVerification();
    await db.collection("usuarios").doc(user.uid).set({
      uid: user.uid,
      photoPerfil,
      name,
      genero,
      edad,
      email,
      carrera,
      facultad,
      mensajes,
      matchuid,
      likesdados,
      likesrecibidos,
      gustos,
      numEventos,
      authProvider: "local"
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const crearEvento = async (Eventsxuser, uid, nombreusuario) => {
  try {
    const res = app.auth().currentUser
    const user = res.user;
    await db.collection("eventos").doc(uid).set({
      uid,
      nombreusuario,
      Eventsxuser
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const cambiarEvento = async (nombreusuario, currentEvents, uid) => {
  try {
    const res = app.auth().currentUser
    const user = res.user;

    await db.collection("eventos").doc(user.uid).update({
      uid,
      nombreusuario,
      currentEvents
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const eliminarEvento = async (nombre) => {
  try {
    const data = app.firestore();
    data.collection("eventos").doc(nombre).delete();
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

const likesXusuario = async (likesdados) => {
  try {
    const user = app.auth().currentUser
    await db.collection("usuarios").doc(user.uid).update({
      likesdados
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const matchXusuario = async (uid, matchuid) => {
  try {
    await db.collection("usuarios").doc(uid).update({
      matchuid,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const likesrecibidosxusuario = async (uidpersonalike, likesrecibidos) => {
  try {

    await db.collection("usuarios").doc(uidpersonalike).update({
      likesrecibidos
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
    alert("Se ha enviado el enlace para restablecer la contraseña al email, el email se demora en llegar asi que no te preocupes!");
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
  crearEvento,
  cambiarEvento,
  eliminarEvento,
  likesXusuario,
  sendResetEmail,
  likesrecibidosxusuario,
  matchXusuario,
  logout,
};
