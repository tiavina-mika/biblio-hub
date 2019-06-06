import React, { Component } from 'react';
import axios from 'axios';
import Card from './dashboard-card';
import { Row, Col } from 'react-flexbox-grid';

import CustomizedLinearProgress  from '../components/progress';
import { BASE_URL } from '../../../redux/actions/constants';
import Helmet from '../../helmet';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Loyalty from '@material-ui/icons/Loyalty';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import People from '@material-ui/icons/People';
import VerifiedUser from '@material-ui/icons/VerifiedUser';

class Dashboard extends Component {
  state = {books: '', authors: '', genres: '', users: '', forMembers: '', nonConfirmed: '', loading: true};
  async componentDidMount() {
    const response = await axios.get(`${BASE_URL}/api/count`);
    const { books, authors, genres, users, forMembers, nonConfirmed } = response.data;
    response && this.setState({books, authors, genres, users, forMembers, nonConfirmed,loading: false});
  }
   render() {
    const { books, authors, genres, users, forMembers, nonConfirmed, loading } = this.state;

    if(loading) {
      return <CustomizedLinearProgress />
    }
    return (
      !loading ?
			<div key="container" style={{ width: '100%' }}>
			<Helmet title="Dashboard" />
				<Row>
					<Col xs={4}>
						<Card
							color="red"
							title="Liste des auteurs"
							count={authors}
              href={`/dashboard/auteurs`}
              addHref={`/dashboard/ajouter/auteur`}
							icon={<PersonOutline style={{fontSize: 82, color: 'rgba(0, 0, 0, .2)'}}/>} />
					</Col>
					<Col xs={4}>
						<Card
							color="green"
							title="Liste des livres"
							count={books}
              addHref={`/dashboard/ajouter/livre`}
							href={`/dashboard/livres`}
							icon={<LibraryBooks style={{fontSize: 82, color: 'rgba(0, 0, 0, .2)'}}/>} />
					</Col>
					<Col xs={4}>
						 <Card
							color="yellow"
							title="Liste des genres"
							count={genres}
              addHref={`/dashboard/ajouter/genre`}
							href={`/dashboard/genres`}
							icon={<Loyalty style={{fontSize: 82, color: 'rgba(0, 0, 0, .2)'}}/>} />
					</Col>
				</Row>
				<Row style={{ marginTop: 16 }}>
        <Col xs={4}>
						<Card
							color="aqua"
							title="Liste des utilisateurs"
							count={users}
              addHref={`/dashboard/ajouter/utilisateur`}
							href={`/dashboard/utilisisateurs`}
							icon={<People style={{fontSize: 82, color: 'rgba(0, 0, 0, .2)'}}/>} />
					</Col>
          <Col xs={4}>
						<Card
							color="red"
							title="Livres pour les membres"
							count={forMembers}
              addHref={`/dashboard/ajouter/livre`}
							href={`/dashboard/livres`}
							icon={<VerifiedUser style={{fontSize: 82, color: 'rgba(0, 0, 0, .2)'}}/>} />
					</Col>
          <Col xs={4}>
						<Card
							color="green"
							title="Membres non confirmé"
							count={nonConfirmed}
              addHref={`/dashboard/ajouter/utilisateur`}
							href={`/dashboard/utilisateurs`}
							icon={<VerifiedUser style={{fontSize: 82, color: 'rgba(0, 0, 0, .2)'}}/>} />
					</Col>
				</Row>
      </div>
      : <CustomizedLinearProgress />
    );
  }
}

export default Dashboard;