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

            <IconButton className="swipeButtons__right">
                <svg width={0} height={0}>
                    <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                        <stop offset={0} stopColor="rgb(30, 14, 175)" />
                        <stop offset={1} stopColor="rgb(8, 234, 241)" />
                    </linearGradient>
                </svg>
                <FavoriteIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__repeat">
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__left">
                <CloseIcon fontSize="large" />
            </IconButton>


        </div>
    )
}

export default SwipeButtons