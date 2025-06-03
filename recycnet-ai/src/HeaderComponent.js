import React from 'react'
import logo from './assets/logo_clean.png';

const HeaderComponent = () => {
  return (
    <div className='header-wrapper'>
      <div className="Img-wrapper">
        <img src={logo} alt="recycnetAI" />
      </div>
      <div className="title">
        <h2>Recycnet AI - Smart Waste Classifier</h2>
      </div>
    </div>
  )
}

export default HeaderComponent