import React from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import FormLayout from '../pages/form';

import { post, edit, getOne } from '../../../redux/actions/users';


import FloatingButtonActions from '../components/floating-button-actions';

class Add extends React.PureComponent {
  onSubmit = (form) => {
      // const formData = new FormData();
      // getFormData(formData, 'name', form.name);
      // getFormData(formData, 'email', form.email);
      // getFormData(formData, 'role', form.role);
      // getFormData(formData, 'password', form.password);
      // form.photo && formData.append('photo', form.photo[0]);
      this.props.post(form)
  }
  render() {
    return (
     <FormLayout
        title="Ajouter utilisateur"
        onSubmit={this.onSubmit}
        buttonName="utilisateur">
          <Form onSubmit={this.onSubmit} />
          <FloatingButtonActions name="utilisateur" list />
      </FormLayout>
    );
  }
}

// const mapStateToProps = (state) => ({
//   authors: state.authors.data.get('authors'),
//   genres: state.genres.data.get('genres'),
//   loading: state.authors.data.loading,
// })

export default connect(null, {post, edit, getOne })(Add);