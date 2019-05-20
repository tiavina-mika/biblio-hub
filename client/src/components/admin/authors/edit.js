import React from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import { edit, getAuthor, initialize } from '../../../redux/actions/authors';
import FloatingButtonActions from '../components/floating-button-actions';
import FormLayout from '../pages/form';
import CustomizedLinearProgress  from '../components/progress';
import { getAuthorState, getAuthorsLoading } from '../../../redux/root-reducer';

class Edit extends React.PureComponent {
  componentDidMount = () => {
    const { id } = this.props.match.params;
      this.props.getAuthor(id)
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.history.push('/dashboard/auteurs');
  }
  onSubmit = (form) => {
      const formData = new FormData();
      const id = form._id;
      getFormData(formData, 'first_name', form.first_name);
      getFormData(formData, 'family_name', form.family_name);
      form.photo && formData.append('photo', form.photo[0]);
      getFormData(formData, 'date_of_birth', form.date_of_birth);
      getFormData(formData, 'date_of_death', form.date_of_death);
      getFormData(formData, 'description', form.description);

      id ? this.props.edit(id, formData) : this.props.initialize();
  }
  render() {
    const { data, loading } = this.props;
    if(loading) {
      return <CustomizedLinearProgress />
    }
    return (
      <FormLayout
          title="Modifier cet auteur"
          onSubmit={this.onSubmit}
          buttonName="auteur">
            <Form initialValues={data} onSubmit={this.onSubmit}/>
            <FloatingButtonActions name="auteur" add list />
        </FormLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  data: getAuthorState(state),
  loading: getAuthorsLoading(state),
});
export default connect(mapStateToProps, { edit, getAuthor, initialize })(Edit);
