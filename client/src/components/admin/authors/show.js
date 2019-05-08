import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CustomizedLinearProgress  from '../components/progress';

import { getAuthor, remove } from '../../../redux/actions/authors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CustomizedBreadcrumbs from '../components/breadcrumbs';
import FloatingButtonActions from '../components/floating-button-actions';
import { BASE_URL } from '../../../redux/actions/constants';
import ReactMarkdown from 'react-markdown/with-html';
import { Typography } from '@material-ui/core';
import { getBooksByAuthor } from '../../../redux/actions/books';
import ListBy  from '../books/list-by';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  th: {
    fontWeight: 700
  },
  card: {
    // maxWidth: 345,
  },
  cardTitle: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 700
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
  }
});

class Author extends React.Component {
  state = {books: ''};
  async componentDidMount() {
    const author = await this.props.getAuthor(this.props.match.params.id);
    const books = await this.props.getBooksByAuthor(author._id);
    this.setState({books: books});
  }
  handleDeleteAuthor = (id) => {
    this.props.remove(id);
  }
   render() {
    const { classes, data, loading } = this.props;
    const { books } = this.state;
    if(loading) {
      return <CustomizedLinearProgress />;
    }
    return (
      data && !loading ?
      <div className={classes.root}>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={8} start="xs">
              <CustomizedBreadcrumbs
                text1="Auteurs"
                link1="/dashboard/auteurs"
                actualText={data.family_name}
              />
              <Card className={classes.cardTitle}>
                <Typography variant="title" className={classes.title}>
                  {`${data.first_name} ${data.family_name}`}
                </Typography>
              </Card>
              <Card className={classes.card}>
                <Table className={classes.table}>
                  <TableRow>
                      <TableCell align="right">Prenoms</TableCell>
                      <TableCell align="left" className={classes.th}>{data.first_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Nom</TableCell>
                      <TableCell align="left"  className={classes.th}>{data.family_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Date de Naissance</TableCell>
                      <TableCell align="left"  className={classes.th}>{moment(new Date(data.date_of_birth)).format('DD MMMM YYYY')}</TableCell>
                    </TableRow>
                    { data.date_of_death &&
                    <TableRow>
                      <TableCell align="right">Date de décès</TableCell>
                      <TableCell align="left"  className={classes.th}>{moment(new Date(data.date_of_death)).format('DD MMMM YYYY')}</TableCell>
                    </TableRow> }
                    <TableRow>
                      <TableCell align="right">Ajouté le</TableCell>
                      <TableCell align="left"  className={classes.th}>{moment(new Date(data.createdAt)).format('DD MMMM YYYY à HH:mm')}</TableCell>
                    </TableRow> 
                    { data.updatedAt &&
                    <TableRow>
                      <TableCell align="right">Modifié le</TableCell>
                      <TableCell align="left"  className={classes.th}>{moment(new Date(data.updatedAt)).format('DD MMMM YYYY à HH:mm')}</TableCell>
                    </TableRow> }
                    { data.slug &&
                    <TableRow>
                      <TableCell align="right">Slug</TableCell>
                      <TableCell align="left"  className={classes.th}>{data.slug}</TableCell>
                    </TableRow> }
 
                  </Table>

                    
                </Card>
                { data.description &&
                <Card style={{ marginTop: 20, marginBottom: 20 }}>
                  <ReactMarkdown source={data.description} escapeHtml={false}/>
                </Card> }

                <ListBy data={books} history={this.props.history}/>
              </Col>
              { data.photo && data.photo.data &&
                <Col  xs={12} sm={8} md={8} lg={4} start="xs">
                    <Card className={classes.card}>
                        <CardMedia
                          component="img"
                          alt={data.family_name}
                          className={classes.media}
                          height={300}
                          image={`${BASE_URL}/api/authors/photo/${data._id}`}
                          title="Contemplative Reptile"
                        />
                    </Card>
              </Col> }
            </Row>
          </Grid>
          <FloatingButtonActions
            name="auteur"
            title={`${data.family_name}`}
            add 
            remove
            edit
            list
            onDelete={() => this.props.remove(data._id)}
            id={data._id}
          />
      </div>
      : <CustomizedLinearProgress />
      
    );
    }
}

Author.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.authors.author.get('author'),
  loading: state.authors.data.loading,
})

export default connect(mapStateToProps, { getBooksByAuthor, getAuthor, remove })(withStyles(styles)(Author))
