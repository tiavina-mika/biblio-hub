import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const DASHBOARD_MAIN_COLOR = '#1b2327';

const progressStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: '#00695c',
  },
  linearColorPrimary: {
    backgroundColor: '#92bdd1',
  },
  linearBarColorPrimary: {
    backgroundColor: DASHBOARD_MAIN_COLOR
  },
});

const CustomizedLinearProgress = ({classes}) => {
  return (
    <Paper className={classes.root}>
      <LinearProgress
        classes={{
          colorPrimary: classes.linearColorPrimary,
          barColorPrimary: classes.linearBarColorPrimary,
        }}
      />
    </Paper>
  );
}

CustomizedLinearProgress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(progressStyles)(CustomizedLinearProgress);

