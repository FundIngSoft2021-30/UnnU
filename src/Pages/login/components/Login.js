import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../../DB/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import '../../../App.css';
import './login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) history.replace("/match");
    }, [user, loading]);

    return (
        <div className="loginbg" >
            <div className="login">

                <div className="login__container">
                    <h1 className="logo">UNNU</h1>
                    <div className="nav-buttons">
                        <Link className="Linktxt" to="/login">
                            <button id="loginBtn" class="active" >Iniciar sesion</button>
                        </Link>
                        <Link className="Linktxt" to="/sign-up">
                            <button id="registerBtn" >Crear cuenta</button>
                        </Link>
                    </div>
                    <input
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electronico"
                    />
                    <input
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                    />
                    <button
                        className="login__btn"
                        onClick={() => signInWithEmailAndPassword(email, password)}
                    >
                        Iniciar sesión
                    </button>
                    <div className="Linkbox">
                        <Link className="Linktxt" to="/reset">Olvidaste la contraseña?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;