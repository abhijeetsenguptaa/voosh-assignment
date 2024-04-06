const bcrypt = require('bcrypt');
const JsonTokenGenerator = require("./JsonTokenGenerator.service");
const User_Model = require("../../models/users.model");

async function EmailLoginService(email, password) {
    try {
        // Input validation
        if (!email || !password) {
            return {
                status: false,
                message: "Email and password are required."
            };
        }

        // Find user by email
        const existingUser = await User_Model.findOne({ email });

        if (!existingUser) {
            return {
                status: false,
                message: "User does not exist!"
            };
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (passwordMatch) {
            // Generate JWT token
            const token = JsonTokenGenerator(existingUser._id);

            return {
                status: true,
                message: "Login successful",
                token,
                data: { userId: existingUser._id, email: existingUser.email }
            };
        } else {
            return {
                status: false,
                message: "Wrong Credentials",
            };
        }
    } catch (error) {
        console.error("Error in user logging in:", error.message);
        return {
            status: false,
            message: "An error occurred during user logging in. Please try again later."
        };
    }
}

module.exports = EmailLoginService;
