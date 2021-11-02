import React from 'react'
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import './SwipeButton.css';
import { IconButton } from '@material-ui/core';

function SwipeButtons() {
    return (
        <div className="swipeButtons">

            <button className="swipeButtons__right">
                <FavoriteIcon fontSize="large" />
            </button>
            <button className="swipeButtons__repeat">
                <ReplayIcon fontSize="large" />
            </button>
            <button className="swipeButtons__left">
                <CloseIcon fontSize="large" />
            </button>


        </div>
    )
}

export default SwipeButtons