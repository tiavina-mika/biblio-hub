import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { getOneBySlug } from '../../redux/actions/books';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { getBookState, getBooksLoading } from '../../redux/root-reducer';
import Genres from '../sidebars/genres';
import Books from '../sidebars/books';
import { getBooksByAuthor } from '../../redux/actions/books';
import Main from './show-main';
import CommentDialog from '../comments/comment-dialog';
import Photo from './show-photo';
import AuthorPhoto from './show-author-photo';
// import MainList from './main-list';
import Comments from '../comments/comment';
import CommentForm from '../pages/comment';
import Spinner from '../blocks/spinner';
import { getUserId } from '../../redux/root-reducer';

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
  breadcrumbs: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    marginBottom: 25
  },
  image: {
    objectFit: 'cover',
    width: '50%'
  },
});

class Book extends React.Component {
  state = {data: '', books: ''}
  async componentDidMount() {
    const book = await this.props.getOneBySlug(this.props.match.params.slug);
    const books = await this.props.getBooksByAuthor(book.author._id);
    this.setState({data: book, books});
  }
  render() {
    const { classes, loading, history, authenticated, userId } = this.props;
    const { data, books } = this.state;
    
  if(loading) {return <Spinner />};
    return (
      data ?
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid fluid>
            <Row center="xs">
              <Col  xs={12} sm={12} md={12} lg={3} start="xs">
                  <Card>
                      <Genres />
                  </Card>
                  <Card style={{marginTop: 5, padding: 10}}>
                     <Books books={books.filter(n => n._id != data._id)} headerTitle={`Les autres livres de ${data.author.family_name}`}/>
                  </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} start="xs">
                  <Main data={data} push={history.push} authenticated={authenticated}/>
                  { data.comments && data.comments.map(n => n.postedBy && <Comments comment={n} book={data}/>)}
                  { authenticated
                    ? <CommentForm book={data} userId={userId}/>
                    : <CommentDialog title="Ajouter un commentaire" variant="contained" loading={loading} history={history} currentUrl={`/livres/${data.slug}`}/> }
              </Col>
              <Col xs={12} sm={8} md={5} lg={2} start="xs">
                { data && data.photo
                  ? <Photo data={data} />
                  : null }
                { data.author && data.author.photo.data && <AuthorPhoto data={data} push={history.push} />}
              </Col>
            </Row>
          </Grid>
          
          {/* <Grid fluid>
                <Row center="xs">
                  {books && <MainList 
                    books={books.filter(n => n._id != data._id)}
                    headerTitle={`Les autres livres de ${data.author.family_name}`}
                    path='/livres'/> }
              </Row>
          </Grid> */}

      </div>
      : <Spinner />   
    );
    }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.get('authenticated'),
  data: getBookState(state),
  loading: getBooksLoading(state),
  userId: getUserId(state),
});

export default connect(mapStateToProps, { getBooksByAuthor, getOneBySlug })(withStyles(styles)(Book))
