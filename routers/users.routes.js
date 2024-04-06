const express = require('express');
const { UserEmailRegistrationController, upload, AccountStatusChangerController, UserEmailLoginController, MyProfileController, OtherPublicUsersController } = require('../controllers/users.controller');
const { authentication } = require('../middleware/authentication.middleware');

const userRouter = express.Router();

userRouter.post('/email-register', upload.single('image'), UserEmailRegistrationController);
userRouter.post('/email-login', UserEmailLoginController);
userRouter.post('/status-changer', authentication, AccountStatusChangerController);
userRouter.get('/my-profile', authentication, MyProfileController);
userRouter.get('/public-users', authentication, OtherPublicUsersController);

module.exports = userRouter;