import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import WebSite from './components/pages/website1';
import FMSHome from './components/pages/FMSHome';
import SignIn from './components/pages/SignIn';
import UploadPage from './components/pages/UploadPage.jsx';
import AddFileForm from './components/pages/components/AddFile.jsx';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext.jsx';
import UpdateFile from './components/pages/components/updateFile.jsx';
import Register from './components/pages/Register.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  );
}

function Main() {
  const location = useLocation();
  // Updated the route to match the path pattern
  const hideNavBarRoutes = ["/UpdateFile", "/SignIn", "/FMSHome", "/UploadPage", "/AddFileForm", "/Register"];
  
  const showNavBar = !hideNavBarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/website1" exact element={<WebSite />} />
        <Route path="/Register" exact element={<Register />} />
        <Route path="/SignIn" exact element={<SignIn />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/FMSHome" exact element={<FMSHome />} />
          <Route path="/UploadPage" exact element={<UploadPage />} />
          <Route path="/AddFileForm" exact element={<AddFileForm />} />
          <Route path="/UpdateFile/:id" element={<UpdateFile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
