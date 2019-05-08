import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import FormLayout from '../pages/form';

import { post, edit, getOne } from '../../../redux/actions/books';
import { getAllAuthors } from '../../../redux/actions/authors';
import { getAllGenres } from '../../../redux/actions/genres';

import FloatingButtonActions from '../components/floating-button-actions';

class Add extends React.PureComponent {
  componentDidMount() {
    Promise.all([
      this.props.getAllAuthors(),
      this.props.getAllGenres()
    ])
  }
  onSubmit = (form) => {
      const formData = new FormData();
      getFormData(formData, 'title', form.title);
      getFormData(formData, 'date_publication', new Date(form.date_publication));
      getFormData(formData, 'author', form.author);
      getFormData(formData, 'genres', form.genres);
      getFormData(formData, 'publish', form.publish);
      form.photo && formData.append('photo', form.photo[0]);
      form.epub && formData.append('epub', form.epub[0]);
      form.pdf && formData.append('pdf', form.pdf[0]);
      getFormData(formData, 'summary', form.summary);

      this.props.post(formData)
  }
  render() {
    const { authors, genres } = this.props;
    const initialValues = {genres: []};
    return (
     <FormLayout
        title="Ajouter livre"
        onSubmit={this.onSubmit}
        buttonName="livre">
          <Form onSubmit={this.onSubmit} authors={authors} genres={genres} initialValues={initialValues}/>
          <FloatingButtonActions name="livre" list />
      </FormLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  authors: state.authors.data.get('authors'),
  genres: state.genres.data.get('genres'),
  loading: state.authors.data.loading,
})

export default connect(mapStateToProps, { getAllAuthors, getAllGenres, post, edit, getOne })(Add);