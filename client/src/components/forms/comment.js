import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

import { renderTextField } from './fields';

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

class CommentForm extends React.Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired
	}
	static defaultProps = {
		loading: false
	}
	onSubmit = (form) => {
		this.props.onSubmit(form);		
	}
	render() {
		const { handleSubmit, loading, classes } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field
					name="comment"
					type="text"
          component={renderTextField}
          multiline
          rows={4}
					placeholder="Votre Commentaire"
					variant="outlined"
					className={classes.fieldLabel}
					fullWidth />

          <Button
            type="submit"
            color="primary"
            variant="contained" 
            disabled={loading}
            className={classNames(classes.buttonLabel,classes.containedButton)}
            fullWidth>
              Ajouter
          </Button>
			</form>
		);
  }
}

const validate = (values) => {
	const errors = {};
	if (!values.comment || values.comment.length === 0) {
         errors.comment = "Vous devriez écrire quelque chose";
  }
	// if (values.comment.length > 1000) {
	// 	errors.comment = "Votre commentaire dépasse le nombre de caractère maximum";
	// }
	return errors;
};

CommentForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
		reduxForm({
			form: 'comment-form',
			touchOnBlur: false,
			validate
		})(withStyles(styles)(CommentForm))
);