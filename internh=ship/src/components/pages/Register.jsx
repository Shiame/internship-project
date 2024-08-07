import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';


const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = e => {
      e.preventDefault();
      const email = e.target.email.value;
      const username = e.target.username.value;
      const password = e.target.password.value;
      const password2 = e.target.password2.value;

      email.length > 0 && registerUser(email,username, password,password2);
      
  };
  return (
    <>
    <nav className='nav-FMS'>
        <div className='nav-links'>
        <Link to='/'  style={{color:"#317131"}}> <i class="fa-solid fa-arrow-left"></i> Retour</Link></div>
        <Link to ='/FMSHome' className="nav-logo"  style={{marginLeft:"36%"}}>

<img src="src\assets\logo-FMS.png" alt="FMS" />
</Link>
      </nav>
      <form onSubmit={handleSubmit}>
      <div className='container-sign'>
        <div className="header"> 
          <div className="text">S'inscrire</div>
          <div className="underline"></div>
          </div>
          <div className="inputs">
          <div className="input">
              <img src=".\src\assets\email.png" alt="" />
              <input name='email' type="email" placeholder='email ...' />
            </div>
          <div className="input">
              
              <img src=".\src\assets\person.png" alt="" />
              <input name='username' type="text" placeholder='nom & prénom ...'/>
            </div>
          
            <div className="input">
              <img src=".\src\assets\password.png" alt="" />
              <input name='password' type="password" placeholder='mot de passe ...'/>
            </div>
            <div className="input">
              <img src=".\src\assets\password.png" alt="" />
              <input name='password2' type="password" placeholder='reecrire votre mot de passe ...'/>
            </div>
          </div>
          <div className="submit-container">
           <Link to="/SignIn" className = "submit gray" >Se Connecter</Link>  
           <button type="submit" className="submit">S'inscrire</button>

          </div>

      </div>
      </form>
      
    </>
  )
}

export default Register
