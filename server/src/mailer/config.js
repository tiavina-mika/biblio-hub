import nodemailer from 'nodemailer'

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USER_MAILER,
    pass: "DemoForDev"
  }
}
let transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
})

export default transporter