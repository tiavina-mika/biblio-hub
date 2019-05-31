import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CustomizedLinearProgress  from '../admin/components/progress';
import { BASE_URL } from '../../redux/actions/constants';

const styles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        padding: `${theme.spacing.unit * 2}px`,

        // transition: 'box-shadow 150ms ease-out',
        // '&:hover': {
        //     boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        // }
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
        display: 'block',
        paddingTop: `${theme.spacing.unit}px`,
        textAlign: 'left'
    },
    header: {
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex'
    },
    link: {
        textDecoration: 'none'
    },
    // title: {
    //     [theme.breakpoints.down('sm')]: {
    //         fontSize: 18
    //     },
    // }
    subtitle: {
        fontWeight: 300,
        marginTop: 5,
        color:  '#616161',
        fontSize: 14,
    },
    linkSubtitle: {
        color: '#17a288',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 300
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        marginTop:  `${theme.spacing.unit * 5}px`,
    }
});

const Book = ({ classes, book }) => {
    return (
        <Grid item key={book._id} xs={6} sm={6} md={3} lg={2}>
            <Link to={`/livres/${book.slug}`} className={classes.link}>
            
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={`${BASE_URL}/api/books/photo/${book._id}`}
                        title={book.title}
                    />
                    <CardActions className={classes.cardActions}>
                        <Typography gutterBottom variant="h6" component="h2">
                            {book.title}
                        </Typography>
                        {book.author &&
                            <Typography variant="title" className={classes.subtitle}>
                            Par <Link to={`/auteurs/${book.author.slug}`} className={classes.linkSubtitle}>
                                    {`${book.author && book.author.first_name} ${book.author && book.author.family_name}`}
                                </Link>
                            </Typography>}
                    </CardActions>
                </Card>
            </Link>
        </Grid>
    );
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);