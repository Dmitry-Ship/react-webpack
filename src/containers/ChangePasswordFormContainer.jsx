import { connect } from 'react-redux';
import { changePassword } from '../actions/userActions';
import ChangePasswordForm from '../components/forms/ChangePasswordForm';
import validation from '../../helpers/validations/changePassword';
import { getErrorMessage } from '../reducers/userReducer';

const mapStateToProps = store => ({
  errors: getErrorMessage(store),
  validation,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(changePassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);

