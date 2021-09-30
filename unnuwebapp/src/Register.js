import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./DB/firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) alert("");
    registerWithEmailAndPassword(name, edad, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
        />
        <input
          type="text"
          className="register__textBox"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="Edad"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electronico"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button className="register__btn" onClick={register}>
          Registrarse
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Registrarse con google
        </button>

        <div>
          Ya tienes cuenta? <Link to="/">Iniciar sesión </Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
