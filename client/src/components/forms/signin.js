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
	flatButton: {
		borderRadius: 2,
		color: '#000',
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
		this.props.history.push('/forgot');
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
					component={renderTextField}
					placeholder="Mot de passe"
					label="Entrez votre mot passe"
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
					Connexion
				</Button>
                <Button
					classes={{colorInherit: classes.flatButton}}
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
    } else if (!/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(values.email)) {
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