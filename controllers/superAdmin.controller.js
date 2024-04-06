const ViewProfileSuperAdminService = require("../services/super-admin/ViewProfiles.service");

async function ViewProfileSuperAdminController(req,res) {
    try {
        const { id, isPrivate, role } = req.query;

        const userList = await ViewProfileSuperAdminService(id, isPrivate, role);

        return res.status(userList.status ? 200 : 404).json({
            status: userList.status,
            message: userList.message,
            data: userList.status ? userList.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { ViewProfileSuperAdminController };