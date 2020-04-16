import React from 'react';

import './styles.css';

import LogoImg from '../../assets/logo.png';

export default function Logo() {
  return (
    <div className="logo-container">
      <div className="logo">
        <img src={LogoImg} alt="Coin" />
      </div>
      <div className="shadow"></div>
    </div>
  );
}
