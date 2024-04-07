function logout(req, res) {
    try {
        // Assuming you're storing the token in a cookie or header

        // Clear the token from the cookie
        res.clearCookie('token'); // If using cookies

        // Clear the token from headers
        // res.setHeader('Authorization', ''); // If using headers

        res.status(200).json({ status: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Error occurred during logout:", error.message);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

module.exports = logout;
