import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { profile } from '../../../redux/actions/users';
import Form from './form';

class FormDialog extends React.Component {
  state = {
    open: false,
  };
  onSubmit = (form) => {
    const { userId, profile, history: { go }} = this.props;
    const formData = new FormData();
    form.photo && formData.append('photo', form.photo[0]);
    profile(userId, formData)
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      const { title, contentText } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {title}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ajouter une photo</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {contentText}
            </DialogContentText>
              <Form onSubmit={this.onSubmit} />
          </DialogContent>
        </Dialog>
        </div>
    );
  }
}
export default connect(null, { profile })(FormDialog);