import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getLocation } from '../../redux/root-reducer';

const styles = theme => ({
    header: {
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex',
        alignItems: 'center'
    },
    headerTitle: {
        textTransform: 'uppercase',
        color: '#616161',
        [theme.breakpoints.down('sm')]: {
            fontSize: 16
        },
    },
    mainTitle: {
        fontweight: 700,
        fontSize: 36,
        fontFamily: 'Helvetica'
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        marginLeft: 15,
    },
    linkText: {
        color: theme.palette.primary.main,
        fontSize: 16,
        '&:hover': {
            color: '#23527c',
            textDecoration: 'underline',
        },
        '&:focus': {
            color: '#23527c',
            textDecoration: 'underline',
        },
        '&:active': {
            color: theme.palette.primary.main
        },   }
});


const TitleHeader = ({ classes, title, path, location: { pathname } }) => {
    return (
        <div className={classes.header}>
            <Typography
                variant='h6'
                className={classNames(classes.headerTitle, pathname !== '/' && classes.mainTitle)}>
                {title}
            </Typography>
            {path &&
                <Link to={path} className={classes.link}>
                    <Typography variant='title' className={classes.linkText}>(voir tout)</Typography>
                </Link>}
        </div>
    );
}

TitleHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    location: getLocation(state)
})

export default connect(mapStateToProps, null)(withStyles(styles)(TitleHeader));