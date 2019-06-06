import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderTextField, fileUpload } from '../../forms/fields';
import ReactMDE from 'redux-forms-markdown-editor';
import { shallowCompare } from '../../../utils/shallow-compare';

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

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} loading={loading}>
				<Field
					name="first_name"
					type="text"
					component={renderTextField}
					placeholder="Prenom"
					variant="outlined"
					label="Prenom de l'auteur"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="family_name"
					type="text"
					component={renderTextField}
					placeholder="Nom"
					variant="outlined"
					label="Nom de l'auteur"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="date_of_birth"
					type="text"
					component={renderTextField}
					placeholder="Date de naissance"
					label="Date de naissance de l'auteur"
					variant="outlined"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					withRef
					ref={this.setFileInputRef}
					name="photo"
					component={fileUpload}
					variant="outlined"
					type="file"
					// inputStyle={{ display: 'none' }}
					accept="image/*"
					fullWidth
				/>
				<Field
					name="date_of_death"
					type="text"
					component={renderTextField}
					placeholder="Date de décès"
					label="Date de décès de l'auteur"
					variant="outlined"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="description"
					type="text"
					label="Descritpion"
					// multiline
					// rows={10}
					component={ReactMDE}
					placeholder="description"
					label="Biographie de l'auteur"
					className={classes.fieldLabel}
					variant="outlined"
					fullWidth />


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
	if (!values.first_name) {
		errors.first_name = "Prenom requis";
  	}
	if (!values.family_name) {
		errors.family_name = "Nom requis";
	}
	if (values.first_name && values.first_name.length > 100) {
		errors.first_name = "Prenom trop long";
	}
		if (values.family_name && values.family_name.length > 100) {
			errors.first_name = "Nom trop long";
	}

	if (values.date_of_birth && values.date_of_death) {
		if (values.date_of_birth > values.date_of_death) {
			errors.date_of_death = "Date de naissance supérieur à la date de décès";
		}
		if (values.date_of_death - values.date_of_birth < 10) {
			errors.date_of_death = "Trop court";
		}
  	}

	if (values.photo && values.photo[0]) {
		const file = values.photo[0];
		if(file.size > 1000000){
			errors.photo = 'Image trop grand. La limite est de 1Mo';
		} 
		else if (!file.type.includes("image/") ) {
			errors.photo = "Image doit être .jpg, .png ou gif"
		}
	}
	return errors;
};

Form.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
	reduxForm({
		form: 'author-form',
		touchOnBlur: false,
		validate
	})(withStyles(styles)(Form))
);