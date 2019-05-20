import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '10px 16px',
    border: '1px solid',
    borderRadius: 0,
    fontWeight: 700,
    lineHeight: 1.5,
    backgroundColor: '#17a288',
    borderColor: '#17a288',
    fontFamily: [
      'Helvetica',
      'sans-serif',

    ].join(','),
    '&:hover': {
      backgroundColor: '#17a288',
      borderColor: '#17a288',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#17a288',
      borderColor: '#17a288',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
});

export const IconButton =  withStyles(styles)((props) => {
  const { classes, label, icon } = props;

  return (
      <Button
        variant="contained"
        color="primary"
        disableRipple
        className={classNames(classes.margin, classes.bootstrapRoot)}
      >
        {icon}{label}
      </Button>
  );
})

IconButton.propTypes = {
  classes: PropTypes.object.isRequired,
};


