import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from './tabs';

const styles = theme => ({
  root: {
    marginTop: 40,
    marginBottom: 20,
  },
  dialog: {
    maxWidth: 500,
    borderRadius: 1,
    [theme.breakpoints.up('sm')]: {
      marginTop: -320
    },
  },
  dialogActions: {
    paddingRight: theme.spacing.unit
  }
});

class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, iconbutton, icon, title, history, variant, currentUrl } = this.props;
    const buttonComponent = <Button variant="outlined" color="primary" variant={variant} onClick={this.handleClickOpen}>
                              {title}
                            </Button>;
    const iconButtonComponent = <IconButton onClick={this.handleClickOpen}>
                                    {icon}
                                </IconButton>;
    return (
      <div className={classes.root}>
        {iconbutton ? iconButtonComponent : buttonComponent }
        <Dialog
          classes={{paperWidthXs: classes.dialog}}
          maxWidth='xs'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Tabs onClose={this.handleClose} history={history} currentUrl={currentUrl}/>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={this.handleClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);