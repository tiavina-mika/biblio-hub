import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';

const styles = {
    root: {
      flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#686767'
    },
    item: {
        marginRight: 35,
    },
  };

let Header = ({ classes, theme: {palette: {primary: { main, contrastText }}} }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" classes={{colorDefault: classes.appBar}}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/" style={{textDecoration: 'none', color: contrastText}}>
                                Home
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/books" style={{textDecoration: 'none', color: contrastText}}>
                            Books
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/signin" style={{textDecoration: 'none', color: contrastText}}>
                            Login
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/signup" style={{textDecoration: 'none', color: contrastText}}>
                            Register
                        </NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
Header = withTheme()(Header);

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Header);