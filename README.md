# User-Authentication-and-Session-Management-with-Express-MongoDB

This is an authentication app built with Express and MongoDB.

# Installation
1. Clone this repository: git clone https://github.com/ibrahimabdalrhman/User-Authentication-and-Session-Management-with-Express-MongoDB.git
2. Install dependencies: npm install
3. Set the following environment variables: MONGO_URI (MongoDB connection string), SESSION_SECRET (a secret string for session management), and EMAIL_USER (the email address to send welcome emails from)
4. Run the app: npm start
 # Usage
[The app allows users to sign up, log in, and log out. The following routes are available:]

[POST /auth/signup]
Creates a new user account. Requires a JSON body with the following fields:

- username (required): the username for the new account.
- email (required): the email address for the new account.
- password (required): the password for the new account.
- confirmPassword (required): must match the password field.


[POST /auth/login]
Logs in a user. Requires a JSON body with the following fields:

- username (required): the username for the account.
- password (required): the password for the account.

GET /auth/logout
- Logs out the current user.
Logs out the current user.

# Dependencies
This app uses the following dependencies:
- express
.
- mongoose
.
- body-parser
.
- express-session
.
- connect-mongodb-session
.
- helmet
.
- express-validator
.
- bcrypt
.
- nodemailer
.
- express-rate-limit
.

# License
This app is licensed under the ISC License. See LICENSE for more information.
