import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    header: {
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex',
        alignItems: 'center'
    },
    headerTitle: {
        textTransform: 'uppercase'
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


const TitleHeader = ({ classes, title, path }) => {
    return (
        <div className={classes.header}>
            <Typography variant='h6' className={classes.headerTitle}>{title}</Typography>
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

export default withStyles(styles)(TitleHeader);