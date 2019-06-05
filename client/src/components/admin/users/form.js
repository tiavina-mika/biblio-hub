import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { renderTextField, renderSelect } from '../../forms/fields';
import { shallowCompare } from '../../../utils/shallow-compare';


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
	flatButton: {
		borderRadius: 2,
		color: '#000',
		padding: '7px 18px 6px 18px',
		'&:hover': {
			backgroundColor: '#ebebeb'
		}
	},
	chip: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
});

class Form extends React.Component {
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

		const { handleSubmit, loading, pristine, classes } = this.props;
		const data = this.props.initialValues;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} loading={loading}>
				<Field
					name="email"
					type="email"
					component={renderTextField}
					placeholder="Email"
					variant="outlined"
					label="Email de l'utilisateur"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="name"
					type="text"
					component={renderTextField}
					placeholder="Nom"
					variant="outlined"
					label="Nom de l'utilisateur"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="password"
					type="password"
					component={renderTextField}
					placeholder="Mot de passe"
					variant="outlined"
					label="Mot de passe"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="confirm"
					type="password"
					component={renderTextField}
					placeholder="Confirmation mot de passe"
					variant="outlined"
					label="Confirmation Mot de passe"
					className={classes.fieldLabel}
					fullWidth />

				<div style={{marginTop: 15, marginBottom: 15, textAlign: 'left'}}>
					<Field
						name='role'
						label='Role' 
						fullWidth 
						component={renderSelect} 
						>
							<MenuItem value="ADMIN">Administrateur</MenuItem>
							<MenuItem value="USER">Simple Utilisateur (par defaut)</MenuItem>
					</Field>
					{data &&
					    <Chip
								label={`${data.role}`}
								className={classes.chip}
								variant="outlined"
						/> 
					}
				</div>
    			<Button
					type="submit"
					color="primary"
					variant="contained" 
					disabled={loading}
					className={classNames(classes.buttonLabel,classes.containedButton)}
					fullWidth>
						Enregistrer
				</Button>
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

Form.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
		reduxForm({
			form: 'admin-user-form',
			touchOnBlur: false,
			validate
		})(withStyles(styles)(Form))
	);