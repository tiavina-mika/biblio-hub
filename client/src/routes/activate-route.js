import React from 'react';
import { connect } from 'react-redux';

class ActivateRoute extends React.Component {
	componentWillMount() {
		const { authenticated, userEmail, history: { push }, match: { params: { email, token } } } = this.props;
		// getInvite(email, token)
		// 	.then(result => {
		// 		if (!result) push('/');
		// 		if (!result.user && !authenticated) push(`/signup?email=${encodeURIComponent(email)}&token=${token}`);
		// 		if (!result.user && authenticated) logoutRedirect(`/signup?email=${encodeURIComponent(email)}&token=${token}`);
		// 		if (result.user && !authenticated) push(`/signin?email=${encodeURIComponent(email)}&redirect=/accept/${token}`);
		// 		if (result.user && authenticated && email === userEmail) push(`/accept/${token}`);
		// 		if (result.user && authenticated && email !== userEmail) logoutRedirect(`/signin?email=${encodeURIComponent(email)}&redirect=/accept/${token}`);
		// 	});
	}
	render() {
		return null;
	}
}

const mapStateToProps = state => ({
	authenticated: state.user.get('authenticated'),
	isAdmin: state.user.get('isAdmin'),
	userEmail: state.user.get('email'),
});
ActivateRoute = connect(mapStateToProps)(ActivateRoute);

export default ActivateRoute;