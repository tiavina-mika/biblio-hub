import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Form from './form';
import { getFormData } from '../../../utils/utils';
import { edit, getOne, initialize } from '../../../redux/actions/users';
import FloatingButtonActions from '../components/floating-button-actions';
import FormLayout from '../pages/form';
import CustomizedLinearProgress  from '../components/progress';
import { getUserState, getUsersLoading } from '../../../redux/root-reducer';

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
    const { data, loading } = this.props;
    if(loading) {
      return <CustomizedLinearProgress />
    }
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
  data: getUserState(state),
  loading: getUsersLoading(state),
});
export default connect(mapStateToProps, { edit, getOne, initialize })(Edit);
