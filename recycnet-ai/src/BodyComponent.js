import React from 'react'
import FileDropZone from './FileDropZone'

const BodyComponent = () => {
  return (
    <div className='body-wrapper'>
      <div className="drag-zone">
        <FileDropZone/>
      </div>
    </div>
  )
}

export default BodyComponent