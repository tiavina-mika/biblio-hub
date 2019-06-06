import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import { connect } from 'react-redux';
import { getOne, remove } from '../../../redux/actions/users';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CustomizedBreadcrumbs from '../components/breadcrumbs';
import FloatingButtonActions from '../components/floating-button-actions';
import { BASE_URL } from '../../../redux/actions/constants'
import Typography from '@material-ui/core/Typography';
import CustomizedLinearProgress  from '../components/progress';

const styles = theme => ({
  table: {
    [theme.breakpoints.up('md')]: {
      minWidth: 700,
    }
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
  },
  cardRightSidebar: {
    marginBottom: 15
  },
  button: {
    padding: 10
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  titleRightSidebar: {
    fontWeight: 600,
    fontSize: 25
  }
});

class Show extends React.Component {
  state = {data: ''}
  componentDidMount() {
      this.props.getOne(this.props.match.params.id).then(d => this.setState({data: d}))
  }
  render() {
    const { classes, loading, history: { push } } = this.props;
    const { data } = this.state;
    if(loading) {
      return <CustomizedLinearProgress />
    }

    return (
      data && !loading ?
      <div className={classes.root}>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={8} start="xs">
              <CustomizedBreadcrumbs
                text1="Utilisateurs"
                link1="/dashboard/utilisateurs"
                actualText={data.title}
              />
              <Card className={classes.cardTitle}>
                <Typography variant="title" className={classes.title}>
                  {data.name}
                </Typography>
              </Card>
              <Card className={classes.card}>
                <Table className={classes.table}>
                    <TableRow>
                      <TableCell align="right">Nom</TableCell>
                      <TableCell align="left" className={classes.th}>{data.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="left" className={classes.th}>{data.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Ajouté le</TableCell>
                      <TableCell align="left"  className={classes.th}>{new Date(data.createdAt).toLocaleString()}</TableCell>
                    </TableRow> 
                    { data.updatedAt &&
                    <TableRow>
                      <TableCell align="right">Modifié le</TableCell>
                      <TableCell align="left"  className={classes.th}>{new Date(data.updatedAt).toLocaleString()}</TableCell>
                    </TableRow> }
                    { data.slug &&
                    <TableRow>
                      <TableCell align="right">Slug</TableCell>
                      <TableCell align="left"  className={classes.th}>{data.slug}</TableCell>
                    </TableRow> }
                  </Table>
                </Card>
              </Col>

              { data.photo &&
                <Col  xs={12} sm={8} md={8} lg={4} start="xs">
                  { data && data.photo ?
                      <Card className={classes.cardRightSidebar}>
                          <CardMedia
                            component="img"
                            alt={data.title}
                            className={classes.media}
                            height={300}
                            image={`${BASE_URL}/api/users/photo/${data._id}`}
                          />
                      </Card> : null
                  }
              </Col>
              }
            </Row>
          </Grid>
          <FloatingButtonActions
            name="utilisateur"
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

Show.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.users.user.get('user'),
  loading: state.users.data.loading,
})

export default connect(mapStateToProps, { getOne, remove,})(withStyles(styles)(Show))
