import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { connect } from 'react-redux';
import { getOneBySlug } from '../../redux/actions/genres';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GridMaterial from '@material-ui/core/Grid';
import { BASE_URL } from '../../redux/actions/constants'
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import CommentIcon from '@material-ui/icons/Comment';
import EyeOutlineIcon from 'mdi-material-ui/EyeOutline';
import { getGenreState, getGenresLoading, getBooksLoading } from '../../redux/root-reducer';
import { Link } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import { getBooksByGenre } from '../../redux/actions/books';
import Spinner from '../blocks/spinner';

const styles = theme => ({
    // card: {
    //     height: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     borderRadius: 0,
    //     boxShadow: 'none',
    //     backgroundColor: 'transparent',
    //     padding: `${theme.spacing.unit * 2}px`,
    // },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        height: 300,
        width: '100%',
    },
    cardActions: {
      display: 'block',
      paddingTop: `${theme.spacing.unit}px`,
      textAlign: 'left'
    },
    subtitle: {
        fontWeight: 300,
        marginTop: 5,
        color:  '#616161',
        fontSize: 14,
    },
    header: {
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex'
    },
    link: {
        textDecoration: 'none'
    },
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
  listItemText: {
    display: 'flex',
    alignItems: 'center'
  },
  listItem: {
    padding: 0
  },
  primaryText : {
    marginRight: 5,
    fontWeight: 500
  },
  divider: {
      borderColor: "rgba(255,255,255,.4)",
      borderWidth: '.5px'
  },
  card: {
    borderRadius: 0,
    boxShadow: '0 5px 6px rgba(0,0,0,.2), 0 3px 6px rgba(0,0,0,.23)',
    transition: 'box-shadow .15s',
      '&:hover': {
        boxShadow: '0 5px 3px rgba(0, 0, 0, 0.3), 0 2px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  cardIcons: {
    borderTop: '1px solid rgba(0, 0, 0, .1)',
    paddingTop: theme.spacing.unit * 2,
  },
  cardTitle: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    marginBottom: 5,
    textAlign: 'left',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  title: {
    fontWeight: 700,
    width: '100%'
  },
  linkSubtitle: {
    color: '#17a288',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 300
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  image: {
    objectFit: 'cover',
    width: '50%'
  },
  icon: {
    color: '#212121'
  },
  badge: {
    marginRight: theme.spacing.unit
  }
});

class Genre extends React.Component {
  state = {data: '', books: ''}
  async componentDidMount() {
      const genre = await this.props.getOneBySlug(this.props.match.params.slug);
      const books = await this.props.getBooksByGenre(genre._id, true, 10);
      this.setState({data: genre, books});
  }
  render() {
    const { classes, loading } = this.props;
    const { data, books } = this.state;
    if(loading) {return <Spinner />};

    return (
      data ?
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={8} md={7} lg={12} start="xs">
                  <Card className={classes.cardTitle}>
                      <Typography variant="h3" className={classes.title}>
                      {data.name}
                      </Typography>
                  </Card>
                  <GridMaterial container spacing={16}>
                      { books && books.map(n => (
                      <GridMaterial item key={n._id} sm={6} md={3} lg={2}>
                          <Link to={`/livres/${n.slug}`} className={classes.link}>                
                              <Card className={classes.card}>
                                  <CardMedia
                                      className={classes.cardMedia}
                                      image={`${BASE_URL}/api/books/photo/${n._id}`}
                                      title={n.title}
                                  />
                                  <CardActions className={classes.cardActions}>
                                      <Typography gutterBottom variant="h6" component="h2">
                                          {n.title}
                                      </Typography>
                                      {n.author &&
                                          <Typography variant="title" className={classes.subtitle}>
                                          Par <Link to={`/auteurs/${n.author.slug}`} className={classes.linkSubtitle}>
                                                  {`${n.author && n.author.first_name} ${n.author && n.author.family_name}`}
                                              </Link>
                                          </Typography>}
                                  </CardActions>

                                  <CardActions className={classes.cardIcons}>
                                    <Badge className={classes.badge} badgeContent={n.comments.length} max={99} color="primary">
                                          <CommentIcon className={classes.icon}/>
                                      </Badge>
                                      <Badge className={classes.badge} badgeContent={n.views} max={9999} color="primary">
                                          <EyeOutlineIcon className={classes.icon}/>
                                      </Badge>
                                  </CardActions>
                              </Card>
                          </Link>
                      </GridMaterial>))}
                  </GridMaterial>
              </Col>
            </Row>
          </Grid>
      </div>
      : <Spinner />   
    );
    }
}

Genre.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getGenreState(state),
  loading: getGenresLoading(state),
});

export default connect(mapStateToProps, { getBooksByGenre, getOneBySlug })(withStyles(styles)(Genre))
