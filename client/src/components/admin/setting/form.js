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
      this.props.post(formData)
  }
  render() {
    return (
     <FormLayout
        title="Setting"
        onSubmit={this.onSubmit}
        buttonName="setting">
          <Form onSubmit={this.onSubmit} />
      </FormLayout>
    );
  }
}

export default (Add);