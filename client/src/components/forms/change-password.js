import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderTextField } from './fields';

import { shallowCompare } from '../../utils/shallow-compare';

const styles = theme => ({
	fieldLabel: {
		textTransform: 'uppercase',
		paddingBottom: 0,
	},
	buttonLabel: {
		textTransform: 'uppercase',
	},
	containedButton: {
		marginTop: '12px',
		borderRadius: 2,
		'&:hover': {
			backgroundColor: 'rgba(60,141,188, .6)'
		}
	},
	linkContainer: {
		paddingTop: 25
	},
	link: {
		textDecorartion: 'none',
		color: theme.palette.primary.main,
		marginLeft: 10
	},
	typography: {
		fontSize: 17
	}
});

class ChangePasswordForm extends React.Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired
	}
	static defaultProps = {
		loading: false
	}
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return shallowCompare(this, nextProps, nextState, nextContext);
	}
	onSubmit = (form) => {
		this.props.onSubmit(form);
	}
	render() {
		const { handleSubmit, loading, classes, variant } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field
					name="password"
					type="password"
					component={renderTextField}
					placeholder="Mot de passe"
					label="Entrez votre ancien mot de passe"
					variant={variant}
					className={classes.fieldLabel}
					fullWidth />
                <Field
					name="newPassword"
					type="password"
					component={renderTextField}
					placeholder="Nouveau mot de passe"
					label="Entrez votre nouveau mot de passe"
					variant={variant}
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="confirm"
					type="password"
					component={renderTextField}
					placeholder="Confirmation"
					label="Confirmez votre nouveau mot de passe"
					variant={variant}
					className={classes.fieldLabel}
					fullWidth />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained" 
                    disabled={loading}
                    className={classNames(classes.buttonLabel,classes.containedButton)}
                    fullWidth>
                    Modifier
                </Button>
			</form>
		);
  }
}

const validate = (values) => {
	const errors = {};
	if (!values.password || values.password.length === 0) {
		errors.password = "Mot de passe requis";
  }
  if (!values.newPassword || values.newPassword.length === 0) {
		errors.password = "Nouveau mot de passe requis";
	}
	if (!values.confirm || values.confirm.length === 0) {
		errors.confirm = "Confirmation du nouveau mot de passe requis";
	} else if (values.confirm !== values.newPassword) {
		errors.confirm = "Confirmation du nouveau mot de passe invalide";
	}
	if(!/[0-9]/.test(values.newPassword)) {
		errors.newPassword = "Le mot de passe doit avoir au moins un chiffre";
	}
	if(!/[a-z]/i.test(values.newPassword)) {
		errors.newPassword = "Le mot de passe doit avoir au moins une lettre";
	}
	if(values.newPassword && values.newPassword.length < 6) {
		errors.newPassword = "Le mot de passe doit avoir au moins 6 caractères";
	}
	if(values.newPassword && values.newPassword.length > 20) {
		errors.newPassword = "Le mot de passe doit avoir au plus 20 caractères";
	}
	return errors;
};

ChangePasswordForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
		reduxForm({
			form: 'signup-form',
			touchOnBlur: false,
			validate
		})(withStyles(styles)(ChangePasswordForm))
	);