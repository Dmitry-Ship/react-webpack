import React, { PropTypes } from 'react';

import { fileUploader } from './FileUploader.styl';

const FileUploader = ({
    name,
    id,
    placeholder,
    required,
    onChange,
    label,
    fileType,
    className }) => (
  <input
    id={id}
    type="file"
    className={`${fileUploader} ${className}`}
    name={name}
    placeholder={placeholder}
    required={required}
    onChange={onChange}
    accept={fileType}
  />
);

export default FileUploader;

// FileUploader.defaultProps = {
//   inputRenderer: (value) => { return value ? value.name :  }
// }
FileUploader.defaultProps = {
  className: '',
};

FileUploader.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  inputRenderer: PropTypes.func,
};
