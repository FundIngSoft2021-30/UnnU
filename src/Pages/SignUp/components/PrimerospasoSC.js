import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { red, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { Link, useHistory } from "react-router-dom";
import Buutton from '@mui/material/Button';
import {
    auth,
    registerWithEmailAndPassword,
    storage
} from "../../../DB/firebase";


import "./primerospasoSC.css"

function PrimerosPasoSC() {
    const history = useHistory();
    const [user, loading, error] = useAuthState(auth);
    const [handleOpen, setHandleOpen] = useState({ open: false });
    const [skip, setSkip] = useState(false);


    const handleClick = () => {
        console.log(skip);
        setSkip(true);
    };


    useEffect(() => {
        if (loading) return;
        console.log(skip);
        if (skip) history.replace("/match");
    }, [user, loading]);



    const matches = useMediaQuery("(max-width:600px)");
    return (
        <>
            <div className="sign-upbg">
                <div>
                    <AutoRotatingCarousel
                        className="carousel"
                        label="Comenzar"
                        ButtonProps={<Buutton href="/match">comenzar</Buutton>}
                        open={true}
                        onClose={() => setHandleOpen({ open: true })}
                        onStart={() => setHandleOpen({ open: false })}
                        autoplay={false}

                        style={{ position: "absolute" }}
                    >
                        <Slide
                            media={
                                <img src='/images/pantalla.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: red[400] }}
                            style={{ backgroundColor: red[600] }}
                            title="Esta es la pantalla calendario"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_3.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: red[400] }}
                            style={{ backgroundColor: red[600] }}
                            title="Esta es la pantalla calendario"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_2.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                            style={{ backgroundColor: blue[600] }}
                            title="Esta es la pantalla de Tengo suerte"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_6.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                            style={{ backgroundColor: blue[600] }}
                            title="Esta es la pantalla de Tengo suerte"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_1.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: green[400] }}
                            style={{ backgroundColor: green[600] }}
                            title="Esta es la pantalla de match"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_6.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: green[400] }}
                            style={{ backgroundColor: green[600] }}
                            title="Esta es la pantalla de match"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_4.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: green[400] }}
                            style={{ backgroundColor: blue[700] }}
                            title="Esta es la pantalla de chat"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_7.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: green[400] }}
                            style={{ backgroundColor: blue[400] }}
                            title="Esta es la pantalla de chat"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_5.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: red[400] }}
                            style={{ backgroundColor: red[600] }}
                            title="Esta es la pantalla perfil"
                        />
                        <Slide
                            media={
                                <img src='/images/pantalla_8.jpg' />
                            }
                            mediaBackgroundStyle={{ backgroundColor: red[400] }}
                            style={{ backgroundColor: red[600] }}
                            title="Esta es la pantalla perfil"
                        />
                    </AutoRotatingCarousel>
                </div>
            </div>
        </>
    );
}

export default PrimerosPasoSC;