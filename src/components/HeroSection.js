import React from 'react';
import '../App.css';
import { ButtonRS } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='/images/image2-home.jpeg'/>
      <h1>Encuentra nuevos amigos</h1>
      <p>Que estas esperando?</p>
      <div className='hero-btns'>
        <ButtonRS
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          CREAR CUENTA
        </ButtonRS>
      </div>
    </div>
  );
}

export default HeroSection;
