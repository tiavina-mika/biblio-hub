import React from 'react';
import { connect } from 'react-redux';

import { removeError } from '../redux/actions/error';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

const messages = {
	'error.INCORRECT_PASSWORD':  'Mot de passe incorect' ,
};

class ErrorSnackbar extends React.Component {
	onSnackbarClose = () => {
		this.props.removeError();
	}
	render() {
		const { errorMessage, theme } = this.props;
		const { palette: {secondary: { main }}} = theme;
		if (!errorMessage) return null;
		// if (errorMessage === 'KnowledgeContentSuccess') {
		// 	return (
		// 		<Snackbar
		// 			open
		// 			autoHideDuration={1500}
		// 			action={
		// 				<Button color="inherit" style={{color: main}} size="small" onClick={this.onSnackbarClose}>
		// 					<FormattedMessage id="button.close" />
		// 				</Button>
		// 			}
		// 			message={<FormattedMessage id={`error.${errorMessage}`} />}
		// 			onClose={this.onSnackbarClose}/>
		// 	);

		// }
		return (
			<Snackbar
				open
				action={
					<Button color="inherit" style={{color: main}} size="small" onClick={this.onSnackbarClose}>
						close
					</Button>
				}
				// message={<FormattedMessage id={`error.${errorMessage}`} />}
				message={messages[`error.${errorMessage}`]}
				onClose={this.onSnackbarClose} />
		);
	}
}

const mapStateToProps = state => ({
	errorMessage: state.errors
});

export default connect(mapStateToProps, { removeError })(withTheme()(ErrorSnackbar));
