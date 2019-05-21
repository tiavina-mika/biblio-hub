import React from 'react';
import { connect } from 'react-redux';

import { removeError } from '../redux/actions/error';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';

const messages = {
	'error.INCORRECT_PASSWORD':  'Mot de passe incorrect' ,
	'error.INVALID_EMAIL':  'Email invalide' ,
	'error.EMPTY_EMAIL':  'Email requis' ,
	'error.EMPTY_NAME':  'Nom requis' ,
	'error.NAME_LENGTH':  'Le nom devrait avoir entre 5 et 100 caractères',
	'error.BAD_CREDENTIALS' : 'Email ou mot de passe incorrect',
	'error.NETWORK_ERROR' : 'A network error as occured, please contact an administrator',
	'error.UNAUTHORIZED' : 'Données invalides',
	'error.EMAIL_WAS_USED' : `L'email que vous avez entré existe déjà`,
	'error.EMPTY_FIRST_NAME' : `Prenom de l'auteur aquis`,
	'error.EMPTY_FAMILY_NAME' : `Nom de l'auteur aquis`,
	'error.LENGTH_FIRST_NAME' : `Le prenom doit être entre 5 et 100 caractèrres`,
	'error.LENGTH__FAMILY_NAME' : `Le nom doit doit être entre 5 et 100 caractèrres`,
	
};

class ErrorSnackbar extends React.Component {
	onSnackbarClose = () => {
		this.props.removeError();
	}
	render() {
		const { errorMessage, theme } = this.props;
		const { palette: {secondary: { main }}} = theme;
		if (!errorMessage) return null;
		return (
			<Snackbar
				open
				action={
					<Button color="inherit" style={{color: main}} size="small" onClick={this.onSnackbarClose}>
						close
					</Button>
				}
				message={messages[`error.${errorMessage}`]}
				onClose={this.onSnackbarClose} />
		);
	}
}

const mapStateToProps = state => ({
	errorMessage: state.errors
});

export default connect(mapStateToProps, { removeError })(withTheme()(ErrorSnackbar));
