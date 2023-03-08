const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const transporter = require('../util/transporterEmail').transporter;


exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      err: errors.errors[0].msg,
    });
  }
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/; // Password complexity requirements
  if (!passwordRegex.test(password)) {
    return res.json({
      msg: "Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }
  req.body.password = await bcrypt.hash(req.body.password, 12);
  // Check if user already exists
  const ifUserExists = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (ifUserExists) {
    return res.json({
      msg: "Change the password and user name",
    });
    }
    
  // Create new user in database and save session data
  const user = await User.create(req.body);
  req.session.user = user;
    req.session.isloggedin = true;
    
  // Send welcome email to new user
  let mailOptions = {
    from: "",
    to: email,
    subject: `Hello ${username},\n\nThank you for signing up to our website.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.json({
    page: "signup",
    user,
  });
};

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username }).select('+password');
    if (!user || !user.password) {
        return res.json({
            page: "login",
            msg: "Username or password is incorrect",
        });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        req.session.user = user;
        req.session.isloggedin = true;
        return res.json({
            page: "login",
            user,
        });
    }
    res.json({
        page: "login",
        msg: "Username or password is incorrect",
    });
};


exports.logout = async (req, res, next) => {
    req.session.destroy(err => console.log(err));
    res.json({
        msg: 'user is logged out'
    })
}

