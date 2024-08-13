import React, { useState, useEffect } from 'react';
import useAxios from '../../utils/useAxios';
import NavBarFMS from './components/NavBarFMS';

const ProfileManagement = () => {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    profile: {
      full_name: '',
      phone: '',
      adresse: '',
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/users/me/');
      console.log('Fetched profile data:', response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'username') {
      setUserData(prevData => ({ ...prevData, [name]: value }));
    } else {
      setUserData(prevData => ({
        ...prevData,
        profile: { ...prevData.profile, [name]: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending updated profile:', userData);
      const response = await api.patch('/users/me/', userData);
      console.log('Update response:', response.data);
      if (response.status === 200) {
        alert('Profile updated successfully!');
        setUserData(response.data);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <NavBarFMS/>
    <div className="container  d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="col-lg-6 col-md-8 col-sm-10">
        <h2 className="text-center">Votre Profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="full_name" className="form-label">Nom & Prénom</label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              name="full_name"
              value={userData.profile?.full_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">N° de téléphone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={userData.profile?.phone || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adresse" className="form-label">Adresse</label>
            <input
              type="text"
              className="form-control"
              id="adresse"
              name="adresse"
              value={userData.profile?.adresse || ''}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary" style={{background:"#317131", width: "50%"}}>
              Changer Profil
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ProfileManagement;
