import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ListSubheader from '@material-ui/core/ListSubheader';
import { BASE_URL } from '../../redux/actions/constants';

const styles = theme => ({
    card: {
        display: 'flex',
        boxShadow: 'none'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        // flex: '1 0 auto',
        textAling: 'left',
        paddingLeft: 5,
        paddingRight: 5,
    },
    title: {
        fontSize: 18
    },
    cover: {
        width: 130,
        height: 160,
    },
    media: {
        width: '100%',
        height: '100%'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    listSubheader: {
        textAlign: 'left'
    },
    secondaryTitle: {
        marginTop: 5,
        lineHeight: 1,
        fontFamily: 'Roboto'
    }
});

function MediaControlCard(props) {
  const { classes, theme, books, headerTitle } = props;

  return ([
        <ListSubheader inset className={classes.listSubheader}>{headerTitle}</ListSubheader>,
        books.map(data => (
            <Card className={classes.card}>
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
                            {`${data.author.first_name} ${data.author.family_name}`}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="Previous">
                            {theme.direction === 'rtl' ? <ListSubheader /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="Play/pause">
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton>
                        <IconButton aria-label="Next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </div>
                </div>
            </Card>
        ))
    ]);
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);