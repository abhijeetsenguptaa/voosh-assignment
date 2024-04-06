const express = require('express');
const { UserEmailRegistrationController, upload } = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/email-register', upload.single('image'), UserEmailRegistrationController);
// userRouter.post('/email-login', UserLoginWithEmailController);

module.exports = userRouter;