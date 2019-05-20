import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { renderTextField } from '../forms/fields';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.message) {
    errors.message = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
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

const Contact = ({classes}) => {
  return (
      <Form
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'larry' }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
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
                    label="Votre adresse Email"
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
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Envoyer
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
  );
}

Contact.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
  
export default withStyles(styles)(Contact);
