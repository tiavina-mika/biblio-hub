import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Cancel from 'mdi-material-ui/Cancel';

const styles = theme => ({
    paper: {
        padding: `${theme.spacing.unit * 4}px`,
    },
});

const NoData = props => {
    const { classes, title, link } = props;
    return (
         <Paper elevation={1} className={classes.paper}>
            <Cancel />
                <Typography variant="subtitle">
                {title} <Link to={link}>Voulez-vous en ajouter?</Link>
            </Typography>
        </Paper>
    )
}

NoData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoData);
