import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Spinner from '../blocks/spinner';
import { BASE_URL } from '../../redux/actions/constants';

const messages = {
	'USER_CONFIRMED':  'Votre compte est desormais actif. Profitez de tous les livres sur notre site.' ,
	'COULD_NOT_FIND':  "Utilisateur introuvable." ,	
};
class Confirm extends Component {
  state = {
    confirming: true
  }
  componentDidMount = async () => {
    const { id } = this.props.match.params

    const response = await axios.get(`${BASE_URL}/api/confirm/${id}`);
    notify.show(messages[Object.keys(response.data)], 'success', 6000);
    response && this.setState({ confirming: false });
  }
  render = () => {
      return (
          this.state.confirming
            ? <Spinner />
            : <Redirect to='/signin' />
      )
  }
}

export default Confirm;