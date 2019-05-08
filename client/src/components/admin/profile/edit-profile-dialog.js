import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { edit } from '../../../redux/actions/profile';
import { getOne } from '../../../redux/actions/users';
import Form from './form';

class EditFormDialog extends React.Component {
  state = {
    open: false,
  };
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.getOne(id);
  }
  onSubmit = (form) => {
    const formData = new FormData();
    const id = form._id;
    form.photo && formData.append('photo', form.photo[0]);
    this.props.edit(this.props.userId, id, formData);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      const { label, title, contentText, data} = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {label}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {contentText}
            </DialogContentText>
              <Form onSubmit={this.onSubmit} initialValues={data.profile}/>
          </DialogContent>
        </Dialog>
        </div>
    );
  }
}
const mapStateToProps = (state) => ({
    data: state.users.user.get('user'),
  })
export default connect(mapStateToProps, { edit, getOne })(EditFormDialog);