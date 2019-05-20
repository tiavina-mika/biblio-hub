import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { getAll } from '../../redux/actions/books';
import { getAllAuthors } from '../../redux/actions/authors';
import { getAllGenres } from '../../redux/actions/genres';
import { connect } from 'react-redux';
import { LIST_AUTHORS_PER_PAGE, LIST_BOOKS_PER_PAGE, LIST_GENRES_PER_PAGE } from '../../redux/actions/constants';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 0.5,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: 2,
    backgroundColor: fade(theme.palette.common.white, 0.5),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchButton: {
    width: theme.spacing.unit * 1,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  searchIcon: {
    color: '#ffff'
  },
  inputRoot: {
    color: 'rgba(0, 0, 0, 1)',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const getPlaceholder = pathname => {
    let placeholder;
    if(/livre/.test(pathname)) {
        placeholder='Chercher livre...'
    } else if (/auteur/.test(pathname)) {
        placeholder='Chercher auteur...'
    } else if (/genre/.test(pathname)) {
        placeholder='Chercher genre...'
    } else {
        placeholder='Chercher livre...'
    }  
    return placeholder;
}

class Search extends Component {
    state={value: ''}
    handleClick = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
        const { pathname, getAll, getAllAuthors, getAllGenres} = this.props;
        const { value } = this.state;
        event.preventDefault();

      if(/livre/.test(pathname)) {      
          getAll(LIST_BOOKS_PER_PAGE, 1, true, null, value, `/livres/recherche/${value}`);
        } else if (/auteur/.test(pathname)) {
          getAllAuthors(LIST_AUTHORS_PER_PAGE, 1, value, `/auteurs/recherche/${value}`);
        } else if (/genres/.test(pathname)) {
            getAllGenres(LIST_GENRES_PER_PAGE, 1, value, `/genres/recherche/${value}`);
        } else {
            getAll(LIST_BOOKS_PER_PAGE, 1, true, null, value, `/livres/recherche/${value}`);
        }
      }
    render() {
    const { classes, pathname } = this.props;
    
    const placeholder = getPlaceholder(pathname);
    return (
            <form className={classes.search} onSubmit={this.handleSubmit}>
              <Button className={classes.searchButton} type="submit">
                  <SearchIcon className={classes.searchIcon}/>
              </Button>
              <InputBase
                  placeholder={placeholder}
                  classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                  }}
                  name="search"
                  onChange={this.handleClick}
              />
            </form>
        );
    }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
});
export default connect(mapStateToProps, { getAll, getAllAuthors, getAllGenres })(withStyles(styles)(Search));