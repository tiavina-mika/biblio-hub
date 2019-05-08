import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

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

let Header = ({ authenticated, isAdmin, classes, theme: {palette: {primary: { main, contrastText }}} }) => {

    const Authenticated = <Typography variant="h6" color="inherit" className={classes.item}>
            <NavLink exact activeStyle={{ color: '#000' }} to="/logout" style={{textDecoration: 'none', color: contrastText}}>
                Se Déconnecter
            </NavLink>
        </Typography> ; 

    const Unauthentiated = [
        <Typography variant="h6" color="inherit" className={classes.item}>
            <NavLink exact activeStyle={{ color: '#000' }} to="/signin" style={{textDecoration: 'none', color: contrastText}}>
                Login
            </NavLink>
        </Typography>,
        <Typography variant="h6" color="inherit" className={classes.item}>
            <NavLink exact activeStyle={{ color: '#000' }} to="/signup" style={{textDecoration: 'none', color: contrastText}}>
                Register
            </NavLink>
        </Typography>       
    ];

    const Dashboard = <Typography variant="h6" color="inherit" className={classes.item}>
            <NavLink exact activeStyle={{ color: '#000' }} to="/dashboard" style={{textDecoration: 'none', color: contrastText}}>
                Dashboard
            </NavLink>
        </Typography> ;

    
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
                    {authenticated ? Authenticated : Unauthentiated}
                    {authenticated && isAdmin ? Dashboard : null}
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = state => ({
    authenticated: state.user.get('authenticated'),
    isAdmin: state.user.get('isAdmin'),
})
Header = connect(mapStateToProps)(withTheme()(Header));

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Header);