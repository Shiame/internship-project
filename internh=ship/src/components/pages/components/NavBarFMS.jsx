import React, { useContext, useEffect, useState } from 'react'
import '../FMSHome.css'
import { Link, redirect } from 'react-router-dom'
import useAxios from "../../../utils/useAxios"
import { jwtDecode } from 'jwt-decode'
import AuthContext from '../../../context/AuthContext'

const NavBarFMS = () => {

  const[res, setRes]=useState("")
  const api=useAxios()
  const token = localStorage.getItem("authTokens")

  if(token){
    const decode= jwtDecode(token)
    var user_id= decode.user_id
    var username= decode.username
  }

  
  
  const { logoutUser } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    logoutUser();
    
  }

  return (
    <nav className='nav-FMS'>
        <Link to ='/FMSHome' className="nav-logo">

        <img src="src\assets\logo-FMS.png" alt="FMS" />

        </Link>
        <div className='nav-links'>
        <Link to='/FMSHome' >Home</Link>
        <Link to='/UploadPage'>Téléchargements</Link>
        
        <section className="end">
        <Link to="/" className="nav-profile">
           <span>Bienvenue, </span>
           <span style={{color:"#317131"}}>{username}</span>
        </Link>
        <button onClick={handleClick} style={{border:'none', color: '#B80F0A' }}><i class="fa-solid fa-right-from-bracket"></i></button>
        </section>
        
        
        </div>
        <div className="alert alert-succes">{res}</div>

      </nav>
  )
}

export default NavBarFMS
