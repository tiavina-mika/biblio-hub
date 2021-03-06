import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { getMessageType } from '../../utils/utils'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MySnackbarContent = props => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const messages = {
	'MAIL_SEND_SUCCESS':  'Votre message a été envoyé avec succès.' ,
  'MAIL_SEND_ERROR':  "Votre message n'a pas été envoyé, veuillez contacter l'administrateur" ,	
  "MAIL_FORGOTTEN_PASSWORD_SEND_SUCCESS": "Un email vous a été envoyé",
  "MAIL_FORGOTTEN_PASSWORD_SEND_ERROR": "L'email n'a pas été envoyé. Veuillez contacter l'administrateur"  ,
  "NEW_PASSWORD_SUCCESS": "Votre mot de passe a été changé avec succès",
  "NEW_PASSWORD_ERROR": "Changement de mot de passe echoué",
};

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class FlashMessage extends React.Component {
  state = {open: true}
  handleClose = (event) => {
    this.setState({ open: false });
  };

  render() {
    const { message } = this.props;

    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={getMessageType(message)}
            message={messages[message]}
          />
        </Snackbar>
    );
  }
}

FlashMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(FlashMessage);
