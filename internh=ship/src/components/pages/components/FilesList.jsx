import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBarFMS from './NavBarFMS';
import Pagination from './pagination';
import useAxios from '../../../utils/useAxios';
import './FilesList.css';

function FilesList() {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/files/');
      console.log('API Response:', response.data);

      let filesData = [];
      if (Array.isArray(response.data)) {
        filesData = response.data;
      } else if (response.data.results && Array.isArray(response.data.results)) {
        filesData = response.data.results;
      } else if (typeof response.data === 'object') {
        filesData = Object.values(response.data);
      }

      console.log('Processed Files:', filesData);
      setFiles(filesData);
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to fetch files. Please try again later.');
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await api.delete(`/files/${id}/`);
        fetchFiles(); // Refetch files after deleting
      } catch (error) {
        console.error('Error deleting file:', error);
        setError('Failed to delete file. Please try again later.');
      }
    }
  };

  // Filter files based on search query
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(query.toLowerCase()) ||
    file.description.toLowerCase().includes(query.toLowerCase())
  );

  // Get current files
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='container my-4'>
        <h2 className="text-center title">Mes téléchargements</h2>
        
        <div className="col">
          <Link to='/AddFileForm'>
            <button className="btn btn-primary custom-btn mt-1">Ajouter</button>
          </Link>
        
          <input
            className="search"
            placeholder="  Rechercher..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {!isLoading && filteredFiles.length === 0 && !error && (
          <p>No files found. Try adjusting your search or adding new files.</p>
        )}

        {filteredFiles.length > 0 && (
          <table className="table mt-5">
            <thead>
              <tr>
                <th><i className="fa-solid fa-arrow-up-short-wide"></i></th>
                <th>Date Uploaded</th>
                <th>Nom de Fichier</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map((file, index) => (
                <tr key={file.id}>
                  <td>{index + 1 + (currentPage - 1) * filesPerPage}</td>
                  <td>{new Date(file.uploaded_at).toLocaleDateString()}</td>
                  <td>{file.name}</td>
                  <td>{file.description}</td>
                  <td style={{ width: "5", whiteSpace: "nowrap" }}>
                    <Link to={`/UpdateFile/${file.id}`}>
                      <button className='button btn-edit'>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                    <button type="button" className="button btn-delete" onClick={() => handleDelete(file.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination 
          currentPage={currentPage} 
          totalPages={Math.ceil(filteredFiles.length / filesPerPage)} 
          onPageChange={paginate} 
        />
      </div>
    </>
  );
}

export default FilesList;
