import React from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import { getAllAuthors } from '../../../redux/actions/authors';
import { getAllGenres } from '../../../redux/actions/genres';
import { edit, getOne, initialize } from '../../../redux/actions/books';
import FloatingButtonActions from '../components/floating-button-actions';
import FormLayout from '../pages/form';
import CustomizedLinearProgress  from '../components/progress';
import { getBookState, getBooksLoading, getAuthors, getGenres } from '../../../redux/root-reducer';
import Helmet from '../../helmet';

class Edit extends React.PureComponent {
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
    getFormData(formData, 'member', form.member);
    getFormData(formData, 'publish', (form.publish));
    form.photo && formData.append('photo', form.photo[0]);
    form.epub && formData.append('epub', form.epub[0]);
    form.pdf && formData.append('pdf', form.pdf[0]);
    getFormData(formData, 'summary', form.summary);
    id ? this.props.edit(id, formData) : this.props.initialize();
}
  render() {
    const { data, authors, genres, loading } = this.props;
    if(loading) {
      return <CustomizedLinearProgress />
    }
    return ([
        <Helmet title="Modifier Livre" />,
        <FormLayout
            title="Modifier ce livre"
            onSubmit={this.onSubmit}
            buttonName="livre">
              <Form initialValues={data} authors={authors} genres={genres} onSubmit={this.onSubmit}/>
              <FloatingButtonActions name="livre" add list />
        </FormLayout>
    ]);
  }
}

const mapStateToProps = (state) => ({
  data: getBookState(state),
  authors: getAuthors(state),
  genres: getGenres(state),
  loading: getBooksLoading(state),
});
export default connect(mapStateToProps, { getAllAuthors, getAllGenres, edit, getOne, initialize })(Edit);
