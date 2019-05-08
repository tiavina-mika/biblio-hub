import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { getAll } from '../../../redux/actions/books';
import { getAllAuthors } from '../../../redux/actions/authors';
import { getAllGenres } from '../../../redux/actions/genres';
import { connect } from 'react-redux';

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
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '150%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchButton: {
    width: theme.spacing.unit * 9,
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
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
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
    if(pathname.includes('livre') || pathname.includes('livres')) {
        placeholder='Chercher livre...'
    } else if (pathname.includes('auteurs') || pathname.includes('auteur')) {
        placeholder='Chercher auteur...'
    } else if (pathname.includes('genres') || pathname.includes('genre')) {
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
        const { pathname } = this.props;
        const { value } = this.state;
        event.preventDefault();

        if(pathname.includes('livre') || pathname.includes('livres')) {
            this.props.getAll(value);
        } else if (pathname.includes('auteurs') || pathname.includes('auteur')) {
            this.props.getAllAuthors(value);
        } else if (pathname.includes('genres') || pathname.includes('genre')) {
            this.props.getAllGenres(value);
        } else {
            this.props.getAll(value);
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
  })
export default connect(mapStateToProps, { getAll, getAllAuthors, getAllGenres })(withStyles(styles)(Search));