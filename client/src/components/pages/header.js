import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, List, ListItem,
  withStyles, Grid, SwipeableDrawer, ListSubheader
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Search from '../forms/search';

const styles = theme => ({
    logo: {
        width: 50,
        height: 50
    },
    root: {
      flexGrow: 1,
    },
    grow: {
        flexGrow: 0.2,
    },
    rightGrow: {
      flexGrow: 0.6
    },
    appBar: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: 8,
        paddingBottom: 5
    },
    login: {
      border: '1px solid #fff',
      padding:`${theme.spacing.unit / 2}px ${theme.spacing.unit * 5}px`,
      '&:hover': {
        color: 'red'
      }
    },
    item: {
        marginRight: 35,
    },
    list : {
      width : 200,
    },
    padding : {
      paddingRight : 30,
      cursor : "pointer",
    },
    sideBarIcon : {
      padding : 0,
      color : "white",
      cursor : "pointer",
    },
    divider: {
      borderColor: "rgba(0,0,0,.4)",
      borderWidth: '.5px'
    },
    listSubheader: {
      textAlign: 'left',
    }
});

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {drawerActivate:false, drawer:false};
  }

  componentWillMount(){
    if(window.innerWidth <= 992){
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth <= 992){
        this.setState({drawerActivate:true});
      }
      else{
        this.setState({drawerActivate:false})
      }
    });
  }

  //Small Screens
  smallScreen = () =>{
    const { authenticated, isAdmin, classes, theme: {palette: {primary: { contrastText }}} }= this.props;

    const Authenticated =  <NavLink exact activeStyle={{ color: '#000' }} to="/logout" style={{textDecoration: 'none', color: '#000'}}>
                              Se Déconnecter
                          </NavLink>;
    const Login =  <NavLink exact activeStyle={{ color: '#000' }} to="/signin" style={{textDecoration: 'none', color: '#000'}}>
                    Login
                </NavLink>;
    const Register =  <NavLink exact activeStyle={{ color: '#000' }} to="/signup" style={{textDecoration: 'none', color: '#000'}}>
                      Register
                  </NavLink>;
    const Dashboard =  <NavLink exact activeStyle={{ color: '#000' }} to="/dashboard" style={{textDecoration: 'none', color: '#000'}}>
                            Dashboard
                        </NavLink>;
    return (
      <div>
        <AppBar >
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />
              <Typography color="inherit" variant = "headline">
                    <NavLink exact activeStyle={{ color: '#000' }} to="/" style={{textDecoration: 'none', color: contrastText}}>
                        <img src={`${process.env.PUBLIC_URL}/logo.png`} className={classes.logoSmall}/>
                    </NavLink>
              </Typography>
              <Typography color="inherit" variant = "headline"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>

           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>

            <List className = {this.props.classes.list}>
                <ListSubheader inset className={classes.listSubheader}>Navigation</ListSubheader>
                <ListItem key = {1} button divider >
                    <NavLink exact activeStyle={{ color: '#000' }} to="/livres" style={{textDecoration: 'none', color: '#000'}}>
                        Livres
                    </NavLink>
                </ListItem>
                <ListItem key = {2} button divider >
                    <NavLink exact activeStyle={{ color: '#000' }} to="/auteurs" style={{textDecoration: 'none', color: '#000'}}>
                        Auteurs
                    </NavLink>
                </ListItem>
                <ListItem key = {3} button divider  classes={{divider: classes.divider}}>
                    <NavLink exact activeStyle={{ color: '#000' }} to="/genres" style={{textDecoration: 'none', color: '#000'}}>
                        Genres
                    </NavLink>
                </ListItem>

                <ListSubheader inset className={classes.listSubheader}>Authentification</ListSubheader>
                <ListItem key = {5} button divider >{Authenticated}</ListItem>
                {!authenticated && <ListItem key = {6} button divider >{Login}</ListItem>}
                {!authenticated && <ListItem key = {7} button divider >{Register}</ListItem>}
                {authenticated && isAdmin 
                  ? <ListItem key = {8} button divider > {Dashboard}</ListItem>
                  : null }
             </List>

         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  largerScreen = () => {
    const { authenticated, isAdmin, classes, theme: {palette: {primary: { contrastText }}} }= this.props;

    const Authenticated = <Typography variant="h6" color="inherit" className={classes.item}>
            <NavLink exact activeStyle={{ color: '#000' }} to="/logout" style={{textDecoration: 'none', color: contrastText}}>
                Se Déconnecter
            </NavLink>
        </Typography> ; 

    const Unauthentiated = [
        <Typography variant="h6" color="inherit" className={classNames(classes.item, classes.login)}>
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
                    <div className={classes.grow} />
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/" style={{textDecoration: 'none', color: contrastText}}>
                        <img src={`${process.env.PUBLIC_URL}/logo.png`} className={classes.logo}/>
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/livres" style={{textDecoration: 'none', color: '#fff'}}>
                            Livres
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/auteurs" style={{textDecoration: 'none', color: '#fff'}}>
                            Auteurs
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" color="inherit" className={classes.item}>
                        <NavLink exact activeStyle={{ color: '#000' }} to="/genres" style={{textDecoration: 'none', color: '#fff'}}>
                            Genres
                        </NavLink>
                    </Typography>
                    <div className={classes.grow} />
                    <div style={{width: '20%'}}>
                        <Search />
                    </div>
                    <div className={classes.grow} />
                    {authenticated && isAdmin ? Dashboard : null}
                    {authenticated ? Authenticated : Unauthentiated}
                </Toolbar>
            </AppBar>
        </div>
    )
  }

  render(){
    return(
        this.state.drawerActivate ? this.smallScreen() : this.largerScreen()
    );
  }
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