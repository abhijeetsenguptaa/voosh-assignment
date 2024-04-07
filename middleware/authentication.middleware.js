require('dotenv').config();
const jwt = require('jsonwebtoken');
const User_Model = require('../models/users.model');

async function authentication(req, res, next) {
    try {
        // Retrieve the token from the cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Please LOG IN."
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
            if (decode) {
                req.userID = decode.userID;
                const user = await User_Model.findOne({ _id: req.userID });
                role = user.role;
                if (!user) {
                    return res.status(404).json({
                        status: 404,
                        message: "User not found"
                    });
                }

                req.user = user;
                next();

            } else {
                return res.status(401).json({
                    status: 401,
                    message: "Invalid Token"
                });
            }


        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

module.exports = { authentication };
