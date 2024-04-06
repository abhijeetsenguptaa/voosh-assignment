const multer = require("multer");
const EmailRegisterService = require("../services/users/EmailRegister.service");


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/users');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function UserEmailRegistrationController(req, res) {
    try {
        const { name, email, password, role, status, isPrivate } = req.body;

        let image;
        if (req.file) {
            image = 'uploads/users/' + req.file.filename;
        }
        const userRegister = await EmailRegisterService(name, email, password, image, role, status, isPrivate);

        return res.status(userRegister.status ? 200 : 404).json({
            status: userRegister.status,
            message: userRegister.message
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { upload, UserEmailRegistrationController };