const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
  service: "",
  auth: {
    user: "",
    pass: "",
  },
});
