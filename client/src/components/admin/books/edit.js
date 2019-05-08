import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Form from './form';
import { getFormData } from '../../../utils/utils';
import { getAllAuthors } from '../../../redux/actions/authors';
import { getAllGenres } from '../../../redux/actions/genres';
import { edit, getOne, initialize } from '../../../redux/actions/books';
import FloatingButtonActions from '../components/floating-button-actions';
import FormLayout from '../pages/form';

class Edit extends React.PureComponent {
  // state = {data: ''}
  componentDidMount = () => {
    const { id } = this.props.match.params;
    Promise.all([
      this.props.getOne(id),
      this.props.getAllAuthors(),
      this.props.getAllGenres()
    ])
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.history.push('/dashboard/livres');
  }
  onSubmit = (form) => {
    const formData = new FormData();
    const id = form._id;
    const genres = form.genres;
    const filterGenres = genres.every(n => typeof(n) === 'object')
        ? genres.map(n => typeof(n) === 'object' ? n._id : n)
        : genres.filter(n => typeof(n) === 'string');
    getFormData(formData, 'title', form.title);
    getFormData(formData, 'date_publication', form.date_publication);
    getFormData(formData, 'author', typeof(form.author) === 'object' ? form.author._id : form.author);
    getFormData(formData, 'genres', filterGenres);
    getFormData(formData, 'publish', (form.publish));
    form.photo && formData.append('photo', form.photo[0]);
    form.epub && formData.append('epub', form.epub[0]);
    form.pdf && formData.append('pdf', form.pdf[0]);
    getFormData(formData, 'summary', form.summary);
    id ? this.props.edit(id, formData) : this.props.initialize();
}
  render() {
    const { data, authors, genres } = this.props;
    console.log('data: ', data);
    return (
      <FormLayout
          title="Modifier cet livre"
          onSubmit={this.onSubmit}
          buttonName="livre">
            <Form initialValues={data} authors={authors} genres={genres} onSubmit={this.onSubmit}/>
            <FloatingButtonActions name="livre" add list />
        </FormLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.books.book.get('book'),
  authors: state.authors.data.get('authors'),
  genres: state.genres.data.get('genres'),
})
export default connect(mapStateToProps, { getAllAuthors, getAllGenres, edit, getOne, initialize })(Edit);
