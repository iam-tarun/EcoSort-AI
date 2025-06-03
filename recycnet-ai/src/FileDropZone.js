import React, { useState, useCallback, useRef } from 'react'
import classify from './fastService';

function FileDropZone() {

  const [file, setFile] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [classification, setClassification] = useState(null);
  const [conf, setConf] = useState(null);
  const [fileSubmitted, setFileSubmitted] = useState(false);

  const fileInputRef = useRef(null);


  const handleClickToUpload = (e) => {
    if(!file)
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile))
    } else {
      alert('Please select a valid image file.');
    }
  }


  const [loading, setLoading] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];

    if(droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreviewURL(URL.createObjectURL(droppedFile));
    } else {
      alert('Please drop a valid image file.');
    }

    setHighlight(false);
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setHighlight(false);
  }

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setFileSubmitted(true);
    try {
      const result = await classify(file);
      setConf(result.confidence_score);
      setClassification(result.prediction_class);
      setLoading(false);
    } catch (error) {
      alert("Error classifying image. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleFileClose = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setFile(null);
    setClassification(null);
    setFileSubmitted(false);
    setConf(null);
    setPreviewURL(null);
  }

  return (
    <div className={`drop-zone ${highlight ? 'highlight' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClickToUpload}
    >
      {file && !loading ? (
        <div className='drop-display' >
        <button className="close" onClick={handleFileClose} >x</button>
        <div className='preview-img-wrapper' >
          <img src={previewURL} alt="preview" /> 
        </div>
        <div>
          <button className='submit' disabled={fileSubmitted} onClick={handleFileSubmit} >Submit</button>
        </div>
        {
          (classification && fileSubmitted) ? (
              <div className='results' >
                <h4>It is {classification}</h4>
                <h4>Confidence Score: {Math.trunc(conf * 100)}</h4>
              </div>
          ) : (
            <></>
          )
        }
        </div>
      ): !file && !loading ? (
        <>
        <input type="file" accept="image/*" style={{display: 'none'}} ref={fileInputRef} onChange={handleFileSelect} capture="environment" />
        <p> Drag & Drop or click to upload your image here </p>
        </>
      ) : (
        <div className="loading-spinner"></div>
      )}
    </div>
  )
}

export default FileDropZone