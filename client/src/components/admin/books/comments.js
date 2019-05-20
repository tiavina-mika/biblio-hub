import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import ButtonActions  from '../components/list-table-actions';
import NoData  from '../components/no-data';
import { connect } from 'react-redux';
import { uncomment } from '../../../redux/actions/books';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

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
});

const Comments = props => {
    const { classes, data, bookId } = props;
    return (
        data
            ? ([<Card className={classes.cardTitle}>
                    <Typography variant="title" className={classes.title}>
                        Liste des commentaires
                    </Typography>
                </Card>,
                <Card className={classes.cardTable}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">
                                    Commentaire
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
                                        {n.text}
                                    </TableCell>
                                    {n.postedBy &&              
                                    <TableCell align="right">
                                        <Typography>{ n.postedBy.name }</Typography>
                                    </TableCell>}
                                    <TableCell align="right"  className={classes.th}>{moment(new Date(n.createdAt)).format('DD MMM YYYY à HH:mm')}</TableCell>

                                    <TableCell align="right">                     
                                        <ButtonActions
                                            dataTitle={n.title}
                                            key={n._id}
                                            // onShow={() => push(`/dashboard/livre/${n._id}`)}
                                            onRemove={() => this.props.uncomment(n.postedBy._id, bookId, `/dashboard/books/${bookId}`)}
                                            // onEdit={() => push(`/dashboard/modifierlivre/${n._id}`)}
                                        />
                                    </TableCell>                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ])
            : <NoData
                title={`Il n'y a pas encore de commentaire pour ce livre`}
                />
        )
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { uncomment })(withStyles(styles)(Comments))
