const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorization } = require('../middleware/authorization.middleware');
const { PostProductController, upload } = require('../controllers/products.controller');

const productRouter = express.Router();

productRouter.post('/post', authentication, authorization(['super-admin']), upload.single('image'), PostProductController);

module.exports = productRouter;