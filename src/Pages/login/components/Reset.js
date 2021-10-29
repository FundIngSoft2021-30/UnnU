import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendResetEmail } from "../../../DB/firebase";
import "./Reset.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/user-home");
  }, [user, loading]);

  return (
    <div className="resetbg">
      <div className="reset">
        <div className="reset__container">
          <h1 className="logo">UNNU</h1>
          <h1>Olvidaste contraseña</h1>
          <input
            type="text"
            className="reset__textBox"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electronico"
          />
          <Link to='/login' className='btn-mobile'>
            <button
              className="reset__btn"
              onClick={() => sendResetEmail(email)}
            >

              Restablecer contraseña
            </button>
          </Link>
          <div className="Linkbox">
            No tienes cuenta? <Link className="Linktxt" to="/sign-up">Crear cuenta ahora</Link> .
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
