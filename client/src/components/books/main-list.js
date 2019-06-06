import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Col } from 'react-flexbox-grid';
import { BASE_URL } from '../../redux/actions/constants'
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import TitleHeader from '../blocks/title-header';
import { LIST_BOOKS_PER_PAGE } from '../../redux/actions/constants';
import { getLocation } from '../../redux/root-reducer';
import Pagination from '../blocks/pagination';

const styles = theme => ({
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
        display: 'block',
        paddingTop: `${theme.spacing.unit}px`,
        textAlign: 'left'
    },
    root: {
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 4}px 0`,
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px 0`,
        textAlign: 'center',
    },
    header: {
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex'
    },
    link: {
        textDecoration: 'none'
    },
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
    },
    sortedByContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop:  theme.spacing.unit * 5,
        marginBottom:  theme.spacing.unit * 3,
    },
    sortBy: {
        fontFamily: 'Century Gothic Regular',
        fontSize: 16
    },
    linkSortedBy: {
        fontFamily: 'Helvetica',
        fontSize: 16,
        fontWeight: 400,
        textDecoration: 'none',
        color: '#a39b9b',
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    active: {
        color: '#737171',
        fontWeight: 700
    }
});

const MainList = props => {
    const { classes, books, headerTitle, currentPage, pages, onChange, path, xs, sm, md, lg, listXs, listSm, listMd, listLg, location: { pathname } } = props;  

    return (
            <Col xsOffset={12} xs={xs || 12} sm={sm || 12} md={md || 12} lg={lg || 12} start="xs">
                <GridList container spacing={8} justify="center">
                <GridList item sm={12} md={12} lg={12} className={classes.title}>
                        {headerTitle && <TitleHeader title={headerTitle} path={path} /> }
                    </GridList>
                    <GridList item xs={12} sm={12} md={12} lg={12} className={classes.sortedByContainer}>
                        <Typography className={classes.sortBy}>Trier par: </Typography>
                        <Link
                            to={`/livres/trier/titre`}
                            className={classNames(classes.linkSortedBy, pathname.endsWith('/titre') && classes.active)}>
                                Titre
                        </Link>
                        <Link 
                            to={`/livres/trier/date`}
                            className={classNames(classes.linkSortedBy, pathname.endsWith('/livres') || pathname.endsWith('/date') && classes.active)}>
                                Récent
                        </Link>
                        <Link 
                            to={`/livres/trier/telechargement`}
                            className={classNames(classes.linkSortedBy, pathname.endsWith('/telechargement') && classes.active)}>
                                Le plus télélachargé
                        </Link>
                        <Link 
                            to={`/livres/trier/vues`}
                            className={classNames(classes.linkSortedBy, pathname.endsWith('/vues') && classes.active)}>
                                Vues
                        </Link>
                    </GridList>
                    { books.map(book => (
                    <GridList item key={book._id}  xs={listXs || 12} sm={listSm || 4} md={listMd ||3} lg={listLg || 2}>
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
                    </GridList>))}
                    { books.length >= LIST_BOOKS_PER_PAGE &&
                    <GridList item sm={12} md={12} lg={12} className={classes.title}>
                        <Pagination
                            currentPage={currentPage}
                            total={pages}
                            onChange={onChange}
                            primary
                            position='center'
                        />
                    </GridList> }

                </GridList>
            </Col>
        );
}

MainList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    location: getLocation(state)
});

export default connect(mapStateToProps, null)(withStyles(styles)(MainList));
