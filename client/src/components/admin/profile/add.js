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

import { post } from '../../../redux/actions/profile';

import FloatingButtonActions from '../components/floating-button-actions';

class Add extends React.PureComponent {
  onSubmit = (form) => {
      const formData = new FormData();

      form.photo && formData.append('photo', form.photo[0]);

      this.props.post(this.props.match.params.id, formData)
  }
  render() {
    return (
     <FormLayout
        title="Ajouter profil"
        onSubmit={this.onSubmit}
        buttonName="profile">
          <Form onSubmit={this.onSubmit}/>
          <FloatingButtonActions name="profile" list />
      </FormLayout>
    );
  }
}

export default connect(null, { post })(Add);