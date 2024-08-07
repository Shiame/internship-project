import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'


function footer() {
  return (
    <div className='footer-container'>
    
      <section className="footer-section">
       <div className='footer-section-logo'>
       <img src='src\assets\logoMaroc.png'/>
       <div>
       <h2>La Direction </h2>
       <h2>des Systèmes </h2>
       <h2>d’Information</h2>
       </div>
        <div>
            
            <p className="footer-section-heading">Ministère de l'agriculture,de la pêche maritime,du développement rural et des eaux et forêts</p>
          
          </div>
        </div> 
        <div className="footer-section-adresse">
            <i class="fa-solid fa-location-dot"></i>
            <p>Avenue Mohamed V, Quartier administratif Place Abdellah Chefchaouni B.P. 607, Rabat</p>

        </div>
        <div className="footer-section-tel">
            <i class="fa-solid fa-phone"></i>
            <p>Tél : 212 (0)537 66 53 00 / 537 66 54 50 / 537 66 56 00</p>
            
        </div>
      </section>
      <section className="social-media">
        <div className="social-media-wrap">
            <div className="footer-icons">
                <Link className="social-icons-instagram"
                to="https://www.instagram.com/agricultureaumaroc/"
                target="_blank"> 
                <i class="fa-brands fa-instagram"></i>
                </Link>
                <Link className="social-icons-twitter"
                to="/"
                target="_blank"> 
                <i class="fa-brands fa-twitter"></i>
                </Link>
                <Link className="social-icons-youtube"
                to="https://www.youtube.com/channel/UCraaObP0dAPEZP_k1SYmoaA"
                target="_blank"> 
                <i class="fa-brands fa-youtube"></i>
                </Link>
            </div>
        </div>
      </section>
    </div>
  )
}

export default footer

