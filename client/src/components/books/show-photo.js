import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { BASE_URL } from '../../redux/actions/constants';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
  listItemText: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  listItem: {
    padding: 0
  },
  divider: {
      borderColor: "rgba(255,255,255,.4)",
      borderWidth: '.5px'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  image: {
    objectFit: 'cover',
    width: '50%'
  },
  cardRightSidebar: {
    marginBottom: 15
  },
  titleRightSidebar: {
    fontWeight: 600,
    fontSize: 18
  },
  link: {
    color: '#17a288',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 300
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: 'transparent',
    padding: `${theme.spacing.unit * 2}px`,
  },
  cardMedia: {
      paddingTop: '56.25%', // 16:9
      height: 300,
      width: '100%',
      boxShadow: '0 5px 6px rgba(0,0,0,.2), 0 3px 6px rgba(0,0,0,.23)',
      transition: 'box-shadow .15s',
        '&:hover': {
          boxShadow: '0 10px 8px rgba(0, 0, 0, 0.3), 0 6px 10px rgba(0, 0, 0, 0.3)',
      }
  },
  primaryText: {
    marginRight: 10
  }
});

const Photo = ({classes, data}) => (
        <Card className={classes.cardRightSidebar}>
            <CardMedia
                component="img"
                alt={data.title}
                className={classes.media}
                height={300}
                image={`${BASE_URL}/api/books/photo/${data._id}`}
                title={`${data.title} par ${data.author.first_name} ${data.author.family_name}`}
            />
            <CardContent>
                <List>
                    <ListItem
                            classes={{divider: classes.divider}}
                            className={classes.listItem}
                            divider>
                            <ListItemText
                                primary="Titre: "
                                className={classes.listItemText}
                                secondary={data.title}
                                classes={{primary: classes.primaryText, secondary: classes.secondaryText}}/>
                        </ListItem>
                        <ListItem
                            classes={{divider: classes.divider}}
                            className={classes.listItem}
                            divider>
                            <ListItemText
                                primary="Auteur: "
                                className={classes.listItemText}
                                secondary={data.author.family_name}
                                classes={{primary: classes.primaryText, secondary: classes.secondaryText}}/>
                        </ListItem>
                </List>
            </CardContent>
        </Card>          
);


Photo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Photo);
