import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Notifications from 'react-notify-toast';
import SigninForm from '../forms/signin';

import { signin } from '../../redux/actions/authentication';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  cardLeft: {
    width: '60%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    margin: 'auto',
    marginBottom: 'auto'
  },
	card: {
    boxShadow: 'none',
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
  cardMedia: {
    paddingTop: '50%', // 16:9
    height: 300,
    width: '100%',
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
      <Grid fluid style={{padding: 0, width: '100%'}}>
        <Row center="xs">
          <Col xs={12} sm={5} md={4} lg={4} center="xs">
              <Card className={classes.cardLeft}>
                <Notifications  options={{zIndex: 90000, top: '180px'}}/>
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
          <Col xs={12} sm={7} md={8} lg={8} start="xs">
              <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={`${process.env.PUBLIC_URL}/login.jpg`}
                    />
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