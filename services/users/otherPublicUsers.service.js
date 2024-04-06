const User_Model = require("../../models/users.model");

async function OtherPublicUsersService() {
    try {
        // Find all users with isPrivate set to false
        const users = await User_Model.find({ isPrivate: false });

        return {
            status: true,
            message: "All users with account status: Public",
            count: users.length,
            data: users
        };
    } catch (error) {
        console.error("Error in fetching public users:", error.message);
        return {
            status: false,
            message: "An error occurred while fetching public users. Please try again later."
        };
    }
}

module.exports = OtherPublicUsersService;
