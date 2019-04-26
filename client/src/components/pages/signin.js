import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import SigninForm from '../forms/signin';

import { signin } from '../../redux/actions/authentication';

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

class Signin extends React.PureComponent {
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