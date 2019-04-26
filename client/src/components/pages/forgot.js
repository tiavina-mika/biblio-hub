import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

// import ForgotForm from '../forms/forgot';

// import { passwordRequest } from '../../redux/actions/user';
// import { setError } from '../../redux/actions/error';

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
    textTransform: 'uppercase'
  },
};

class Forgot extends React.PureComponent {
  onSubmit = (form) => {
		// this.props.passwordRequest(form.email)
		// 	.then(result => {
		// 		if (result && result.reset) {
		// 			this.props.setError('PasswordRequestSuccess');
		// 		}
		// 	});
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid fluid className="singleton">
        <Row center="xs">
          <Col xs={12} sm={9} md={7} lg={4} start="xs">
            <Card className={classes.card}>
              <CardHeader
                classes={{title: classes.cardTitle, subheader: classes.cardSubtitle}}
                title="mot de passe oublié"
                subheader="Demander une modification de mot de passe"/>
							<CardContent style={{ paddingTop: 0 }}>
                {/* <ForgotForm onSubmit={this.onSubmit} /> */}
                <h1>FORGOT PAGE</h1>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

// Forgot = connect(null, { passwordRequest, setError })(Forgot);

Forgot.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Forgot);