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
import { BASE_URL } from '../../../redux/actions/constants';
import Typography from '@material-ui/core/Typography';
import CustomizedLinearProgress  from '../components/progress';
import FormDialog from './add-profile-dialog';

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
  },
  leftCell: {
    width: 250,
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: 14,
    color: '#969696',
    paddingLeft: 55
  },
  tableRow: {
    height: 60
  }
});

class Show extends React.Component {
  // state = {data: ''}
  // componentDidMount() {
  //     this.props.getOne(this.props.match.params.id).then(d => this.setState({data: d}))
  // }
  render() {
    const { classes, loading, history: { push }, id, currentUser } = this.props;
    // const { data } = this.state;
    if(loading) {
      return <CustomizedLinearProgress />
    }

    return (
      currentUser && currentUser._id === id && !loading ?
      <div className={classes.root}>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={8} start="xs">
              <CustomizedBreadcrumbs
                text1="Utilisateurs"
                link1="/dashboard/utilisateurs"
                actualText="profil"
              />
              <Card className={classes.cardTitle}>
                <Typography variant="title" className={classes.title}>
                  Information Personnelle
                </Typography>
              </Card>
              <Card className={classes.card}>
                <Table className={classes.table}>
                    <TableRow className={classes.tableRow}>
                      <TableCell align="left" className={classes.leftCell}>Nom</TableCell>
                      <TableCell align="left" className={classes.th}>{currentUser.name}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell align="left" className={classes.leftCell}>Email</TableCell>
                      <TableCell align="left" className={classes.th}>{currentUser.email}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell align="left" className={classes.leftCell}>Ajouté le</TableCell>
                      <TableCell align="left"  className={classes.th}>{new Date(currentUser.createdAt).toLocaleString()}</TableCell>
                    </TableRow> 
                    { currentUser.updatedAt &&
                    <TableRow className={classes.tableRow}>
                      <TableCell align="left" className={classes.leftCell}>Modifié le</TableCell>
                      <TableCell align="left"  className={classes.th}>{new Date(currentUser.updatedAt).toLocaleString()}</TableCell>
                    </TableRow> }
                    { currentUser.slug &&
                    <TableRow className={classes.tableRow}>
                        <TableCell align="left" className={classes.leftCell}>Slug</TableCell>
                        <TableCell align="left"  className={classes.th}>{currentUser.slug}</TableCell>
                    </TableRow> }
                  <TableRow className={classes.tableRow}>
                      <TableCell align="left" className={classes.leftCell}>Photo</TableCell>
                      <TableCell align="left"  className={classes.th}>
                        <FormDialog
                            label={currentUser.profile ? "Modifier la photo de profil" : "Ajouter photo de profil"}
                            title="Photo"
                            userId={currentUser._id}
                        />
                      </TableCell>
                    </TableRow>
                </Table>
                </Card>
              </Col>

              { currentUser.profile &&
                <Col  xs={12} sm={8} md={8} lg={4} start="xs">
                  { currentUser.profile.photo ?
                      <Card className={classes.cardRightSidebar}>
                          <CardMedia
                            component="img"
                            alt={currentUser.title}
                            className={classes.media}
                            height={300}
                            image={`${BASE_URL}/api/users/${currentUser._id}/photo`}
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
            onDelete={() => this.props.remove(currentUser._id)}
            id={currentUser._id}
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
  currentUser: state.users.user.get('user'),
  loading: state.users.data.loading,
});

export default connect(mapStateToProps, { remove })(withStyles(styles)(Show))
