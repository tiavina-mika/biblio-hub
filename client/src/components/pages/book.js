import React from 'react';
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
  }
});

class Book extends React.Component {
  render() {
    const { classes, history, authenticated, ...rest } = this.props;

    return (
      <div className={classes.root}>
        Book {this.params.slug}
      </div>

    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Book);