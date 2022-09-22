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
};

module.exports = {
  mailUser,
  mailPassword,
  mailTemplates,
};
