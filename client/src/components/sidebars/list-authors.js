import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getAllAuthors } from '../../redux/actions/authors';
import { getAuthors, getAuthorsLoading } from '../../redux/root-reducer';
import Spinner from '../blocks/spinner';
import { AUTHORS_SIDEBAR_LIMIT } from '../../redux/actions/constants';

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
    seeMore: {
        color: theme.palette.primary.main,
    },
  });


class Authors extends Component {
  componentDidMount() {
    this.props.getAllAuthors(AUTHORS_SIDEBAR_LIMIT, 1);
  }
  render() {
    const { classes, data, loading } = this.props;
    if (loading) {
        return <div className={classes.loadingContainer}>
                  <Spinner local height='25' width='25' color="rgba(0, 0, 0, .5)"/>
                </div>
    }

    return (
      data && data.authors &&
        <div className={classes.root}>
            <ListSubheader inset className={classes.listSubheader}>Les derniers auteurs ajoutés</ListSubheader>
            <List style={{padding: 0}}>
                {data.authors.map(n =>
                   <Link to={`/auteurs/${n.slug}`} className={classes.link} key={n._id}>
                      <ListItem
                            divider 
                            button 
                            classes={{divider: classes.divider}} 
                            className={classes.listItem}  
                            key={n._id}>
                            <ListItemText 
                                inset 
                                primary={`${n.first_name} ${n.family_name}`} 
                                classes={{primary: classes.primary}}/>
                        </ListItem>
                    </Link>
                )}
            </List>
            <ListSubheader inset className={classes.listSubheader}>
                <Link to="/auteurs" className={classes.seeMore}>Voir tout</Link>
            </ListSubheader>
        </div>
    )
  }
}

Authors.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getAuthors(state),
  loading: getAuthorsLoading(state),
});

export default connect(mapStateToProps, { getAllAuthors })(withStyles(styles)(Authors))