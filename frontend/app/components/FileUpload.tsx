'use client'

import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

type UploadResponse = {
  status: string
}

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const file = fileList ? fileList[0] : null;

    setSelectedFile(file);
  };

  const uploadFile = async () => {
    try {
      if (!selectedFile) {
        setError(true);
        setMessage('Por favor, selecione um arquivo.');
        return;
      }

      setUploading(true);
      setError(false);
      setMessage('');

      await axios.post<UploadResponse>(
        'http://localhost:8000/transations/upload',
        selectedFile,
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      );

      setMessage('Arquivo enviado com sucesso, suas transações começaram a ser processadas!');
    } catch (error) {
      setMessage('Falha no upload. Tente novamente.');
      setError(true);
      console.error(error);
    } finally {
      setUploading(false);
    }    
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <input 
        type="file" 
        onChange={selectFile} 
        className={`
          file:mr-4 file:mb-5 file:py-2 file:px-4 file:block file:w-full
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
        `}
      />
      <button
        onClick={uploadFile}
        className={`
          px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        disabled={uploading}
      >
        {uploading ? 'Enviando...' : 'Enviar Arquivo'}
      </button>
      {message && <p className={`text-sm mt-2 ${error ? 'text-red-300' : 'text-green-300'}`}>{message}</p>}
    </div>
  );
};

export default FileUpload;
