import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { renderTextField, fileUpload, renderSelect } from '../../forms/fields';
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

		const { handleSubmit, loading, pristine, classes, history: { push } } = this.props;
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
					{ !data && loading &&
						<Field
							name="password"
							type="text"
							component={renderTextField}
							placeholder="Mot de passe"
							variant="outlined"
							label="Mot de passe"
							className={classes.fieldLabel}
							fullWidth />}
				{ !data && loading && <Field
						name="confirm"
						type="password"
						component={renderTextField}
						placeholder="Confirmation"
						label="Confirmez votre mot de passe"
						className={classes.fieldLabel}
						fullWidth /> }
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
	if (values.name && values.name.length > 100) {
		errors.name = "Nom trop long";
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