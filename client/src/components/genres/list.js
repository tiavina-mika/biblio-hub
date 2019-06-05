import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import GridList from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getAllGenres } from '../../redux/actions/genres';
import Spinner from '../blocks/spinner';
import { BASE_URL } from '../../redux/actions/constants';
import TitleHeader from '../blocks/title-header';
import { getGenres, getGenresLoading } from '../../redux/root-reducer';
import { LIST_GENRES_PER_PAGE } from '../../redux/actions/constants';
import Pagination from '../blocks/pagination';
import { Grid, Row, Col } from 'react-flexbox-grid';
import NoData from '../blocks/no-data';
import Helmet from '../helmet';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1500,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 4}px 0`,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        marginTop:  `${theme.spacing.unit * 5}px`,
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
        const { getAllGenres, match : { params }} = this.props;
        params ? getAllGenres(LIST_GENRES_PER_PAGE, 1, params.search) : getAllGenres(LIST_GENRES_PER_PAGE, 1);
  }
  handleChangePage = page => {
    this.props.getAllGenres(LIST_GENRES_PER_PAGE, page);
  }
  render() {
    const { classes, data, loading } = this.props;

    if(loading) {
      return <Spinner />
    }
    if(!data && !loading) {
        return <NoData title="Il n'y a pas encore de genre" link/>
    }

    return (
      data && data.genres
        ? <div className={classNames(classes.layout, classes.cardGrid)}>
                <Helmet title="Catégories" />
                    <Grid fluid>
                        <Row center="xs">
                            <Col xs={12} sm={12} md={12} lg={12} start="xs">

                                <GridList container spacing={8} justify="center">
                                    <GridList item sm={12} md={12} lg={12} className={classes.title}>
                                        <TitleHeader title='Decouvrez les livres par catégorie' />
                                    </GridList>
                                    <GridList container spacing={16} justify="center">
                                        {data.genres.map(n => (
                                        <GridList item key={n._id} sm={6} md={4} lg={2}>
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
                                        </GridList>
                                        ))}
                                    </GridList>
                            { data.genres.length >= LIST_GENRES_PER_PAGE &&
                                <GridList item sm={12} md={12} lg={12} className={classes.title}>
                                    <Pagination
                                        currentPage={data.currentPage}
                                        total={data.pages}
                                        onChange={this.handleChangePage}
                                        primary
                                        position='center'
                                    />
                                </GridList> }
                        </GridList>
                    </Col>
                </Row>
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