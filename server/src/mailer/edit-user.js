import transporter from './config'
import { CLIENT_ORIGIN } from '../config/config'

import moment from 'moment'

const send = async (user) => {
  const mailOptions = {
    from: user.email,
    to: process.env.USER_MAILER,
    subject: `${user.name} a modifier son compte`,
    html: `
          <p>Nom: <strong>${user.name}</strong></p>
          <p>Email: <strong>${user.email}</strong></p>
          <p>${moment(new Date()).fromNow()}</p>
          <br />
          <p>
            <a href='${CLIENT_ORIGIN}/dashboard/utitlisateur/${user._id}'>
              Voir
            </a>
          <p>
    `,
  }  
  await transporter.sendMail(mailOptions) 
}

export default send