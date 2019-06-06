import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { renderTextField, fileUpload, renderSelect, renderMultipleCheckboxSelect, renderCheckBox } from '../../forms/fields';
import { shallowCompare } from '../../../utils/shallow-compare';
import Chip from '@material-ui/core/Chip';
import ReactMDE from 'redux-forms-markdown-editor';
import Avatar from '@material-ui/core/Avatar';
import { BASE_URL } from '../../../redux/actions/constants'

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

		const { handleSubmit, loading, authors, initialValues, genres, pristine, classes, history: { push } } = this.props;
		const data = initialValues;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} loading={loading}>
				<Field
					name="title"
					type="text"
					required
					component={renderTextField}
					placeholder="Titre"
					variant="outlined"
					label="Titre du livre"
					className={classes.fieldLabel}
					fullWidth />
				<Field
					name="date_publication"
					type="text"
					component={renderTextField}
					placeholder="Date de publication"
					variant="outlined"
					label="Date de publication"
					helperText="Exemple 01/01/2019"
					className={classes.fieldLabel}
					fullWidth />

				<div style={{marginTop: 15, marginBottom: 15, textAlign: 'left'}}>
					<Field
						name='author'
						label='Auteur' 
						required
						fullWidth
						component={renderSelect} 
						rootClass={classes.formControl} 
						>
						{ authors && authors.map(n => (
							<MenuItem value={n._id} key={n._id}>{`${n.first_name} ${n.family_name}`}</MenuItem>
						))}
					</Field>
					{data && data.author &&
					    <Chip
								avatar={
									data.author.photo
										? <Avatar src={`${BASE_URL}/api/authors/photo/${data.author._id}`} />
									: <Avatar>{`${data.author.first_name.charAt(0).toUpperCase()}${data.author.family_name.charAt(0).toUpperCase()}`}</Avatar>
								}
								label={`${data.author.first_name} ${data.author.family_name}`}
								className={classes.chip}
								variant="outlined"
								onClick={() => push(`/dashboard/auteur/${data.author._id}`)}
							/> 
					}
				</div>

				<div style={{marginTop: 10, marginBottom: 10, textAlign: 'left'}}>
					<Field
						name='genres'
						label='Genres' 
						required
						fullWidth
						format={value => Array.isArray(value) ? value : []}
						component={renderMultipleCheckboxSelect} 
						rootClass={classes.formControl} 
						>
						{ genres && genres.map(n => (
							<MenuItem value={n._id} key={n._id}>{n.name}</MenuItem>
							// <MenuItem value={n._id} key={n._id} selected={data && data.genres.filter(d => d._id === n._id)}>{n.name}</MenuItem>
						))}
					</Field>
					{ data && data.genres.map(n => (
						<Chip
							label={n.name}
							className={classes.chip}
							variant="outlined"
							onClick={() => push(`/dashboard/genre/${data.genre._id}`)}
						/>
					))}
				</div>

				<Field
					withRef
					ref={this.setFileInputRef}
					label="Photo"
					placeholder="Photo"
					name="photo"
					component={fileUpload}
					variant="outlined"
					helperText="Taille max: 1Mo"
					type="file"
					accept="image/*"
					fullWidth
				/>
				<Field
					withRef
					ref={this.setFileInputRef}
					label="Pdf"
					helperText="Taille max: 3Mo"
					name="pdf"
					component={fileUpload}
					variant="outlined"
					type="file"
					accept=".pdf"
					fullWidth
				/>
				<Field
					withRef
					ref={this.setFileInputRef}
					label="Epub"
					helperText="Taille max: 1Mo"
					name="epub"
					component={fileUpload}
					variant="outlined"
					type="file"
					accept=".epub"
					fullWidth
				/>
				<Field
					name="summary"
					type="text"
					label="Resumé du livre"
					component={ReactMDE}
					placeholder="Resumé"
					className={classes.fieldLabel}
					required
					variant="outlined"
					fullWidth />
				<Field
					label="Publier?"
					name="publish"
					component={renderCheckBox}
					variant="outlined"
					type="checkbox"
					fullWidth
				/>
				<Field
					label="Privé?"
					name="member"
					component={renderCheckBox}
					variant="outlined"
					type="checkbox"
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
	if (!values.title) {
		errors.title = "Prenom requis";
	}
	if (!values.summary) {
		errors.summary = "Resumé requis";
	}
	if (values.title && values.title.length > 100) {
		errors.title = "Titre trop long";
  	}	
	if (!values.author) {
		errors.author = "Auteur requis";
	}
			
	if (values.photo && values.photo[0]) {
		const file = values.photo[0];
		if(file.size > 1000000){
			errors.photo = 'Image trop grand';
		} 
		else if (!file.type.includes("image/") ) {
			errors.photo = "Image doit être .jpg, .png ou gif"
		}
	}
	if (values.pdf && values.pdf[0]) {
		const file = values.pdf[0];
		if(file.size > 2000000){
			errors.pdf = 'Pdf trop grand';
		} 
		else if (!file.type.includes("application/pdf") ) {
			errors.pdf = "Pdf doit être de type .pdf"
		}
	}
	if (values.epub && values.epub[0]) {
		const file = values.epub[0];
		if(file.size > 1000000){
			errors.epub = 'Pdf trop grand';
		} 
		else if (!file.type.includes("application/epub") ) {
			errors.epub = "Pdf doit être de type .epub"
		}
	}
	
	return errors;
};

Form.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
	reduxForm({
		form: 'book-form',
		// initialValues: {
		// 	genres: []
		// },
		touchOnBlur: false,
		validate
	})(withStyles(styles)(Form))
);