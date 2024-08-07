import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBarFMS from './NavBarFMS';
import Pagination from './pagination';
import useAxios from '../../../utils/useAxios';

const Table = () => {
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
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to fetch files. Please try again later.');
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (fileId) => {
    try {
      const response = await api.get(`/files/${fileId}/download/`, { responseType: 'blob' });
      const contentType = response.headers['content-type'];
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'file';
  
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (fileNameMatch.length === 2)
          fileName = fileNameMatch[1];
      }
  
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };
  const handleCopyLink = async (fileId) => {
    try {
      const response = await api.get(`/files/${fileId}/generate_shared_link/`);
      if (response.data && response.data.share_url) {
        console.log(`Generated share URL: ${response.data.share_url}`);  // Debugging line
        navigator.clipboard.writeText(response.data.share_url);
        alert('Link copied to clipboard!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error generating share link:', error);
      alert('Failed to generate share link. Please try again.');
    }
  };
  
  

  // Filter files based on search query
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(query.toLowerCase()) ||
    (file.description && file.description.toLowerCase().includes(query.toLowerCase()))
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
    <div className='container my-5'>
      <div className="row mb-3">
        <input
          style={{marginBottom:'25px'}}
          className="search"
          placeholder="  Rechercher..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <table className="table ">
          <thead>
            <tr>
              <th>Nom de Fichier</th>
              <th>Description</th>
              <th>Télécharger</th>
              <th>Partager</th>
            </tr>
          </thead>
          <tbody>
            {currentFiles.map((file) => (
              <tr key={file.id}>
                <td>{file.name}</td>
                <td>{file.description}</td>
                <td>
                  <button 
                    onClick={() => handleDownload(file.id)} 
                    style={{textDecoration:'none', color:'#317131', background: 'none', border: 'none', cursor: 'pointer'}}
                  >
                    {file.name} <i className="fa-solid fa-download"></i>
                  </button>
                </td>
                <td style={{width:"120px"}}>
                  <button 
                    className='btn-edit' 
                    style={{width:'110px', marginLeft:'10px'}} 
                    onClick={() => handleCopyLink(file.id)}
                  >
                    Copier le lien
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredFiles.length / filesPerPage)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default Table;