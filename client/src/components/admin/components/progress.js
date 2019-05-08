import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

// const styles = {
//   root: {
//     backgroundColor: 'rgba(0, 0, 0, 0)'
//   },
//   back: {
//     color: '#eef3fd',
//     left: '50%',
//     top: 400,
//     position: 'absolute'
//   },
//   front: {
//     color: '#6798e5',
//     animationDuration: '550ms',
//     position: 'absolute',
//     left: '50%',
//     top: 400,
//   },
// };

// let CustomizedCircularProgress = ({ classes }) => {
//   return (
//       <div className={classes.root}>
//         <CircularProgress
//           variant="determinate"
//           value={100}
//           className={classes.back}
//           size={60}
//           thickness={6}
//         />
//         <CircularProgress
//           variant="indeterminate"
//           disableShrink
//           className={classes.front}
//           size={60}
//           thickness={6}
//         />
//       </div>
//   );
// }

// CustomizedProgress.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export const CustomizedProgress = withStyles(styles)(CustomizedCircularProgress);

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

