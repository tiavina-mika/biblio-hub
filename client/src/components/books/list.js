import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { getBooks, getBooksLoading } from '../../redux/root-reducer';
import Genres from '../sidebars/genres';
import { getAll } from '../../redux/actions/books';
import MainList from './main-list';
import Spinner from '../blocks/spinner';
import { LIST_BOOKS_PER_PAGE } from '../../redux/actions/constants';
import NoData from '../blocks/no-data';

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
  breadcrumbs: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    marginBottom: 25
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
      paddingTop: `${theme.spacing.unit}px`
  },
  root: {
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 4}px 0`,
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px 0`,
  },
});

class List extends React.Component {
  componentDidMount() {
    const { getAll, match : { params }} = this.props;    
    params ? getAll(LIST_BOOKS_PER_PAGE, 1, true, null, params.search) : getAll(LIST_BOOKS_PER_PAGE, 1, true);
  }
  handleChangePage = page => {
    this.props.getAll(LIST_BOOKS_PER_PAGE, page, true);
  }
  render() {
    const { classes, loading, data } = this.props;
    
    if(loading) {
      return <Spinner />
    }
    if(!data && !loading) {
      return <NoData title="Il n'y a pas encore de livre" link/>
    }
    return (
      data ?
        <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid fluid>
                <Row center="xs">
                <Col  xs={12} sm={8} md={3} lg={3} start="xs">
                    <Card>
                        <Genres />
                    </Card>
                </Col>
                {data && data.books && <MainList 
                    books={data.books}
                    currentPage={data.currentPage}
                    total={data.total}
                    headerTitle={`Liste des livres`}
                    onChange={this.handleChangePage}
                    pages={data.pages}
                    sm={8}
                    md={7}
                    lg={9}
                    listLg={3}
                /> }
                </Row>
            </Grid>
        </div>
        : <Spinner />   
        );
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    data: getBooks(state),
    loading: getBooksLoading(state),
  });
  
  export default connect(mapStateToProps, { getAll })(withStyles(styles)(List));
