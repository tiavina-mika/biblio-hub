import React from 'react';
import classNames from 'classnames';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Genres from "../home/genres";
import Helmet from '../helmet';

const styles = theme => ({
  card: {
    borderRadius: 0,
    boxShadow: '0 2px 5px rgba(0, 0, 0, .1), 0 -1px 5px rgba(0, 0, 0, .1)',
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  },
  cardTitle: {
    textTransform: 'uppercase'
  },
  cardSubtitle: {
    textTransform: 'uppercase',
    marginTop: 1
  },
  cardMedia: {
    objectFit: 'cover',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
  layout: {
      width: 'auto',
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1500,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
  },
});

class Error404 extends React.PureComponent {
  onDashboard = () => {
    this.props.history.push('/');
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid fluid className="singleton">
        <Helmet title="404" />
        <Row center="xs">
          <Col xs={12} sm={9} md={7} lg={4} start="xs">
            <Card className={classes.card}>
              <CardHeader
                classes={{title: classes.cardTitle, subheader: classes.cardSubtitle}}
                title="OOPS! (404)"
                subheader="La page que vous recherchez est introuvable"
                style={{paddingTop: 18, paddingBottom: 14}}/>
              <CardMedia
                component="img"
                image={`${process.env.PUBLIC_URL}/images/binoculars.jpg`}
                alt={process.env.REACT_APP_NAME}
                height="100%"
                className={classes.cardMedia}/>
              <CardActions className={classes.cardActions}>
                <Button size="medium" onClick={this.onDashboard} fullWidth style={{paddingTop: 7, paddingBottom: 5}}>
                  retourner à l'accueil
                </Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
        <Row>
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Genres path='/genres'/>
            </div>
        </Row>
      </Grid>
    );
  }
}

Error404.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error404);