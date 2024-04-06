const multer = require("multer");
const EmailRegisterService = require("../services/users/EmailRegister.service");
const AccountStatusChanger = require("../services/users/accountStatusChanger.service");
const EmailLoginService = require("../services/users/EmailLogin.service");
const MyProfileService = require("../services/users/myProfile.service");
const OtherPublicUsersService = require("../services/users/otherPublicUsers.service");


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


async function UserEmailLoginController(req, res) {
    try {
        const { email, password } = req.body;

        const userLogin = await EmailLoginService(email, password);

        return res.status(userLogin.status ? 200 : 404).json({
            status: userLogin.status,
            message: userLogin.message,
            token: userLogin.status ? userLogin.token : null,
            data: userLogin.status ? userLogin.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

async function AccountStatusChangerController(req, res) {
    try {
        const id = req.userID;

        const userStatus = await AccountStatusChanger(id);

        return res.status(userStatus.status ? 200 : 404).json({
            status: userStatus.status,
            message: userStatus.message
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


async function MyProfileController(req, res) {
    try {
        const userID = req.userID;

        const user = await MyProfileService(userID);

        return res.status(user.status ? 200 : 404).json({
            status: user.status,
            message: user.message,
            data: user.data
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


async function OtherPublicUsersController(req, res) {
    try {
        const userID = req.userID;

        const user = await OtherPublicUsersService(userID);

        return res.status(user.status ? 200 : 404).json({
            status: user.status,
            message: user.message,
            count: user.count,
            data: user.data,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { upload, UserEmailRegistrationController, UserEmailLoginController, AccountStatusChangerController, MyProfileController, OtherPublicUsersController };