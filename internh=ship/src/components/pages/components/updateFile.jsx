import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import NavBarFMS from "./NavBarFMS";
import "./AddFile.css";

export default function UpdateFile() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const api = useAxios();
  const { id } = useParams();

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await api.get(`/files/${id}/`);
        const { name, description } = response.data;
        // Populate the form fields with the current file data
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
      } catch (err) {
        setError("Failed to load file data. Please try again.");
      }
    };

    fetchFileData();
  }, [id, api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);

    // Log the FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await api.patch(`/files/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        navigate("/UploadPage");
      } else {
        setError("Failed to update file. Please try again.");
      }
    } catch (err) {
      setError("Failed to update file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBarFMS />
      <div className="container my-4">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Mettre à jour votre fichier</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Nom de Fichier</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                  rows="3"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Choisir un fichier</label>
              <div className="col-sm-8">
                <input
                  type="file"
                  className="form-control"
                  name="file"
                />
              </div>
            </div>
            <div className="row bttn">
              <div className="offset-sm-2 col-sm-4 button-group">
                <button 
                  type="submit" 
                  className="btn1 btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Enregistrer'}
                </button>
              </div>
              <div className="col-sm-2 button-group">
                <Link to="/UploadPage">
                  <button className="btn btn2 btn-primary" disabled={isLoading}>Annuler</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
