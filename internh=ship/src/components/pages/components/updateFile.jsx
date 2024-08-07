import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import NavBarFMS from "./NavBarFMS";
import "./AddFile.css";

export default function UpdateFileForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const api = useAxios();

  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      const response = await api.patch(`/files/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert("fichier mise à jour avec succès!!");
      navigate("/UploadPage");
    } catch (err) {
      console.error("Update error:", err);
      setError("An error occurred while updating the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBarFMS />
      <div className="container my-4">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Mise à jour votre fichier</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group row mb-3">
              <label htmlFor="name" className="col-sm-4 col-form-label">Nom de fichier</label>
              <div className="col-sm-8">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="description" className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea
                  id="description"
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-sm-4 col-form-label">Choisir un fichier</label>
              <div className="col-sm-8">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <div className="offset-sm-4 col-sm-8 d-flex justify-content-between">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                  style={{backgroundColor:"#317131"}}
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
                <Link to="/UploadPage">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    disabled={isLoading}
                  >
                    Annuler
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
