import React, { PropTypes, Component } from 'react';

import TextField from '../../basic/TextField';
import Form from '../../basic/Form';

import { input } from './ResetPasswordForm.scss';

export default class ResetPasswordForm extends Component {
  constructor() {
    super();
    this.state = {
      confirmPassword: '',
      password: '',
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  handleConfirmPasswordChange(value) {
    const errors = Object.assign({}, this.state.errors, { confirmPassword: '' });
    this.setState({ confirmPassword: value, errors });
  }

  handlePasswordChange(value) {
    const errors = Object.assign({}, this.state.errors, { password: '' });
    this.setState({ password: value, errors });
  }


  handleSubmit(e) {
    e.preventDefault();
    const { confirmPassword, password } = this.state;
    const data = { confirmPassword, password };

    const { isValid, errors } = this.props.validation(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.props.onSubmit(data);
  }

  render() {
    const { confirmPassword, password } = this.state;
    const { errors } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <TextField
          type="password"
          value={password}
          name="newPassword"
          className={input}
          error={errors.password}
          placeholder="New Password"
          onChange={this.handlePasswordChange}
          // required
        />
        <TextField
          type="password"
          value={confirmPassword}
          error={errors.confirmPassword}
          className={input}
          placeholder="Confirm password"
          onChange={this.handleConfirmPasswordChange}
          // required
        />
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};