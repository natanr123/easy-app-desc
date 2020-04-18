import React from 'react';

const ResizeScreenshot = (props) => (
  <div className="loading-indicator">
    ---------------------------------------------------------
    <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
      <p>Screenshot {`${props.index}`}</p>

      <input type="file" onClick={(event) => {
        event.target.value = null;
      }} onChange={(e) => {
        // this.props.handleFileUpload(e, `icon${props.targetWidth}x${props.targetHeight}`);
        props.onChange(e, `screenshot${props.index}`);
      }}
      />
    </form>
    <div>
      <img style={{ width: '100px', height: '100px' }} alt={props.url} src={props.url} />
    </div>
  </div>
);

export default ResizeScreenshot;
