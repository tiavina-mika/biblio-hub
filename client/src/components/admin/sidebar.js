import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';
import CollapsedList from './components/collapsed-list';
import CustomizedListItem from './components/customized-list-item';

import NotebookMultiple from 'mdi-material-ui/NotebookMultiple';
import DatabasePlus from 'mdi-material-ui/DatabasePlus';
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted';
import AccountTie from 'mdi-material-ui/AccountTie';
import TagOutline from 'mdi-material-ui/TagOutline';
import AccountMultiple from 'mdi-material-ui/AccountMultiple';
import Home from 'mdi-material-ui/Home';

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    listSubheader: {
        color: 'rgba(255, 255, 255, .5)'
    }
});

class Sidebar extends React.Component {
    render() {
    const { classes, history } = this.props;

    return (
        <div>
            <div className={classes.toolbar} />
            <List>
                <CustomizedListItem
                    icon={<SendIcon />}
                    text="Dashboard"
                    link="/dashboard"
                    history={history}
                />
                 <CollapsedList
                    text="Auteur"
                    icon={<AccountTie />}
                    collapse={[
                        <CustomizedListItem
                            icon={<FormatListBulleted />}
                            text="Liste"
                            link="/dashboard/auteurs"
                            nested
                            history={history}/>,
                        <CustomizedListItem
                            icon={<DatabasePlus />}
                            text="Ajouter"
                            nested
                            link="/dashboard/ajouter/auteur"
                            history={history}/>,

                    ]}
                />
                  <CollapsedList
                    text="Genre"
                    icon={<TagOutline />}
                    collapse={[
                        <CustomizedListItem
                            icon={<FormatListBulleted />}
                            text="Liste"
                            link="/dashboard/genres"
                            nested
                            history={history}/>,
                        <CustomizedListItem
                            icon={<DatabasePlus />}
                            text="Ajouter"
                            nested
                            link="/dashboard/ajouter/genre"
                            history={history}/>,

                    ]}
                />
                <CollapsedList
                    text="Livre"
                    icon={<NotebookMultiple />}
                    collapse={[
                        <CustomizedListItem
                            icon={<FormatListBulleted />}
                            text="Liste"
                            link="/dashboard/livres"
                            nested
                            history={history}/>,
                        <CustomizedListItem
                            icon={<DatabasePlus />}
                            text="Ajouter"
                            nested
                            link="/dashboard/ajouter/livre"
                            history={history}/>,

                    ]}
                />
                <CollapsedList
                    text="Utilisateur"
                    icon={<AccountMultiple />}
                    collapse={[
                        <CustomizedListItem
                            icon={<FormatListBulleted />}
                            text="Liste"
                            link="/dashboard/utilisateurs"
                            nested
                            history={history}/>,
                        <CustomizedListItem
                            icon={<DatabasePlus />}
                            text="Ajouter"
                            nested
                            link="/dashboard/ajouter/utilisateur"
                            history={history}/>,
                    ]}
                />
                <ListSubheader inset className={classes.listSubheader}>Vue utilisateur</ListSubheader>
                <CustomizedListItem
                    icon={<Home />}
                    text="Accueil"
                    link="/"
                    history={history}
                />   
                 <CustomizedListItem
                    icon={<AccountTie />}
                    text="Auteurs"
                    link="/auteurs"
                    history={history}
                />   
                 <CustomizedListItem
                    icon={<NotebookMultiple />}
                    text="Livres"
                    link="/livres"
                    history={history}
                />   
                  <CustomizedListItem
                    icon={<TagOutline />}
                    text="Genres"
                    link="/genres"
                    history={history}
                />   
            </List>
        </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);