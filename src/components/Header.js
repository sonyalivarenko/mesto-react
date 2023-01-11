import React from 'react';
import headerLogo from '../images/Vector_logo.svg';

export default function Header() {
  return (
    <div className="header">
         <img className="header__logo" src={headerLogo} alt="Векторный логотип" />
    </div>
  );
}