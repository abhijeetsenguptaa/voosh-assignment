const User_Model = require("../../models/users.model");

async function MyProfileService(id) {
    try {
        // Find user by ID
        const userDetails = await User_Model.findById(id);

        if (!userDetails) {
            return {
                status: false,
                message: "User not found!"
            };
        }

        return {
            status: true,
            message: "Your profile Details!",
            data: userDetails
        };
    } catch (error) {
        console.error("Error in fetching user profile:", error.message);
        return {
            status: false,
            message: "An error occurred while fetching user profile. Please try again later."
        };
    }
}

module.exports = MyProfileService;
