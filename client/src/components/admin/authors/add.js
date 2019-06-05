import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Form from './form';
import { getFormData } from '../../../utils/utils';
import FormLayout from '../pages/form';

import { post, edit, getAuthor } from '../../../redux/actions/authors';

import FloatingButtonActions from '../components/floating-button-actions';
import Helmet from '../../helmet';

class Add extends React.PureComponent {
  onSubmit = (form) => {
      const formData = new FormData();
      getFormData(formData, 'first_name', form.first_name)
      getFormData(formData, 'family_name', form.family_name)
      form.photo && formData.append('photo', form.photo[0]);
      getFormData(formData, 'date_of_birth', form.date_of_birth)
      getFormData(formData, 'date_of_death', form.date_of_death)
      getFormData(formData, 'description', form.description)

      this.props.post(formData)
  }
  render() {
    return ([
      <Helmet title="Ajouter Auteur" />,
     <FormLayout
        title="Ajouter auteur"
        onSubmit={this.onSubmit}
        buttonName="auteur">
          <Form onSubmit={this.onSubmit}/>
          <FloatingButtonActions name="auteur" list />
      </FormLayout>
    ]);
  }
}

export default connect(null, { post, edit, getAuthor })(Add);