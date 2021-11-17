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
                    {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
                    <AutoRotatingCarousel

                        label="Comenzar"
                        ButtonProps={<Buutton href="/match">Comenzar</Buutton>}
                        open={true}
                        onClose={() => setHandleOpen({ open: false })}
                        onStart={() => setHandleOpen({ open: false })}
                        autoplay={false}
                        style={{ position: "absolute" }}
                    >
                        <Slide
                            media={
                                <img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />
                            }
                            mediaBackgroundStyle={{ backgroundColor: red[400] }}
                            style={{ backgroundColor: red[600] }}
                            title="This is a very cool feature"
                            subtitle="Just using this will blow your mind."
                        />
                        <Slide
                            media={
                                <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />
                            }
                            mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                            style={{ backgroundColor: blue[600] }}
                            title="Ever wanted to be popular?"
                            subtitle="Well just mix two colors and your are good to go!"
                        />
                        <Slide
                            media={
                                <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />
                            }
                            mediaBackgroundStyle={{ backgroundColor: green[400] }}
                            style={{ backgroundColor: green[600] }}
                            title="May the force be with you"
                            subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
                        />
                    </AutoRotatingCarousel>
                </div>
            </div>
        </>
    );
}

export default PrimerosPasoSC;