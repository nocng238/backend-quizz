const port = process.env.PORT || 9000;
const secretKey = process.env.SECRET_KEY || 'secretKey';
const baseUrl = process.env.BASE_URL;
const frontendUrl = process.env.FRONTEND_URL;
const expiredAfter = 60 * 60 * 1000;

module.exports = {
  port,
  secretKey,
  baseUrl,
  expiredAfter,
  frontendUrl,
};
