import React from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import FormLayout from '../pages/form';

import { post, edit, getOne } from '../../../redux/actions/books';
import { getAllAuthors } from '../../../redux/actions/authors';
import { getAllGenres } from '../../../redux/actions/genres';

import FloatingButtonActions from '../components/floating-button-actions';
import Helmet from '../../helmet';

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
      getFormData(formData, 'member', form.member);
      form.photo && formData.append('photo', form.photo[0]);
      form.epub && formData.append('epub', form.epub[0]);
      form.pdf && formData.append('pdf', form.pdf[0]);
      getFormData(formData, 'summary', form.summary);

      this.props.post(formData)
  }
  render() {
    const { authors, genres, loading } = this.props;
    
    const initialValues = {genres: []};
    return ([
        <Helmet title="Ajouter Livre" />,
        <FormLayout
          title="Ajouter livre"
          onSubmit={this.onSubmit}
          buttonName="livre">
            <Form onSubmit={this.onSubmit} authors={authors} authorLoading={loading} genres={genres} initialValues={initialValues}/>
            <FloatingButtonActions name="livre" list />
        </FormLayout>
    ]);
  }
}

const mapStateToProps = (state) => ({
  authors: state.authors.data.get('authors'),
  genres: state.genres.data.get('genres'),
  loading: state.authors.data.loading,
})

export default connect(mapStateToProps, { getAllAuthors, getAllGenres, post, edit, getOne })(Add);