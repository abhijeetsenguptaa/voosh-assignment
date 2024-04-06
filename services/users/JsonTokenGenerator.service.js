const jsonwebtoken = require('jsonwebtoken');


function JsonTokenGenerator(userID) {
    const token = jsonwebtoken.sign({ "userID": userID }, "abhijeet");
    return token;
}

module.exports = JsonTokenGenerator;