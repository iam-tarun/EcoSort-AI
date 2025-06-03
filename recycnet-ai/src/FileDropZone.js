import React, { useState, useCallback } from 'react'
import classify from './fastService';

function FileDropZone() {

  const [file, setFile] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [classification, setClassification] = useState(null);
  const [conf, setConf] = useState(null);
  const [fileSubmitted, setFileSubmitted] = useState(false);

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
    setFileSubmitted(true);

    const result = await classify(file);
    console.log(result);
    setConf(result.confidence_score);
    setClassification(result.prediction_class);
  }

  return (
    <div className={`drop-zone ${highlight ? 'highlight' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {file ? (
        <>
        <div className='preview-img-wrapper' >
        <img src={previewURL} alt="preview" /> 
        </div>
        <div>
          <button onClick={handleFileSubmit} >Submit</button>
        </div>
        {
          (classification && fileSubmitted) ? (
            <> 
              <div>
                <h4>It is {classification}</h4>
                <h4>Confidence Score {conf * 100}</h4>
              </div>
            </>
          ) : (
            <></>
          )
        }
        </>
      ): (
        <p> Drag & Drop your file here </p>
      )}
    </div>
  )
}

export default FileDropZone