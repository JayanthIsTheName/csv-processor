import React, { useState } from 'react';
import axios from 'axios';
import './FileUploader.css';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [columns, setColumns] = useState('');
  const [tableData, setTableData] = useState([]);
  const [errorColumns, setErrorColumns] = useState([]);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleColumnsChange = (e) => {
    setColumns(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else if (url) {
      formData.append('url', url);
    }
    
    formData.append('columns', columns);

    try {
      const response = await axios.post('http://your-api-gateway-url/api/process-csv/', formData);
      setTableData(response.data.table_data);
      setErrorColumns(response.data.missing_columns);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  return (
    <div className="container">
      <div className="upload-section">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <p>OR</p>
        <input 
          type="text" 
          placeholder="Enter CSV URL" 
          value={url} 
          onChange={handleUrlChange} 
        />
      </div>

      <div className="columns-section">
        <input 
          type="text" 
          placeholder="Enter column names (comma-separated)" 
          value={columns} 
          onChange={handleColumnsChange} 
        />
      </div>

      <button onClick={handleSubmit}>Process CSV</button>

      {errorColumns.length > 0 && (
        <div className="error-box">
          Missing columns: {errorColumns.join(', ')}
        </div>
      )}

      {tableData.length > 0 && (
        <table className="result-table">
          <thead>
            <tr>
              {Object.keys(tableData[0]).map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileUploader; 