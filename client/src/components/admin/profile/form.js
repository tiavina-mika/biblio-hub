import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderTextField, fileUpload } from '../../forms/fields';

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
		this.props.history.push(`/dashboard/redirect`);		
	}
	render() {

		const { handleSubmit, loading, pristine, classes } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} loading={loading}>
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

	if (values.photo && values.photo[0]) {
		const fileName = values.photo[0].name.split('.');
		const extension = fileName[fileName.length - 1];
		const allowed = /jpeg|jpg|png|gif/i.test(extension);
		if(!allowed){
			errors.photo = 'Les images de types jpeg, jpg, png et gif seuls sont permis';
		}
	}
	return errors;
};

Form.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
		reduxForm({
			form: 'profile-form',
			touchOnBlur: false,
			validate
		})(withStyles(styles)(Form))
	);