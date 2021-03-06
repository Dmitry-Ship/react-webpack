import PropTypes from 'prop-types';
import React from 'react';

const Icon = ({ children, name, className, ...rest }) => (
  <i {...rest} className={`${className} material-icons`} >
    {name}
    {children}
  </i>
);

export default Icon;

Icon.defaultProps = {
  className: '',
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
};
