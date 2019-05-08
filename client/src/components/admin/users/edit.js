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
import { edit, getOne, initialize } from '../../../redux/actions/users';
import FloatingButtonActions from '../components/floating-button-actions';
import FormLayout from '../pages/form';

class Edit extends React.PureComponent {
  state = {data: ''}
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.getOne(id);
  }
  onSubmit = (form) => {
    const formData = new FormData();
    const id = form._id;
    // getFormData(formData, 'name', form.name);
    // getFormData(formData, 'email', form.email);
    // getFormData(formData, 'role', form.role);
    // form.photo && formData.append('photo', form.photo[0]);
    id ? this.props.edit(id, form) : this.props.initialize();
  }
  render() {
    const { data } = this.props;
    return (
      <FormLayout
          title="Modifier cet utilisateur"
          onSubmit={this.onSubmit}
          buttonName="utilisateur">
            <Form initialValues={data} data={data} onSubmit={this.onSubmit}/>
            <FloatingButtonActions name="utilisateur" add list />
        </FormLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.users.user.get('user'),
})
export default connect(mapStateToProps, { edit, getOne, initialize })(Edit);
