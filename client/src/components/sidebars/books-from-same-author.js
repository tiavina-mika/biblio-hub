import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ListSubheader from '@material-ui/core/ListSubheader';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { BASE_URL } from '../../redux/actions/constants';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { getBooksByAuthor } from '../../redux/actions/books';
import { getBooksLoading, getBooks } from '../../redux/root-reducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const styles = theme => ({
    listSubheader: {
        textAlign: 'left'
    },
    listItem: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    item : {
        '&:hover': {
            color: 'rgba(255,255,255,.9)'
        }
    },
    divider: {
        borderColor: "rgba(255,255,255,.4)",
        borderWidth: '.5px'
    }
  });


class Books extends Component {
  render() {
    const { classes, loading, books } = this.props;
    if (loading) {
        return 'cool'
    }
    return (
      books &&
        <div className={classes.root}>
        <ListSubheader inset className={classes.listSubheader}>Vue utilisateur</ListSubheader>
        <List style={{padding: 0}}>
            {books.map(n =>
                <ListItem
                    divider 
                    button 
                    classes={{divider: classes.divider}} 
                    className={classes.listItem}  
                    key={`${n.title}`}>
                    <ListItemText inset primary={n.title} classes={{primary: classes.primary}}/>
                </ListItem>
            )}
        </List>
    </div>
    )
  }
}

Books.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: getBooksLoading(state),
  // data: getBooks(state),
});

export default connect(mapStateToProps, { getBooksByAuthor })(withStyles(styles)(Books))