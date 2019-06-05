import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Helmet from '../helmet';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BASE_URL } from '../../redux/actions/constants';
import NewPasswordForm from '../forms/new-password';
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

class NewPassword extends React.Component {
  state={flashMessage: '', success: false};
  onSubmit = async (form) => {
    const password = form.password;
    const response = await axios.put(`${BASE_URL}/auth/new-password/${this.props.match.params.id}`, { password });
    const messageResponse = Object.keys(response.data);
    if(response) {
        this.setState({ flashMessage: messageResponse, success: true });
        this.props.history.push('/signin');   
    } 
  }
  render() {
    const { classes } = this.props;
    const { flashMessage, success } = this.state;
    
    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Helmet title="Nouveau mot de passe" />
        <Grid fluid>
            <Row center="xs">
              <Col  xs={12} sm={12} md={12} lg={6} start="xs">
                    <NewPasswordForm onSubmit={this.onSubmit} success={success}/>
              </Col>
            </Row>
          </Grid>
          {flashMessage && <FlashMessage message={flashMessage} />}
      </div>
    );
    }
}

NewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPassword);
