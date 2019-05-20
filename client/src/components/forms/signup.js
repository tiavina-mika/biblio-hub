import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderTextField } from './fields';

import { shallowCompare } from '../../utils/shallow-compare';

const styles = {
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
};

class SignupForm extends React.Component {
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
	onSignin = () => {
		this.props.history.push('/signin');
	}
	onSubmit = (form) => {
		this.props.onSubmit(form);
	}
	render() {
		const { handleSubmit, loading, classes, variant } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field
					name="name"
					type="name"
					component={renderTextField}
					// disabled={disabled}
					placeholder="Entrer votre pseudo"
					label="Pseudo"
					variant={variant}
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="email"
					type="email"
					component={renderTextField}
					// disabled={disabled}
					placeholder="Entrer votre email"
					variant={variant}
					label="Email"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="password"
					type="password"
					component={renderTextField}
					placeholder="Mot de passe"
					label="Entrez votre mot de passe"
					variant={variant}
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="confirm"
					type="password"
					component={renderTextField}
					placeholder="Confirmation"
					label="Confirmez votre mot de passe"
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
            Creér
          </Button>
			</form>
		);
  }
}

const validate = (values) => {
	const errors = {};
	if (!values.email || values.email.length === 0) {
		errors.email = "Email requis";
	} else if (!/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(values.email)) {
    errors.email = "Email invalide";
  }
	if (!values.password || values.password.length === 0) {
		errors.password = "Mot de passe requis";
	}
	if (!values.confirm || values.confirm.length === 0) {
		errors.confirm = "Confirmation de mot de passe requis";
	} else if (values.confirm !== values.password) {
		errors.confirm = "Confirmation de mot de passe invalide";
	}
	return errors;
};

SignupForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
		reduxForm({
			form: 'signup-form',
			touchOnBlur: false,
			validate
		})(withStyles(styles)(SignupForm))
	);