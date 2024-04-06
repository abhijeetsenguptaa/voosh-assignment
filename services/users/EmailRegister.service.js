const User_Model = require("../../models/users.model");
const bcrypt = require('bcrypt');

async function EmailRegisterService(name, email, password, image, role, status, isPrivate) {
    try {
        // Input validation
        if (!name || !email || !password) {
            return {
                status: false,
                message: "Name, email, and password are required."
            };
        }

        // Check if user with the provided email already exists
        const existingUser = await User_Model.findOne({ email });

        if (existingUser) {
            return {
                status: false,
                message: "User is already registered!"
            };
        }

        if (role == "super-admin") {
            isPrivate = true;
        }
        
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User_Model({ name, email, password: hashPassword, image, role, status, isPrivate });

        // Save the new user
        await newUser.save();

        // Return success response with limited data
        return {
            status: true,
            message: "User registration successful!"
        };
    } catch (error) {
        console.error("Error in user registration:", error.message);
        return {
            status: false,
            message: "An error occurred during user registration. Please try again later."
        };
    }
}

module.exports = EmailRegisterService;
