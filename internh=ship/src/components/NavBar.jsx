import { useEffect, useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "./button";
import './NavBar.css';


function NavBar() {
    const [click, setClick]= useState(false);
    const [button, setButton] = useState(true);
    
 


    const handleClick = () => {
        setClick(!click);
    }
    const closeMobileMenu = () => {
        setClick(false);}


     const showButton=() => {
            if(window.innerWidth<=960){
                setButton(false);
            }else {
                setButton(true);
            }
        }

        window.addEventListener('resize', showButton)

        useEffect(() => {
            showButton();
        }, [])

  

  return (
    <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img className="navBar-img" src="src/assets/logoMaroc.png" alt="MAPM" />
                        <br/>
                        <p>Ministère de l'Agriculture, de la Pêche maritime,
                        du Développement rural et des Eaux et forêts </p>
                      
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fa-solid fa-times' : 'fa-solid fa-bars'} />
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='https://www.agriculture.gov.ma/fr/accueil' className="nav-links" onClick={closeMobileMenu}>Qui sommes-nous ?</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to='/FMS/SignIn.jsx' className="nav-links-mobile" onClick={closeMobileMenu}>
                                Se Connecter
                            </Link>
                        </li>
                    </ul>

                     { Button && <Button path="/SignIn" buttonStyle={'btn--navbar' } buttonSize={'btn--medium'}>Se Connecter</Button>}
                
                </div>
            </nav>
        </>
    );
}

export default NavBar
