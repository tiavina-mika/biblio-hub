import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BASE_URL } from '../../redux/actions/constants';
import ContactForm from '../forms/contact';
import ContactBlock from '../blocks/contact';
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

class Contact extends React.Component {
  state={flashMessage: '', success: false};
  onSubmit = async (form) => {
    const email = form.email;
    const name = form.name;
    const message = form.message;
    const response = await axios.post(`${BASE_URL}/api/contact`, {email, name, message});
    const messageResponse = Object.keys(response.data);
    this.setState({ flashMessage: messageResponse, success: true });
  }
  render() {
    const { classes, history } = this.props;
    const { flashMessage, success } = this.state;
    
    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid fluid>
            <Row center="xs">
              <Col  xs={12} sm={12} md={12} lg={8} start="xs">
                    <ContactForm onSubmit={this.onSubmit} success={success}/>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} start="xs">
                  <ContactBlock />
              </Col>
            </Row>
          </Grid>
          {flashMessage && <FlashMessage message={flashMessage} />}
      </div>
    );
    }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);