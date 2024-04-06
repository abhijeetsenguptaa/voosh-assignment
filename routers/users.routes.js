const express = require('express');
const { UserEmailRegistrationController, upload, AccountStatusChangerController, UserEmailLoginController } = require('../controllers/users.controller');
const { authentication } = require('../middleware/authentication.middleware');

const userRouter = express.Router();

userRouter.post('/email-register', upload.single('image'), UserEmailRegistrationController);
userRouter.post('/email-login', UserEmailLoginController);
userRouter.post('/status-changer', authentication, AccountStatusChangerController);

module.exports = userRouter;