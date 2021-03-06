import React from 'react';
import PropTypes from 'prop-types';
import ChangePasswordFrom from 'components/forms/ChangePasswordForm';
import Heading from 'components/basic/Heading';
import FancyLink from 'components/basic/FancyLink';
import styles from './ChangePasswordCard.scss';

const ChangePasswordCard = ({ onForgotClick, ...rest }) => (
  <div className={styles.card} >
    <Heading>Change password</Heading>
    <ChangePasswordFrom {...rest} />
    <FancyLink to="#" onClick={onForgotClick} >Forgot your password?</FancyLink>
  </div>
);

ChangePasswordCard.propTypes = {
  onForgotClick: PropTypes.func.isRequired,
};

export default ChangePasswordCard;
