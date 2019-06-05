import transporter from './config'
import { CLIENT_ORIGIN } from '../config/config'

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
const forgottenPassword = async (to, id) => {
  const mailOptions = {
    from: process.env.USER_MAILER,
    to,
    subject: 'Mot de passe oublié',
    html: `
      <a href='${CLIENT_ORIGIN}/nouveau/mot-de-passe/${id}'>
        cliquez ici pour ajouter un nouveau mot de passe
      </a>
    `,
  }
  
  await transporter.sendMail(mailOptions)
  
}

export default forgottenPassword