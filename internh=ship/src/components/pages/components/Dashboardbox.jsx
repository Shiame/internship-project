import React, { useEffect, useState } from 'react';
import './Dashboardbox.css';
import useAxios from '../../../utils/useAxios';

function Dashboardbox() {
  const [totalFiles, setTotalFiles] = useState(0);
  const api = useAxios();

  useEffect(() => {
    fetchTotalFiles();
  }, []);

  const fetchTotalFiles = async () => {
    try {
      const response = await api.get('/files/total_files/');
      setTotalFiles(response.data.total_files);
    } catch (error) {
      console.error('Error fetching total files:', error);
    }
  };

  return (
    <div className='boxinfo'>
      <i className="fa-regular fa-folder-open"></i>
      <span className="text">
        <h2>Total des Fichiers</h2>
        <p>{totalFiles}</p>
      </span>
    </div>
  );
}

export default Dashboardbox;