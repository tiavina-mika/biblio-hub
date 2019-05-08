import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { post } from '../../../redux/actions/profile';
import Form from './form';

class FormDialog extends React.Component {
  state = {
    open: false,
  };
  onSubmit = (form) => {
    const formData = new FormData();
    form.photo && formData.append('photo', form.photo[0]);
    this.props.post(this.props.userId, formData);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      const { label, title, contentText, handleSubmit } = this.props;
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
              <Form onSubmit={this.onSubmit} />
          </DialogContent>
        </Dialog>
        </div>
    );
  }
}
export default connect(null, { post })(FormDialog);