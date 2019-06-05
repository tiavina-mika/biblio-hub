import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { connect } from 'react-redux';
import { getOneBySlug } from '../../redux/actions/authors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BASE_URL } from '../../redux/actions/constants'
import Typography from '@material-ui/core/Typography';
import Markdown from '../blocks/markdown';
import { getAuthorState, getAuthorsLoading } from '../../redux/root-reducer';
import Genres from '../sidebars/genres';
import Books from '../sidebars/books';
import { getBooksByAuthor } from '../../redux/actions/books';
import Spinner from '../blocks/spinner';
import Helmet from '../helmet';

const styles = theme => ({
  layout: {
      width: 'auto',
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
    // maxWidth: 345,
  },
  cardMain: {
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,    
    },
    [theme.breakpoints.down('md')]: {     
         marginTop: theme.spacing.unit * 4,        
    },
    marginBottom: 5,
    textAlign: 'left',
  },
  title: {
    fontWeight: 700,
    width: '100%'
  },
  subtitle: {
    fontWeight: 700,
    marginTop: 5,
    opacity: 0.5
  },
  downloadButtons: {
    padding: `${theme.spacing.unit * 2}px 0`,
    display: 'flex'
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
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  titleRightSidebar: {
    fontWeight: 600,
    fontSize: 18
  },
  chip: {
    borderColor: '#d64444',
    color: '#d64444',
    marginLeft: 15,
    marginTop: -8
  },
});

class Author extends React.Component {
  state = {data: '', books: ''}
  async componentDidMount() {
      const author = await this.props.getOneBySlug(this.props.match.params.slug);
      const books = await this.props.getBooksByAuthor(author._id);
      this.setState({data: author, books});
  }
  render() {
    const { classes, loading } = this.props;
    const { data, books } = this.state;
    if(loading) {return <Spinner />};

    return (
      data && !loading ?
      <div className={classNames(classes.layout, classes.cardGrid)}>
          <Helmet title={data.family_name} />
          <Grid fluid >
              <Row center="xs">
                <Col xs={12} sm={12} md={12} lg={3} start="xs">
                  <Card>
                    <Genres />
                  </Card>
                  <Card style={{marginTop: 30, padding: 10}}>
                      <Books books={books} headerTitle={`Les livres de ${data.family_name}`}/>
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} start="xs">
                  <Card className={classes.cardMain}>
                    <Typography variant="h3" className={classes.title}>
                    {`${data.first_name} ${data.family_name}`}
                    </Typography>
                    { data.description &&<Markdown input={data.description}/>}
                    </Card>
                  </Col>

                  <Col xs={8} sm={6} md={4} lg={2} start="xs">
                    { data && data.photo ?
                        <Card className={classes.cardRightSidebar}>
                            <CardMedia
                              component="img"
                              alt={data.title}
                              className={classes.media}
                              height={300}
                              image={`${BASE_URL}/api/authors/photo/${data._id}`}
                              title={`${data.first_name} ${data.family_name}`}
                            />
                        </Card> : null
                  }
                </Col>
              </Row>
            </Grid>
      </div>
      : <Spinner />   
    );
    }
}

Author.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getAuthorState(state),
  loading: getAuthorsLoading(state),
});

export default connect(mapStateToProps, { getBooksByAuthor, getOneBySlug })(withStyles(styles)(Author))
