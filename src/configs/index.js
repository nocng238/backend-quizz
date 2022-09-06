const port = process.env.PORT || 9000;
const secretKey = process.env.SECRET_KEY || 'secretKey';
const expiredAfter = 60 * 60 * 1000;

module.exports = {
  port,
  secretKey,
  expiredAfter,
};
