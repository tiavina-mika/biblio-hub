import React from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import FormLayout from '../pages/form';

import { post, edit, getOne } from '../../../redux/actions/users';
import FloatingButtonActions from '../components/floating-button-actions';
import Helmet from '../../helmet';

class Add extends React.PureComponent {
  onSubmit = (form) => {
      // const formData = new FormData();
      // getFormData(formData, 'name', form.name);
      // getFormData(formData, 'email', form.email);
      // getFormData(formData, 'role', form.role);
      // getFormData(formData, 'password', form.password);
      this.props.post(form);
  }
  render() {
    return ([
      <Helmet title="Ajouter Utilisateur" />,
      <FormLayout
          title="Ajouter utilisateur"
          onSubmit={this.onSubmit}
          buttonName="utilisateur">
            <Form onSubmit={this.onSubmit} />
            <FloatingButtonActions name="utilisateur" list />
        </FormLayout>
    ]);
  }
}

export default connect(null, {post, edit, getOne })(Add);