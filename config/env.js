require('dotenv').config();

module.exports = {
  outlookUser: process.env.OUTLOOK_USER,
  outlookPass: process.env.OUTLOOK_PASS,
  port: process.env.PORT || 3000
};
