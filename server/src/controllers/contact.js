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

// const confirm = async (req, res) => {
//   try {
//       const { id } = req.params
//       const user = await User.findById(id)

//       if (!user) {
//         res.status(400).json({COULD_NOT_FIND: 'Could not find you'})
//       }
//       else if (user && !user.confirmed) {
//         const updatedUser = await User.findOneAndUpdate({_id: id}, { confirmed: true },{new: true, useFindAndModify: false})
//         updatedUser && res.json({ USER_CONFIRMED: "Your account is now confirmed" })
//       }
//       else  {
//         res.json({ ACCOUNT_CONFIRMED: "Your count is already confirmed" })
//       }
//   } catch (error) {
//       res.status(400).json(error)
//   }
// }


export default {
    create,
    // confirm
}
