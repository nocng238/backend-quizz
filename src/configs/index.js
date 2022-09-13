const port = process.env.PORT || 9000;
const secretKey = process.env.SECRET_KEY || 'secretKey';
const baseUrl = process.env.BASE_URL;
const frontendUrl = process.env.FRONTEND_URL;
const mailUser = process.env.MAIL_USERNAME;
const passMail = process.env.MAIL_PASSWORD;
const expiredAfter = 60 * 60 * 1000;

module.exports = {
  port,
  secretKey,
  baseUrl,
  mailUser,
  passMail,
  expiredAfter,
  frontendUrl,
};
