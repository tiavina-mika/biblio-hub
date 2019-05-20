import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ContactForm from '../forms/contact';
import ContactBlock from '../blocks/contact';

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
  componentDidMount() {

  }
  render() {
    const { classes, history } = this.props;

    
    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid fluid>
            <Row center="xs">
              <Col  xs={12} sm={12} md={12} lg={8} start="xs">
                    <ContactForm />
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} start="xs">
                  <ContactBlock />
              </Col>
            </Row>
          </Grid>
      </div>
    );
    }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Contact);
