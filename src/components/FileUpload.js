import React, { useState } from 'react';
import '../FileUpload.css'; // Import the CSS file for styling

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Replace 'your_backend_endpoint' with the actual endpoint URL
      const response = await fetch('your_backend_endpoint', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // Process your response here
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload the file.');
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Error uploading the file.');
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" onChange={handleFileChange} accept=".csv" />
        <button type="submit">Upload CSV</button>
      </form>
    </div>
  );
};

export default FileUpload;
