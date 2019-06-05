import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { renderTextField } from '../forms/fields';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Spinner from '../blocks/spinner';

const validate = values => {
  const errors = {};
    if (!values.password || values.password.length === 0) {
        errors.password = "Mot de passe requis";
    }
    if(!/[0-9]/.test(values.password)) {
      errors.password = "Le mot de passe doit avoir au moins un chiffre";
    }
    if(!/[a-z]/i.test(values.password)) {
      errors.password = "Le mot de passe doit avoir au moins une lettre";
    }
    if(values.password && values.password.length < 6) {
      errors.password = "Le mot de passe doit avoir au moins 6 caractères";
    }
    if(values.password && values.password.length > 20) {
      errors.password = "Le mot de passe doit avoir au plus 20 caractères";
    }
    if (!values.confirm || values.confirm.length === 0) {
        errors.confirm = "Confirmation du mot de passe requis";
    } else if (values.confirm !== values.password) {
        errors.confirm = "Confirmation du mot de passe invalide";
    }
  return errors;
};

const styles = theme => ({
    paper: {
        padding: 16,
        textAlign: 'left'
    },
    title: {
        paddingTop: 5,
        paddingBottom: 10
    },
    buttonContainer: {
        marginTop: 16,
        textAlign: 'right'
    },
    subtitle: {
      fontFamily: 'Helvetica',
      marginBottom: theme.spacing.unit * 2,
      color: 'rgba(0, 0, 0, .5)'
    }
});

const NewPassword = ({classes, onSubmit}) => {
  return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>Nouveau mot de passe</Typography>
                <Typography variant="subheader" className={classes.subtitle}>Veuillez saisir votre nouveau mot de passe</Typography>
                <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="password"
                      component={renderTextField}
                      type="password"
                      variant="outlined"
                      label="Votre nouveau mot de passe"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="confirm"
                      component={renderTextField}
                      type="password"
                      variant="outlined"
                      label="Confirmation du nouveau mot de passe"
                    />
                  </Grid>
                  <Grid item className={classes.buttonContainer} xs={12}>
                    <Button
                      variant="contained"
                      color={submitting ? "default": "primary"}
                      type="submit"
                      disabled={submitting}
                      style={{height: 36, width: 102}}
                    >
                      { submitting ? <Spinner type="ThreeDots" height={10} widht={10} color="rgba(0, 0, 0, .8)" /> : 'Changer'  }
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
        )}
      />
  );
}

NewPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

  
export default withStyles(styles)(NewPassword);
