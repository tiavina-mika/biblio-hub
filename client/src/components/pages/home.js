import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Carousel } from "react-responsive-carousel";
import Genres from "../home/genres";
import Books from "../home/books";
import Authors from "../home/authors";

const styles = theme => ({
  root: {
    display: 'block',
  },
  content: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit,
    }
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1
  },
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

class Home extends React.Component {
  render() {
    const { classes, children, history, authenticated, ...rest } = this.props;

    return (
      <div className={classes.root}>
          <Carousel autoPlay showThumbs={false} showStatus={false}>
            <img src={`${process.env.PUBLIC_URL}/images/scroll1.png`} />
            <img src={`${process.env.PUBLIC_URL}/images/scroll2.png`}  />
            <img src={`${process.env.PUBLIC_URL}/images/scroll3.png`} />
        </Carousel>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Genres path='/genres'/>
          <Books
            member
            headerTitle='Decouvrez les livres pour les membres'
            path='/livres'/>
          <Books
            headerTitle='Decouvrez plus de livres gratuits'
            path='/livres'/>
          <Authors
            headerTitle='Decouvrez les auteurs classiques'
            path='/auteurs'/>
        </div>
      </div>

    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);