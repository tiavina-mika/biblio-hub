import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authentication';

class Logout extends React.Component {
	componentWillMount() {
		this.props.logout();
	}
	render() {
		return null;
	}
}

Logout = connect(null, { logout })(Logout);

export default Logout;