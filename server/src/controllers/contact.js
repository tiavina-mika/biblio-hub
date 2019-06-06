import { validateContact } from '../utils/validation'
import transporter from '../mailer/config'
import User from "../models/user"

const create = async (req, res) => {
  try {
      const { isValid, errors } = validateContact(req.body)
      if(!isValid) {
          return res.status(400).json(errors)
      }
      const { email, name, message } = req.body

      const mailOptions = {
            from: email,
            to: process.env.EMAIL_RECEIVING,
            subject: 'BIBLIO-NEW-MESSAGE',
            html: `<p>${name}</p>
                    <p>${email}</p>
                    <p>${message}</p>`
          }

          transporter.sendMail(mailOptions, (error, response) => {
            if(error) {
              res.json({MAIL_SEND_ERROR: "Email send failed"})
            }else {
              res.json({MAIL_SEND_SUCCESS: "Email send successfully"})
            }
            transporter.close();
          })
  } catch (error) {
      res.status(400).json(error)
  }
}

export default {
    create,
}
