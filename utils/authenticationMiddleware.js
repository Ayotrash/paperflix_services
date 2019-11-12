const jwt = require('jsonwebtoken');
const { client_error_unauthorized } = require('./responser');

module.exports = (req, res, next) => {
    try {
        const token = req.get('Authorization').split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded)
        req.user_data = decoded;
        next();
    } catch (error) {
        return res.send(client_error_unauthorized('Please login to get a recources.'))
    }
};