import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import HttpsIcon from '@material-ui/icons/Https';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import IconButton from '@material-ui/core/IconButton';

import { renderInput } from './fields';

import { shallowCompare } from '../../utils/shallow-compare';

const styles = theme => ({
	buttonLabel: {
		textTransform: 'uppercase',
	},
	containedButton: {
		paddingTop: theme.spacing.unit * 1.2,
		paddingBottom: theme.spacing.unit * 1.2,
		marginTop: '22px',
		borderRadius: 2,
		'&:hover': {
			backgroundColor: 'rgba(60,141,188, .6)'
		},
	},
	linkContainer: {
		paddingTop: 25,
	},
	link: {
		textDecorartion: 'none',
		color: theme.palette.primary.main,
		marginLeft: 10,
		fontSize: 18,
	},
	typography: {
		fontSize: 18,
		color: '#fff'
	},
	form: {
		[theme.breakpoints.up('md')]: {
			width: '50%',
			marginLeft: 'auto',
			marginRight: 'auto',
    }
	},
	formFullWidth: {
		[theme.breakpoints.up('md')]: {
			width: '100%',
    }
	},
	paper: {
    display: 'flex',
		alignItems: 'center',
		overflow: 'hidden',
		marginTop: theme.spacing.unit * 2.5,
		marginBotton: theme.spacing.unit * 2.5,

		// height:  theme.spacing.unit * 6
    // width: 400,
  },
  input: {
    paddingLeft: theme.spacing.unit,
    flex: 1,
  },
  iconButton: {
		padding: 10,
		backgroundColor: '#e9ecef',
		// height:  theme.spacing.unit * 6,
		borderRadius: 0,
		borderRight: '1px solid #c7c8c9',
		color: '#5a5b5b'
  },
});

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
		const { handleSubmit, loading, classes, variant, backgroundColor, fullWidth } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className={fullWidth ? classes.formFullWidth : classes.form}>
				  <Paper className={classes.paper}>
							<IconButton className={classes.iconButton} aria-label="Menu">
								<FolderSharedIcon />
							</IconButton>
								<Field
									name="name"
									type="name"
									component={renderInput}
									placeholder="Nom Complet"
									label="Pseudo"
									variant={variant}
									className={classes.input}
									backgroundColor={backgroundColor}
									fullWidth />
							</Paper>

							<Paper className={classes.paper}>
									<IconButton className={classes.iconButton} aria-label="Menu">
										<EmailIcon />
									</IconButton>
									<Field
										name="email"
										type="email"
										component={renderInput}
										backgroundColor={backgroundColor}
										placeholder="Adresse Email"
										variant={variant}
										label="Email"
										className={classes.input}
										fullWidth />
							</Paper>
							<Paper className={classes.paper}>
									<IconButton className={classes.iconButton} aria-label="Menu">
										<LockIcon />
									</IconButton>
									<Field
										name="password"
										type="password"
										component={renderInput}
										backgroundColor={backgroundColor}
										placeholder="Mot de passe"
										label="Entrez votre mot de passe"
										variant={variant}
										className={classes.input}
										fullWidth />
							</Paper>
							<Paper className={classes.paper}>
								<IconButton className={classes.iconButton} aria-label="Menu">
										<HttpsIcon />
								</IconButton>
								<Field
									name="confirm"
									type="password"
									component={renderInput}
									backgroundColor={backgroundColor}
									placeholder="Confirmation de mot de passe"
									label="Confirmez votre mot de passe"
									variant={variant}
									className={classes.input}
									fullWidth />
							</Paper>
							
							<Button
									type="submit"
									color="primary"
									variant="contained" 
									disabled={loading}
									className={classNames(classes.buttonLabel,classes.containedButton)}
									fullWidth>
									Creér
							</Button>
							{!fullWidth && <div className={classes.linkContainer}>
									<Typography className={classes.typography}>Vous avez déjà un compte? <Link to="/signin" className={classes.link}>Connectez-vous</Link></Typography>
							</div>}
			</form>
		);
  }
}

const validate = (values) => {
	const errors = {};
  if (!values.email) {
    errors.email = 'Email requis'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Addresse email invalide'
  }
	if (!values.password || values.password.length === 0) {
		errors.password = "Mot de passe requis";
	}
	if (!values.confirm || values.confirm.length === 0) {
		errors.confirm = "Confirmation de mot de passe requis";
	} else if (values.confirm !== values.password) {
		errors.confirm = "Confirmation de mot de passe invalide";
	}
	if(!/[0-9]/.test(values.password)) {
		errors.password = "Le mot de passe doit avoir au moins un chiffre";
	}
	if(!/[a-z]/i.test(values.password)) {
		errors.password = "Le mot de passe doit avoir au moins une lettre";
	}
	if(values.password && values.password.length < 6) {
		errors.password = "Le mot de passe doit avoir au moins 6 caractères";
	}
	if(values.password && values.password.length > 20) {
		errors.password = "Le mot de passe doit avoir au plus 20 caractères";
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