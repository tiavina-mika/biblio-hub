import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import NoData from '../blocks/no-data';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getAllGenres } from '../../redux/actions/genres';
import { BASE_URL } from '../../redux/actions/constants';
import TitleHeader from '../blocks/title-header';
import { getGenres, getGenresLoading } from '../../redux/root-reducer';
import { GENRES_HOME_LIMIT } from '../../redux/actions/constants';
import Spinner from '../blocks/spinner';

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 4}px 0`,
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        transition: 'box-shadow 150ms ease-out',
        '&:hover': {
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        }
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardActions: {
        flexGrow: 1,
        padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit}px`
    },
    header: {
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex'
    },
    link: {
        textDecoration: 'none'
    },
});


class Genres extends Component {
  componentDidMount() {
    this.props.getAllGenres(GENRES_HOME_LIMIT, 1);
  }
  render() {
    const { classes, data, loading, path } = this.props;

    if(loading) {
      return <Spinner color="rgba(0, 0, 0, .5)" height={50} width={50}/>
    }
    if(!data && !loading) {
        return <NoData title="Il n'y a pas encore de genre disponible sur le site"/>
    }

    return (
      data && data.genres
      ? <div className={classes.root}>
            <TitleHeader title='Decouvrez les livres par catégorie' path={path} />
            <Grid container spacing={16}>
                {data.genres.map(n => (
                <Grid item key={n._id} xs={12} sm={6} md={4} lg={2}>
                    <Link to={`/genres/${n.slug}`} className={classes.link}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={`${BASE_URL}/api/genres/photo/${n._id}`}
                                title={n.name}
                            />
                            <CardActions className={classes.cardActions}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {n.name}
                                </Typography>
                            </CardActions>
                        </Card>
                    </Link>
                </Grid>
                ))}
            </Grid>
        </div>
        : <Spinner/>
    );
  }
}

Genres.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getGenres(state),
  loading: getGenresLoading(state),
});

export default connect(mapStateToProps, { getAllGenres })(withStyles(styles)(Genres))