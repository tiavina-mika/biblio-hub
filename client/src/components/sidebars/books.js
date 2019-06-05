import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import CommentOutlineIcon from 'mdi-material-ui/CommentOutline';
import EyeOutlineIcon from 'mdi-material-ui/EyeOutline';
import DownloadIcon from 'mdi-material-ui/Download';
import { BASE_URL } from '../../redux/actions/constants';

const styles = theme => ({
    card: {
        display: 'flex',
        boxShadow: 'none',
        borderRadius: 0,
        borderBottom: '1px solid rgba(0, 0, 0, .1)',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: `0px ${theme.spacing.unit}px`,
    },
    content: {
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 500
    },
    cover: {
        width: 130,
        height: 160,
    },
    media: {
        width: '100%',
        height: '100%'
    },

    playIcon: {
        height: 38,
        width: 38,
    },
    listSubheader: {
        textAlign: 'left'
    },
    secondaryTitle: {
        marginTop: theme.spacing.unit,
        lineHeight: 1,
        fontFamily: 'Nunito'
    },
    link: {
        color: theme.palette.grey[600],
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    mainLink: {
        textDecoration: 'none'
    },
    cardIcons: {
        display: 'flex',
        justifyContent: 'center'
    },
    commentCount: {
        marginLeft: 3,
        fontSize: 14
    },
    icon: {
        fontSize: 16
    },
    eyeIcon: {
        fontSize: 18
    },
    iconsContainer: {
        display: 'flex',
        alignItems: 'center',
        color: '#7f7f7f',
        marginRight: 10,
    }
});

const Books = props => {
  const { classes, theme, books, headerTitle } = props;

  return ([
        <ListSubheader inset className={classes.listSubheader}>{headerTitle}</ListSubheader>,
        books.map(data => (
            <Link to={`/livres/${data.slug}`} className={classes.mainLink} key={data._id}>
                <Card className={classes.card}  key={data._id}>
                    <CardMedia
                        className={classes.cover}
                        image={`${BASE_URL}/api/books/photo/${data._id}`}
                        title={`${data.title} par ${data.author.first_name} ${data.author.family_name}`}
                        classes={{media: classes.media}}
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5" className={classes.title}>
                                {data.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" className={classes.secondaryTitle}>
                                <Link to={`/auteurs/${data.author.slug}`} className={classes.link}>{`${data.author.first_name} ${data.author.family_name}`}</Link>
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.cardIcons}>
                            <div className={classes.iconsContainer}>
                                <CommentOutlineIcon className={classes.icon}/>
                                <span className={classes.commentCount}>{data.comments.length}</span>
                            </div>
                            <div className={classes.iconsContainer}>
                                <EyeOutlineIcon className={classes.eyeIcon}/>
                                <span className={classes.commentCount}>{data.views}</span>
                            </div>
                            <div className={classes.iconsContainer}>
                                <DownloadIcon className={classes.eyeIcon}/>
                                <span className={classes.commentCount}>{data.download}</span>
                            </div>
                        </CardActions>
                    </div>
                </Card>
            </Link>
        ))
    ]);
}

Books.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Books);