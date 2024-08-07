import React from 'react'
import { Button } from './button'
import './homeSection.css'

function homeSection  () {
  return (
    <div className='hero-container'>
      <video src="public/videos/videoplayback.mp4" autoPlay loop muted />
      <p>Ministère de l'Agriculture, de la Pêche maritime,
         du Développement rural et des Eaux et forêts</p>
         <h1>La Direction des Systèmes d’Information</h1>

      <div className='hero-btns'>
        <Button className='btns' buttonStyle='btn--outline'
        buttonSize='btn--larger' path='https://www.agriculture.gov.ma/fr/accueil'>SITE PRINCIPAL</Button>

      </div>
    </div>
    
  )
}

export default homeSection
