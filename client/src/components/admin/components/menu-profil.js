import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import User from '@material-ui/icons/Person';
import { NavLink } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Power from 'mdi-material-ui/Power';
import { BASE_URL } from '../../../redux/actions/constants';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menu: {
      width: 300
  },
  navLink: {
    color: "#000",
    textDecoration: "none",
    verticalAlign: 'bottom',
    display: 'flex',
    width: '100%'
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
};

class MenuProfil extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleProfilClick = () => {
    this.setState({ anchorEl: null });
    this.props.history.push(`dashboard/profile/${this.props.currentUser.id}`);
  };

  render() {
    const { classes, currentUser, admin } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (<div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    className={classes.iconButton}
                    color="inherit">
                    {currentUser.photo
                      ? <Avatar src={`${BASE_URL}/api/users/photo/${currentUser._id}`}/>
                      : <AccountCircle style={{fontSize: 34, color: '#fff'}}/> }
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                  className={classes.menu}
                >
                    <MenuItem style={{padding: '11.5px 50px 11.5px 20px'}} onClick={this.handleClose}>
                        <NavLink
                            className={classes.navLink}
                            to={admin ? `/dashboard/profile/${currentUser._id}` : `/profil`}>
                                <User style={{ marginRight: 30 }}/>
                                <Typography style={{marginTop: '3px', fontSize: 16}}>Profil</Typography>
                        </NavLink>
                    </MenuItem>
                    <MenuItem style={{padding: '11.5px 50px 11.5px 20px'}} onClick={this.handleClose}>
                        <NavLink
                          className={classes.navLink}
                          to="/logout">
                              <Power style={{ marginRight: 30 }}/>
                              <Typography style={{marginTop: '3px', fontSize: 16}}>Deconnecter</Typography>
                        </NavLink>
                    </MenuItem>
                </Menu>
            </div>
    );
  }
}

MenuProfil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuProfil);