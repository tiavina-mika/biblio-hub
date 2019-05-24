import transporter from './config'
import { CLIENT_ORIGIN } from '../config/config'

import moment from 'moment'

const send = async (user, subject) => {
  const { email, name, createdAt, _id } = user
  const mailOptions = {
    from: email,
    to: process.env.USER_MAILER,
    subject,
    html: `
        <p>Nom: <strong>${name}</strong></p>
        <p>Email: <strong>${email}</strong></p>
        <p>${moment(new Date(user.createdAt)).fromNow()}</p>
        <br />
        <p>
          <a href='${CLIENT_ORIGIN}/dashboard/utitlisateur/${_id}'>
            Voir
          </a>
        <p>
    `,
  }  
  await transporter.sendMail(mailOptions) 
}

export default send