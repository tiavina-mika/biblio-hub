import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getAll } from '../../redux/actions/books';
import { getBooks, getBooksLoading } from '../../redux/root-reducer';
import Spinner from '../blocks/spinner';
import { BOOKS_SIDEBAR_LIMIT } from '../../redux/actions/constants';

const styles = theme => ({
    root: {
      paddingBottom: theme.spacing.unit,
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing.unit * 6,
      }
    },
    loadingContainer: {
      padding: theme.spacing.unit * 8,
    },
    listSubheader: {
        textAlign: 'left',
    },
    listItem: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: 0,
        marginLeft: 0,
    },
    item : {
        '&:hover': {
            color: 'rgba(255,255,255,.9)'
        }
    },
    divider: {
        borderColor: "rgba(255,255,255,.4)",
        borderWidth: '.5px'
    },
    link: {
        textDecoration: 'none'
    },
    listItemText: {
        display: 'flex',
        alignItems: 'center'
    },
    secondary: {
        marginLeft: 10
    },
    seeMore: {
        color: theme.palette.primary.main,
    },
  });


class Books extends Component {
  componentDidMount() {
    this.props.getAll(BOOKS_SIDEBAR_LIMIT, 1, true);
  }
  render() {
    const { classes, data, loading } = this.props;
    if (loading) {
        return <div className={classes.loadingContainer}>
                  <Spinner local height='25' width='25' color="rgba(0, 0, 0, .5)"/>
                </div>
    }

    return (
      data && data.books &&
        <div className={classes.root}>
            <ListSubheader inset className={classes.listSubheader}>Les derniers livres ajouté</ListSubheader>
            <List style={{padding: 0}}>
                {data.books.map(n =>
                   <Link to={`/livres/${n.slug}`} className={classes.link} key={n._id}>
                      <ListItem
                            divider 
                            button 
                            classes={{divider: classes.divider}} 
                            className={classes.listItem}  
                            key={n._id}>
                            <ListItemText 
                                inset 
                                primary={n.title} 
                                secondary={n.author && `(${n.author.family_name})`}
                                className={classes.listItemText} 
                                classes={{primary: classes.primary, secondary: classes.secondary}}/>
                        </ListItem>
                    </Link>
                )}
            </List>
            <ListSubheader inset className={classes.listSubheader}>
                <Link to="/livres" className={classes.seeMore}>Voir tout</Link>
            </ListSubheader>
        </div>
    )
  }
}

Books.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getBooks(state),
  loading: getBooksLoading(state),
});

export default connect(mapStateToProps, { getAll })(withStyles(styles)(Books))