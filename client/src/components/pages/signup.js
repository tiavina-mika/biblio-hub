import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import SignupForm from '../forms/signup';

import { signup } from '../../redux/actions/authentication';

const styles = theme => ({
  grid: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/signup-background.jpg)`,
    backgroundSize: 'cover',
    height: window.innerHeight,
  },
  row: {
    height: window.innerHeight,
    paddingTop: '5%'
  },
	card: {
    borderRadius: 2,
    paddingTop: 2,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '10px',
    backgroundColor: 'transparent',
	},
  cardTitle: {
    textTransform: 'inherit',
    marginBottom: 1,
    // color: theme.palette.primary.main
    color: '#000'
  },
  cardHeader: {
    backgroundColor: 'rgba(255, 255, 255, .7)',
  },
	cardSubtitle: {
    textTransform: 'uppercase',
    marginTop: 1
  },
  cardContent: {
    marginTop: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid #000'
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
  }
});

class Signup extends React.PureComponent {
  onSubmit = (form) => {
		this.props.signup(form.name, form.email, form.password);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid fluid className={classes.grid}>
        <Row center="xs" className={classes.row}>
          <Col xs={12} sm={9} md={7} lg={6} start="xs">
            <Card className={classes.card}>
              <CardHeader
                classes={{title: classes.cardTitle, subheader: classes.cardSubtitle, root: classes.cardHeader}}
                title="Enregistrez-vous"/>
              <CardContent  className={classes.cardContent}>
                  <SignupForm onSubmit={this.onSubmit} backgroundColor={true}/>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Signup = connect(null, { signup })(Signup);

Signup.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);