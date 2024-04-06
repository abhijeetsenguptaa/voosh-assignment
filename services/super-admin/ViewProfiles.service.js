const User_Model = require("../../models/users.model");

async function ViewProfileSuperAdminService(id, isPrivate, role) {
    try {
        let query = {}; 

        // If ID is provided, fetch user by ID
        if (id) {
            const userById = await User_Model.findById(id);
            if (userById) {
                return {
                    status: true,
                    message: "User found by ID",
                    data: userById
                };
            } else {
                return {
                    status: false,
                    message: "User not found by ID"
                };
            }
        }

        // If isPrivate flag is provided, add it to the query
        if (isPrivate !== undefined) {
            query.isPrivate = isPrivate;
        }

        // If role is provided, add it to the query
        if (role) {
            query.role = role;
        }

        // Fetch users based on the constructed query
        const users = await User_Model.find(query);

        // Return the fetched users
        return {
            status: true,
            message: "Users fetched based on criteria",
            data: users
        };
    } catch (error) {
        console.error("Error in fetching user profiles:", error.message);
        return {
            status: false,
            message: "An error occurred while fetching user profiles. Please try again later."
        };
    }
}

module.exports = ViewProfileSuperAdminService;
