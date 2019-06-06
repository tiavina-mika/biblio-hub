import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
    },
};

const Form = (props) => {
    const { classes, title, children } = props;
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={9} md={7} lg={8} start="xs">
            <Card className={classes.card}>
			        <CardHeader
                classes={{title: classes.cardTitle, subheader: classes.cardSubtitle}}
                title={title}/>
              <CardContent className={classes.cardContent}>
                {children}
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
}

Form.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);