import transporter from './config'
import { CLIENT_ORIGIN } from '../config/config'

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
const send = async (to, id) => {
  const mailOptions = {
    from: process.env.USER_MAILER,
    to,
    subject: 'Confirmation de votre inscription',
    html: `
      <a href='${CLIENT_ORIGIN}/confirmer/${id}'>
        cliquez ici pour confirmer
      </a>
    `,
  }
//   await transporter.sendMail(mailOptions, (error, response) => {
//     if(error) {
//         res.json({MAIL_SEND_ERROR: "Email confirmation send failed"})
//     } else {
//         res.json({MAIL_SEND_SUCCESS: `Email confirmation send successfully from ${process.env.USER_MAILER} to ${result.email} `})
//     }
//     transporter.close();
//   })
  
  await transporter.sendMail(mailOptions)
  
}

export default send