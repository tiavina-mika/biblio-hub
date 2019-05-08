import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import SigninForm from '../forms/signin';

import { signin } from '../../redux/actions/authentication';
import { Typography } from '@material-ui/core';

const styles = theme => ({
	card: {
    borderRadius: 2,
    paddingTop: 2
	},
  cardTitle: {
    textTransform: 'uppercase',
    marginBottom: 1
  },
	cardSubtitle: {
    textTransform: 'uppercase',
    marginTop: 1
  },
  cardContent: {
    marginTop: 0
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonLink: {
    textTransform: 'lowercase',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  
});

class Signin extends React.PureComponent {
  onClick = (e) => {
    e.preventDefault();
    this.props.history.push('/signup');
  }
  onSubmit = (form) => {
    this.props.signin(form.email, form.password)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={9} md={7} lg={4} start="xs">
            <Card className={classes.card}>
			        <CardHeader
                classes={{title: classes.cardTitle, subheader: classes.cardSubtitle}}
                title="Login"
                subheader="Connectez-vous"/>
              <CardContent  className={classes.cardContent}>
                <SigninForm onSubmit={this.onSubmit} />
              </CardContent>
              <CardActions  className={classes.cardActions}>
                <Typography>Pas encore enregistré?</Typography>
                <Button 
                  color="inherit"
                  className={classes.buttonLink}
                  onClick={this.onClick}>
                    Créer votre compte
                </Button>
              </CardActions>

            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}


Signin = connect(null, { signin })(Signin);

Signin.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);