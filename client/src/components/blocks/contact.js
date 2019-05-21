import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import PhoneIcon from 'mdi-material-ui/Phone';
import EmailOutlineIcon from 'mdi-material-ui/EmailOutline';
import MapMarkerIcon from 'mdi-material-ui/MapMarker';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const  Contact = (props) => {
  const { classes } = props;
  return (
    <List className={classes.root}>
        <ListItem>
            <ListItemIcon>
                <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Numero Téléphone" secondary="+261 34 18 657 49" />
      </ListItem>
      <ListItem>
            <ListItemIcon>
                <EmailOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Email" secondary="tiavinamika@gmail.com" />
      </ListItem>
      <ListItem>
            <ListItemIcon>
                <MapMarkerIcon />
            </ListItemIcon>
        <ListItemText primary="Notre Adresse" secondary={`VN 50B Ankazola
        Mahazoarivo, Antananarivo
        Madagascar`} />
      </ListItem>
    </List>
  );
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);