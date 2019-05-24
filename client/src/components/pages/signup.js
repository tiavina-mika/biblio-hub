import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import SignupForm from '../forms/signup';

import { signup } from '../../redux/actions/authentication';

const styles = {
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
  }
};

class Signup extends React.PureComponent {
  onSubmit = (form) => {
		this.props.signup(form.name, form.email, form.password);
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
                title="Enregistrement"
                subheader="Creéer un compte"/>
              <CardContent  className={classes.cardContent}>
                  <SignupForm onSubmit={this.onSubmit} />
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