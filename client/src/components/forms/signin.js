import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderTextField, renderPasswordField } from './fields';

import { shallowCompare } from '../../utils/shallow-compare';

const styles = {
	fieldLabel: {
		// textTransform: 'uppercase',
		paddingBottom: 10,
		marginBottom: 25
	},
	buttonLabel: {
		textTransform: 'uppercase',
	},
	containedButton: {
		marginTop: '12px',
		textTransform: "capitalize",
		borderRadius: 2,
		'&:hover': {
			backgroundColor: 'rgba(60,141,188, .6)'
		}
	},
	flatButton: {
		borderRadius: 2,
		color: '#000',
		textTransform: "capitalize",
		padding: '7px 18px 6px 18px',
		'&:hover': {
			backgroundColor: '#ebebeb'
		}
	},
};

class SigninForm extends React.Component {
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
	onForgotPassword = () => {
		this.props.history.push('/mot-de-passe-oublie');
	}
	onSubmit = (form) => {
		this.props.onSubmit(form);		
	}
	render() {
		const { handleSubmit, loading, classes, variant } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field
					name="email"
					type="email"
					component={renderTextField}
					placeholder="Email"
					label="Entrez votre email"
					variant={variant}
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="password"
					type="password"
					component={renderPasswordField}
					placeholder="Mot de passe"
					label="Entrez votre mot passe"
					variant={variant}
					className={classes.fieldLabel}
					inputStyle={{marginBottom: 20}}
					fullWidth />

                <Button
					type="submit"
					color="primary"
					variant="contained" 
					disabled={loading}
					className={classNames(classes.buttonLabel,classes.containedButton)}
					fullWidth>
					Connexion
				</Button>
                <Button
					className={classes.flatButton}
					style={{marginTop: 15}}
                    onClick={this.onForgotPassword} 
					fullWidth>
					Mot de passe oublié
				</Button>
			</form>
		);
  }
}

const validate = (values) => {
	const errors = {};
	if (!values.email || values.email.length === 0) {
         errors.email = "Email requis";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		 errors.email = "Email requis";
    }
	if (!values.password || values.password.length === 0) {
		errors.password = "Mot de passe requis";
	}
	return errors;
};

SigninForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
		reduxForm({
			form: 'signin-form',
			touchOnBlur: false,
			validate
		})(withStyles(styles)(SigninForm))
	);