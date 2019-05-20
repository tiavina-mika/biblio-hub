import React from 'react';
import { connect } from 'react-redux';
import SigninForm from '../forms/signin';
import { signin } from '../../redux/actions/authentication';

class Signin extends React.PureComponent {
  onSubmit = (form) => {
    this.props.signin(form.email, form.password, this.props.currentUrl);
    this.props.onClose();
  }
  render() {
    return (
        <SigninForm onSubmit={this.onSubmit} variant="outlined" />
    );
  }
}

export default connect(null, { signin })(Signin);