const User_Model = require("../../models/users.model");

async function AccountStatusChanger(id) {
    try {
        const editingUserDetails = await User_Model.findById(id);

        if (!editingUserDetails) {
            return {
                status: false,
                message: "User not found!"
            };
        }

        editingUserDetails.isPrivate = !editingUserDetails.isPrivate;

        // Save the changes
        await editingUserDetails.save();

        return {
            status: true,
            message: "User account status updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = AccountStatusChanger;
