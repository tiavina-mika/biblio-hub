import React from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import FormLayout from '../pages/form';
import { post, edit, getGenre } from '../../../redux/actions/genres';

import FloatingButtonActions from '../components/floating-button-actions';

class Add extends React.PureComponent {
  onSubmit = (form) => {
    const formData = new FormData();
    getFormData(formData, 'name', form.name);
    form.photo && formData.append('photo', form.photo[0]);

    this.props.post(formData)
  }
  render() {
    return (
     <FormLayout
        title="Ajouter genre"
        onSubmit={this.onSubmit}
        buttonName="genre">
          <Form onSubmit={this.onSubmit}/>
          <FloatingButtonActions name="genre" list />
      </FormLayout>
    );
  }
}

export default connect(null, { post, edit, getGenre })(Add);