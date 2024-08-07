import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      console.log("logged in successfully");
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/FMSHome");
      Swal.fire({
        title:"Connexion avec succès",
        icon: "success",
        toast: true,
        timer: 6000,
        position: 'bottom-right',
        timerProgressBase: true,
        showConfirmButton: false
      })
    } else {
      console.log(response.status);
      console.log("try again! issue");
      Swal.fire({
        title:"An Error occured, try again!",
        icon: "error",
        toast: true,
        timer: 6000,
        position: 'bottom-right',
        timerProgressBase: true,
        showConfirmButton: false
      })
    }
  };

  const registerUser = async (email, username, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password2,
      }),
    });

    if (response.status === 201) {
      navigate("/SignIn");
      Swal.fire({
        title:"inscription avec succès, se connecter maintement ..",
        icon: "success",
        toast: true,
        timer: 5000,
        position: 'bottom-right',
        timerProgressBase: true,
        showConfirmButton: false
      })
    } else {
      console.log(response.status);
      console.log("try again! issue");
      Swal.fire({
        title:"échec!! ",
        icon: "error",
        toast: true,
        timer:5000,
        position: 'top-right',
        timerProgressBase: true,
        showConfirmButton: false
      })
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
    Swal.fire({
      title:"vous êtes déconnecter ...",
      icon: "success",
      toast: true,
      timer: 4000,
      position: 'top-right',
      timerProgressBase: true,
      showConfirmButton: false
    })
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
