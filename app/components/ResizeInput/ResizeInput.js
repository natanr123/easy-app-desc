import React from 'react';

const ResizeInput = (props) => (
  <div className="loading-indicator">
    ---------------------------------------------------------
    <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
      <p>RESIZE {`${props.prefix}${props.targetWidth}x${props.targetHeight}`}</p>

      <input type="file" onClick={(event) => {
        event.target.value = null;
      }} onChange={(e) => {
        // this.props.handleFileUpload(e, `icon${props.targetWidth}x${props.targetHeight}`);
        props.onChange(e, `${props.prefix}${props.targetWidth}x${props.targetHeight}`)
      }}
      />
    </form>
    <div>
      <img style={{ width: '100px', height: '100px' }} alt={props.url} src={props.url} />
    </div>
  </div>
);

export default ResizeInput;
