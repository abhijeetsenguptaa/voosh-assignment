const multer = require('multer');
const PostProductService = require('../services/products/PostProducts.service');


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function PostProductController(req, res) {
    try {
        const { title } = req.body;

        let image;
        if (req.file) {
            image = 'uploads/products/' + req.file.filename;
        }

        const userCreation = await PostProductService(title, image);

        return res.status(userCreation.status ? 200 : 500).json({
            status: userCreation.status,
            message: userCreation.message
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { upload, PostProductController };