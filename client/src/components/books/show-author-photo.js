import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

import { BASE_URL } from '../../redux/actions/constants'
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  listItemText: {
    display: 'flex',
    alignItems: 'center'
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
  button: {
    textTransform: 'initial',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,

  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
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
  cardActions: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingTop: `${theme.spacing.unit}px`
  },
});

const AuthorPhoto = ({classes, data, push }) => (
        <Card className={classes.cardRightSidebar}>
            <CardMedia
                component="img"
                alt={data.title}
                className={classes.media}
                height={300}
                image={`${BASE_URL}/api/authors/photo/${data.author._id}`}
                title={data.author.family_name}
            />
            <CardContent>
            <Typography variant="title" className={classes.titleRightSidebar}>
                {`${data.author.first_name} ${data.author.family_name}`}
            </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                  size="small"
                  className={classes.button}
                  onClick={() => push(`/dashboard/auteur/${data.author._id}`)}
                  >
                  Voir plus
              </Button>
            </CardActions>
        </Card>
);

AuthorPhoto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthorPhoto);
