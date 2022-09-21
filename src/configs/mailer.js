const mailUser = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;
const frontendUrl = process.env.FRONTEND_URL;

const mailTemplates = {
  createUser: {
    subject: 'Successful user creation',
    content: `
      <p><b>Hi \${this.name}</b>,</p>
      <p>You have been successfully registered for an account with the following information:</p>
      <p>Email address: <b>\${this.email}</b></p>
      <p>Password: <b>\${this.password}</b></p>
      <p>Please click this <a href='${frontendUrl}/login'>link</a> to access the system</p>
    `,
  },
  resetPassword: {
    subject: 'User successfully reset password',
    content: `
      <p><b>Hi \${this.name}</b>,</p>
      <p>You have been successfully reset password:</p>
      <p>New password: <b>\${this.password}</b></p>
      <p>Please click this <a href='${frontendUrl}/login'>link</a> to access the system</p>
    `,
  },
  rejectOffer: {
    subject: 'From Dev Plus Thank you letter',
    content: `
    <p> <b>Hello \${this.name} </b>! </p>
    <p>Thank you so much for participating in our selection of trainees. We appreciate your interest in our company and the time you invested in applying for the internship. </p>
    <p> Honestly, our team is very impressed with your skills and achievements. We hope to have the opportunity to cooperate with you in the future </b> </p>
    <p> We sincerely wish you success in your career and life path. </p>
    <p> Again, thank you for your time. </p>
    <p> If you have any questions or need more information, please contact us via email <i> hello@stunited.vn </i> or phone <i> 0368492885 </i>.
    <p> Devplus: <a href='https://devplus.edu.vn'> https://devplus.edu.vn </a> </p>
    We wish you good luck with your search and future endeavors. </p>
    `,
  },
};

module.exports = {
  mailUser,
  mailPassword,
  mailTemplates,
};
