import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BASE_URL } from '../../redux/actions/constants';
import ForgottenPasswordForm from '../forms/forgotten-password';
import FlashMessage from '../blocks/flash-message';


const styles = theme => ({
  layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1500,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
  },
  cardGrid: {
      padding: `${theme.spacing.unit * 4}px 0`,
  },
});

class ForgottenPassword extends React.Component {
  state={flashMessage: '', success: false};
  onSubmit = async (form) => {
    const email = form.email;
    const response = await axios.post(`${BASE_URL}/auth/forgotten-password`, { email });
    const messageResponse = Object.keys(response.data);
    this.setState({ flashMessage: messageResponse, success: true });
  }
  render() {
    const { classes } = this.props;
    const { flashMessage, success } = this.state;
    
    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid fluid>
            <Row center="xs">
              <Col  xs={12} sm={12} md={12} lg={6} start="xs">
                    <ForgottenPasswordForm onSubmit={this.onSubmit} success={success}/>
              </Col>
            </Row>
          </Grid>
          {flashMessage && <FlashMessage message={flashMessage} />}
      </div>
    );
    }
}

ForgottenPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ForgottenPassword);
