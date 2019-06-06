import React from 'react';
import { connect } from 'react-redux';
import SignupForm from '../forms/signup';
import { signup } from '../../redux/actions/authentication';

class Signup extends React.PureComponent {
  onSubmit = (form) => {
    this.props.signup(form.name, form.email, form.password);
    this.props.onClose();
  }
  render() {
    return (
         <SignupForm onSubmit={this.onSubmit} variant="outlined" fullWidth={true}/>
    );
  }
}

export default connect(null, { signup })(Signup);