import React from 'react';
import { Link } from 'react-router-dom';

import { link } from './FancyLink.scss';

const FancyLink = ({ children, className, ...rest}) => (
  <Link className={`${link} ${className}`} {...rest} >
    <h3 >
      {children}
    </h3>
  </Link>
);

export default FancyLink;