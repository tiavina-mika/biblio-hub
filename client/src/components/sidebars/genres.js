import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getAllGenres } from '../../redux/actions/genres';
import { getGenres, getGenresLoading } from '../../redux/root-reducer';
import Spinner from '../blocks/spinner';
import { GENRES_SIDEBAR_LIMIT } from '../../redux/actions/constants';

const styles = theme => ({
    root: {
      paddingBottom: theme.spacing.unit,
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing.unit * 6,
      }
    },
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
    },
    link: {
        textDecoration: 'none'
    },
  });


class Genres extends Component {
  componentDidMount() {
    this.props.getAllGenres(GENRES_SIDEBAR_LIMIT, 1);
  }
  render() {
    const { classes, data, loading } = this.props;
    if (loading) {
        return <Spinner local height='25' width='25' color="rgba(0, 0, 0, .5)"/>
    }

    return (
      data && data.genres &&
        <div className={classes.root}>
            <ListSubheader inset className={classes.listSubheader}>Genres</ListSubheader>
            <List style={{padding: 0}}>
                {data.genres.map(n =>
                   <Link to={`/genres/${n.slug}`} className={classes.link}>
                      <ListItem
                            divider 
                            button 
                            classes={{divider: classes.divider}} 
                            className={classes.listItem}  
                            key={`${n.name}`}>
                            <ListItemText inset primary={n.name} classes={{primary: classes.primary}}/>
                        </ListItem>
                    </Link>
                )}
            </List>
        </div>
    )
  }
}

Genres.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getGenres(state),
  loading: getGenresLoading(state),
});

export default connect(mapStateToProps, { getAllGenres })(withStyles(styles)(Genres))