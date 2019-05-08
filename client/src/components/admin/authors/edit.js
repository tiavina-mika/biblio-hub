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

import { edit, getAuthor, initialize } from '../../../redux/actions/authors';
import FloatingButtonActions from '../components/floating-button-actions';
import FormLayout from '../pages/form';

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
    const { data } = this.props;
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
  data: state.authors.author.get('author'),
})
export default connect(mapStateToProps, { edit, getAuthor, initialize })(Edit);
