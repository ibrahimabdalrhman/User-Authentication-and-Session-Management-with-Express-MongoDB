const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, body } = require('express-validator');
const rateLimit = require("express-rate-limit");



// Limit the number of failed login attempts to 5 per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many login attempts, please try again later.",
});

// Route for user signup with validation using express-validator
router.post("/signup",
    [
        check("username")
            .notEmpty()
            .withMessage("Username is required"),

        check("email")
            .isEmail()
            .trim()
            .withMessage("Invalid email"),

        body("password")
            .isLength({ min: 4 })
            .trim()
            .withMessage("Password must be at least 4 characters long"),

        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                console.log("value : ", value);
                console.log("req.body.password : ", req.body.password);
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    ],
    authController.signup
);


router.post("/login", limiter,
    [
        body("username").trim()
    ],
    authController.login);

router.get("/logout", authController.logout);


module.exports = router;