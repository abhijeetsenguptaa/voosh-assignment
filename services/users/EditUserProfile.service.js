const User_Model = require("../../models/users.model");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

async function EditUserProfileService(id, name, email, password, bio, image) {
    try {
        const user = await User_Model.findById(id);

        if (!user) {
            return {
                status: false,
                message: "User not found!"
            }
        }

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }

        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
        }

        if (bio) {
            user.bio = bio;
        }


        // Check if there's a new image uploaded
        if (image) {
            // If a new file is uploaded, update the image path and delete the previous image
            if (user.image) {
                try {
                    // Delete the previous image file
                    await fs.unlink(user.image);
                } catch (error) {
                    console.error(`Error deleting image file: ${error.message}`);
                }
            }

            // Set the image path to the new image path
            user.image = image;
        }

        await user.save();

        return {
            status: true,
            message: "User updated successfully!"
        }
    } catch (error) {
        console.error("Error in user logging in:", error.message);
        return {
            status: false,
            message: "An error occurred during user editing. Please try again later."
        };
    }
}

module.exports = EditUserProfileService;