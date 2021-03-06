import PropTypes from 'prop-types';
import React from 'react';
import FancyLink from 'components/basic/FancyLink';
import Heading from 'components/basic/Heading';
import Modal from 'components/basic/Modal';
import LoginForm from 'components/forms/LoginForm';

const LoginModal = ({ closeModal, onForgotClick, onSignUpClick, ...rest }) => (
  <Modal closeModal={closeModal} >
    <Heading>Welcome back</Heading>
    <LoginForm {...rest} />
    <FancyLink to="#" onClick={onForgotClick} >Forgot your password?</FancyLink>
    <FancyLink to="#" onClick={onSignUpClick} >New to Cloverfield? Sign Up here.</FancyLink>
  </Modal>
);

LoginModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onForgotClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
};

export default LoginModal;

