const multer = require("multer");
const EmailRegisterService = require("../services/users/EmailRegister.service");
const AccountStatusChanger = require("../services/users/accountStatusChanger.service");
const EmailLoginService = require("../services/users/EmailLogin.service");
const MyProfileService = require("../services/users/myProfile.service");
const OtherPublicUsersService = require("../services/users/otherPublicUsers.service");
const EditUserProfileService = require("../services/users/EditUserProfile.service");


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
        const { name, email, password, bio, role, status, isPrivate } = req.body;

        let image;
        if (req.file) {
            image = 'uploads/users/' + req.file.filename;
        }
        const userRegister = await EmailRegisterService(name, email, password, image, bio, role, status, isPrivate);

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


const jwt = require('jsonwebtoken'); // Importing the JWT library

async function UserEmailLoginController(req, res) {
    try {
        const { email, password } = req.body;

        const userLogin = await EmailLoginService(email, password);

        // If login is successful, set the JWT token as a cookie
        if (userLogin.status && userLogin.token) {
            // Set the JWT token as a cookie named 'jwt'
            res.cookie('jwt', userLogin.token, { httpOnly: true, maxAge: 3600000 }); // Expires in 1 hour (3600000 milliseconds)
        }

        return res.status(userLogin.status ? 200 : 404).json({
            status: userLogin.status,
            message: userLogin.message,
            token: userLogin.status ? userLogin.token : null,
            data: userLogin.status ? userLogin.data : null
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
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

async function EditUserProfileController(req, res) {
    try {
        const userID = req.userID;
        const { name, email, password, bio, image } = req.body;

        const user = await EditUserProfileService(userID, name, email, password, bio, image);

        return res.status(user.status ? 200 : 404).json({
            status: user.status,
            message: user.message,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


async function LogoutController(req, res) {
    try {
        res.clearCookie('jwt');

        res.status(200).json({
            status: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error occurred during logout:", error.message);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });

    }
}

module.exports = { upload, UserEmailRegistrationController, UserEmailLoginController, AccountStatusChangerController, MyProfileController, OtherPublicUsersController, EditUserProfileController, LogoutController };