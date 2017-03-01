import React, { Component, PropTypes } from 'react';

import Icon from '../Icon';

import { defaultLabel, heading, image, button, deleteIcon } from './FormFileUploader.styl';

export default class FormFileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
      preview: null,
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpload(e) {
    const theImage = e.target.files[0];
    const reader = new FileReader();

    const setSrc = (event) => {
      this.setState({
        preview: event.target.result,
        fileName: theImage.name,
      });
      this.props.onChange(theImage, event.target.result);
    };

    reader.onload = setSrc;

    reader.readAsDataURL(e.target.files[0]);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      preview: null,
      fileName: null,
    });
  }

  render() {
    const {
      name,
      id,
      text,
      required,
      fileType,
      className } = this.props;
    return (
      <div className={className} >
        <h2 className={heading} >
          {text}
        </h2>
        <label className={defaultLabel} htmlFor={id} >
          <div
            className={image}
            style={{
              backgroundImage: `url(${this.state.preview || this.props.preview})`, position: 'relative'
            }}
          >
            {this.state.preview || this.props.preview && <Icon
              name="close"
              className={deleteIcon}
              onClick={this.handleClick}
            />}
          </div>

          <div className={button}>Upload</div>
        </label>

        <input
          id={id}
          type="file"
          style={{ display: 'none' }}
          name={name}
          required={required}
          onChange={this.handleUpload}
          accept={fileType}
        />
      </div>
    );
  }
}

FormFileUploader.defaultProps = {
  className: '',
  text: '',
  fileType: 'image/*',
  id: 'fileUploader',
  name: 'image',
  required: false,
};


FormFileUploader.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  fileType: PropTypes.string,
};
