import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import NavBarFMS from "./NavBarFMS";
import "./AddFile.css";

export default function AddFileForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await api.post('/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/UploadPage');
    } catch (error) {
      setError("An error occurred while uploading the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBarFMS />
      <div className="container my-4">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Ajouter un nouveau fichier</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Nom de Fichier</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  onChange={handleFileChange}
                  required
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
                  {isLoading ? 'Uploading...' : 'Valider'}
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
