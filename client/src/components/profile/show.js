import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { remove } from '../../redux/actions/users';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableRow from '@material-ui/core/TableRow';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BASE_URL } from '../../redux/actions/constants';
import CardHeader from '@material-ui/core/CardHeader';
import FormDialog from './dialog';
import { getUserId } from '../../redux/root-reducer';
import Helmet from '../helmet';

const styles = theme => ({
  grid: {
    [theme.breakpoints.down('md')]: {
      marginTop: 100,
    },
  },
  table: {
    [theme.breakpoints.up('md')]: {
      minWidth: 700,
    },
  },
  th: {
    fontWeight: 700
  },
  card: {
    marginTop: -75
  },
  title: {
    fontSize: 20,
    fontWeight: 700
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
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: '50%'
  },
  title: {
    fontWeight: 700
  },
  cardHeader: {
    borderBottom: '1px solid #bcbaba',
    paddingTop: theme.spacing.unit * 3
  }
});

class Show extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, loading, history, userId, currentUser } = this.props;
    const { anchorEl } = this.state;

    return (
      currentUser && currentUser._id === userId && !loading ?
        <Grid fluid style={{marginTop: 100, marginBottom: 100}}>
          <Helmet title="Profil" />
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={4} start="xs">
                { currentUser.photo &&
                    <img src={`${BASE_URL}/api/users/photo/${currentUser._id}`} className={classes.img}  alt={process.env.REACT_APP_NAME}/>
                }
              <Card className={currentUser.photo && classes.card}>
                  <CardHeader
                      classes={{title: classes.title}}
                      className={classes.cardHeader}
                      action={
                          <div>
                              <IconButton
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                              >
                                  <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                              >
                                <MenuItem onClick={() => history.push('/changer/mot-de-passe')}>Changer mon mot de passe</MenuItem>
                                <MenuItem onClick={() => history.push('/modifier/compte')}>Modifier mon compte</MenuItem>
                              </Menu>
                        </div>
                      }
                      title={!currentUser.photo && "Information personnelle"}
                  />
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
                        <TableCell align="left" className={classes.leftCell}>Crée</TableCell>
                        <TableCell align="left"  className={classes.th}>{moment(new Date(currentUser.createdAt)).fromNow()}</TableCell>
                      </TableRow> 
                      <TableRow className={classes.tableRow}>
                        <TableCell align="left" className={classes.leftCell}>Photo</TableCell>
                        <TableCell align="left"  className={classes.th}>
                          <FormDialog
                            userId={currentUser._id}
                            history={history}
                            title={currentUser.photo ? 'Modifier votre photo': 'Ajouter une photo'}
                            />
                        </TableCell>
                      </TableRow>
                  </Table>
                  </Card>
                </Col>
              </Row>
          </Grid>
      : null
      
    );
    }
}

Show.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.users.user.get('user'),
  loading: state.users.data.loading,
  userId: getUserId(state),
});

export default connect(mapStateToProps, { remove })(withStyles(styles)(Show))
