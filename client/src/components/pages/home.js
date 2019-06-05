import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Genres from "../home/genres";
import Books from "../home/books";
import Authors from "../home/authors";
import Carousel from "../blocks/carousel";

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
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1500,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
  },
  layoutContainer: {
    backgroundColor: '#e9ecef',
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
          <Carousel />
          <div className={classNames(classes.layout, classes.cardGrid)}>
              <Genres path='/genres'/>
              <Books
                member
                headerTitle='Decouvrez les livres pour les membres'
                path='/livres/connexion/membre'/>
              <Books
                headerTitle='Decouvrez plus de livres gratuits'
                path='/livres'/>
            </div>
            <div className={classNames(classes.layoutContainer, classes.cardGrid)}>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                  <Authors
                    headerTitle='Decouvrez les auteurs classiques'
                    path='/auteurs'/>
               </div>
          </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);