import transporter from './config'
import { CLIENT_ORIGIN } from '../config/config'

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
const send = async (comment, book) => {
  const { postedBy: { name, email }, text} = comment
  const { slug, title } = book
  const mailOptions = {
    from: email,
    to: process.env.USER_MAILER,
    subject: 'Nouveau commentaire',
    html: `
      <p>
        <strong>${name} a ajouté un nouveau commentaire sur ${title} </strong>
      </p>
      <p>
          ${text}
      </p>
      <p>
        <a href='${CLIENT_ORIGIN}/livres/${slug}'>
          Voir
        </a>
      <p>
    `,
  }  
  await transporter.sendMail(mailOptions) 
}

export default send