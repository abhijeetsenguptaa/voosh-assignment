const express = require('express');
const { UserEmailRegistrationController, upload, AccountStatusChangerController, UserEmailLoginController, MyProfileController, OtherPublicUsersController, EditUserProfileController } = require('../controllers/users.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { ViewProfileSuperAdminController } = require('../controllers/superAdmin.controller');
const { authorization } = require('../middleware/authorization.middleware');

const userRouter = express.Router();

userRouter.post('/email-register', upload.single('image'), UserEmailRegistrationController);
userRouter.post('/email-login', UserEmailLoginController);
userRouter.post('/status-changer', authentication, AccountStatusChangerController);
userRouter.post('/edit-my-profile', authentication, EditUserProfileController);
userRouter.get('/my-profile', authentication, MyProfileController);
userRouter.get('/public-users', authentication, OtherPublicUsersController);
userRouter.get('/all-profile', authentication, authorization(['super-admin']), ViewProfileSuperAdminController);

module.exports = userRouter;