import React from 'react'

const FooterComponent = () => {
  return (
    <div className='footer-wrapper' >
      <h5>Built with FastAPI . PyTorch . EfficientNet</h5>
      <h5>Trained using Garbage Dataset From Kaggle</h5>
      <h5>Recycnet AI can make mistakes, please check if you are not sure.</h5>
      <div className="link-wrapper">
        <a href="https://github.com/iam-tarun/Recycnet-AI">GitHub</a>
        <a href="https://www.kaggle.com/datasets/sumn2u/garbage-classification-v2">Dataset</a>
        <a href="https://logo.com/dashboard">Logo</a>
        <a href="https://doi.org/10.48550/arXiv.1905.11946">Paper</a>
      </div>
      <p>An OTT Creation</p>
    </div>
  )
}

export default FooterComponent