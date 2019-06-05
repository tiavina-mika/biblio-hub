import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import User from '@material-ui/icons/Person';
import { Link } from "react-router-dom";
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

  },
  menu: {
      width: 300
  }
};

class Sort extends React.Component {
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
                <Button
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit">
                    Trier par:
                </Button>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  className={classes.menu}
                >
                    <MenuItem style={{padding: '11.5px 50px 11.5px 20px'}} onClick={this.handleClose}>
                        <Link to="/dashboard/livres/trier/titre">
                            <Typography style={{marginTop: '3px', fontSize: 16}}>Titre</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem style={{padding: '11.5px 50px 11.5px 20px'}} onClick={this.handleClose}>
                        <Link to="/dashboard/livres/trier/date">
                            <Typography style={{marginTop: '3px', fontSize: 16}}>Date</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem style={{padding: '11.5px 50px 11.5px 20px'}} onClick={this.handleClose}>
                        <Link to="/dashboard/livres/trier/telechargement">
                            <Typography style={{marginTop: '3px', fontSize: 16}}>Telechargement</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem style={{padding: '11.5px 50px 11.5px 20px'}} onClick={this.handleClose}>
                        <Link to="/dashboard/livres/trier/vues">
                            <Typography style={{marginTop: '3px', fontSize: 16}}>Vues</Typography>
                        </Link>
                    </MenuItem>
                </Menu>
            </div>
    );
  }
}

Sort.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sort);