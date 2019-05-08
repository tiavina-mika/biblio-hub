import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import ButtonActions  from '../components/list-table-actions';

import { connect } from 'react-redux';
import { remove } from '../../../redux/actions/books';
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

const ListBy = props => {
    const { classes, data, history: { push } } = props;
    console.log(data);
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
                                <TableCell align="center">
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
                                    <Typography>{ n.author.family_name }</Typography>
                                    </TableCell>}
                                    <TableCell align="right">
                                    {new Date(n.date_publication).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">                     
                                        <ButtonActions
                                            dataTitle={n.title}
                                            key={n._id}
                                            onShow={() => push(`/dashboard/livre/${n._id}`)}
                                            onRemove={() => this.props.remove(n._id)}
                                            onEdit={() => push(`/dashboard/modifierlivre/${n._id}`)}
                                        />
                                    </TableCell>                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ])
            : <Paper elevation={1}>Il n'y a pas encore de livre</Paper>
        )
}

ListBy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { remove })(withStyles(styles)(ListBy))
