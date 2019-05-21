import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { renderTextField } from '../forms/fields';
import { getStorage } from '../../utils/local-storage';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Spinner from '../blocks/spinner';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Nom requis';
  }
  if (!values.message) {
    errors.message = 'Message requis';
  }

  if (!values.email) {
    errors.email = 'Email requis'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Addresse email invalide'
  }
  return errors;
};

const styles = {
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
    }
}

const Contact = ({classes, onSubmit}) => {
  return (
      <Form
        onSubmit={onSubmit}
        initialValues={{ name: '', email: getStorage('email') || '', message: '' }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={event =>{
              const promise = handleSubmit(event);
              promise.then(() => {
                reset();
              })
              return promise;
            }}>
            <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>Nous contacter</Typography>
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={renderTextField}
                    type="text"
                    variant="outlined"
                    label="Votre Nom"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="email"
                    component={renderTextField}
                    type="email"
                    variant="outlined"
                    label="Votre adresse email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="message"
                    fullWidth
                    multiline
                    margin="normal"
                    rows={10}
                    required
                    variant="outlined"
                    component={renderTextField}
                    label="Votre Message"
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
                    { submitting ? <Spinner type="ThreeDots" height={10} widht={10} color="rgba(0, 0, 0, .8)" /> : 'Envoyer'  }
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
  );
}

Contact.propTypes = {
    classes: PropTypes.object.isRequired,
};

  
export default withStyles(styles)(Contact);
