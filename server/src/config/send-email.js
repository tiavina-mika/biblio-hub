import transporter from './nodemailer'

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
const send = async (to, content) => {
  const contacts = {
    from: process.env.USER_MAILER,
    to
  }
  const email = Object.assign({}, content, contacts)
  await transporter.sendMail(email)
}

export default send