import React from 'react';
import { connect } from 'react-redux';

import Form from './form';
import { getFormData } from '../../../utils/utils';

import { edit, getGenre, initialize } from '../../../redux/actions/genres';
import FloatingButtonActions from '../components/floating-button-actions';
import FormLayout from '../pages/form';
import Helmet from '../../helmet';

class Edit extends React.PureComponent {
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.getGenre(id)
  }

  onSubmit = (form) => {
      const formData = new FormData();
      const id = form._id;
      getFormData(formData, 'name', form.name);
      form.photo && formData.append('photo', form.photo[0]);
      id ? this.props.edit(id, formData) : this.props.initialize();
  }
  render() {
    const { data } = this.props;
    return ([
      <Helmet title="Modifier Genre" />,
      <FormLayout
          title="Modifier ce genre"
          onSubmit={this.onSubmit}
          buttonName="genre">
            <Form initialValues={data} onSubmit={this.onSubmit}/>
            <FloatingButtonActions name="genre" add list />
        </FormLayout>
    ]);
  }
}

const mapStateToProps = (state) => ({
  data: state.genres.genre.get('genre'),
})
export default connect(mapStateToProps, { edit, getGenre, initialize })(Edit);
