import React, { useContext } from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function SignIn() {
    const { loginUser } = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        email.length > 0 && loginUser(email, password);
        console.log(email);
        console.log(password);
    };

    return (
        <>
            <nav className='nav-FMS'>
                <div className='nav-links'>
                    <Link to='/' style={{ color: "#317131" }}>
                        <i className="fa-solid fa-arrow-left"></i> Retour
                    </Link>
                </div>
                <Link to='/FMSHome' className="nav-logo" style={{ marginLeft: "36%" }}>
                    <img src="src/assets/logo-FMS.png" alt="FMS" />
                </Link>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className='container-sign'>
                    <div className="header">
                        <div className="text">Se Connecter</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src=".\src\assets\email.png" alt="email" />
                            <input name="email" type="email" placeholder='email ...' />
                        </div>
                        <div className="input">
                            <img src=".\src\assets\password.png" alt="password" />
                            <input name="password" type="password" placeholder='mot de passe ...' />
                        </div>
                    </div>
                    <div className="submit-container">
                        <Link to="/Register" className="submit gray">S'inscrire</Link>
                        <button type="submit" className="submit">Se connecter</button>
                    </div>
                </div>
            </form>
        </>
    );
}
