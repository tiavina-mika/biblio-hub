import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import ButtonActions  from '../components/list-table-actions';
import NoData  from '../components/no-data';
import { connect } from 'react-redux';
import { remove } from '../../../redux/actions/books';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { getBooksLoading } from '../../../redux/root-reducer';
import CustomizedLinearProgress  from '../components/progress';

const styles = theme => ({
  cardTable: {
    marginTop: 5,
    marginBottom: 55,

  },
  cardTitle: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        marginBottom: 5,
        [theme.breakpoints.down('md')]: {
            marginBottom: 25
        }
    },
  title: {
    fontSize: 20,
    fontWeight: 700
  },
  link: {
      textDecoration: 'none'
  }
});

const ListBy = props => {
    const { classes, data, history: { push }, by, loading } = props;
    if(loading) {
        return <CustomizedLinearProgress />
      }
    if(!data && !loading) {
        return <NoData
                title={`Il n'y a pas encore de livre pour ce ${by}`}
                link='/dashboard/ajouter/livre'/>
    }
    return (
        data
            ? ([<Card className={classes.cardTitle}>
                    <Typography variant="title" className={classes.title}>
                        Liste des livres
                    </Typography>
                </Card>,
                <Card className={classes.cardTable}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">
                                    Titre
                                </TableCell>
                                <TableCell align="right">
                                    Auteur
                                </TableCell>
                                <TableCell align="right">
                                    Ajouter le
                                </TableCell>                       
                                <TableCell align="right">
                                    Actions
                                </TableCell>                       
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { data.map(n => (
                                <TableRow>
                                    <TableCell align="right">
                                        {n.title}
                                    </TableCell>
                                    {n.author &&              
                                    <TableCell align="right">
                                        <Typography><Link to={`/dashboard/auteur/${n.author._id}`} className={classes.link}>{ n.author.family_name }</Link></Typography>
                                    </TableCell>}
                                    <TableCell align="right"  className={classes.th}>{moment(new Date(n.createdAt)).format('DD MMM YYYY à HH:mm')}</TableCell>

                                    <TableCell align="right">                     
                                        <ButtonActions
                                            dataTitle={n.title}
                                            key={n._id}
                                            onShow={() => push(`/dashboard/livre/${n._id}`)}
                                            onRemove={() => this.props.remove(n._id)}
                                            onEdit={() => push(`/dashboard/modifier/livre/${n._id}`)}
                                        />
                                    </TableCell>                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ])
            : <CustomizedLinearProgress />
        )
}
const mapStateToProps = (state) => ({
    loading: getBooksLoading(state),
});

ListBy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { remove })(withStyles(styles)(ListBy))
