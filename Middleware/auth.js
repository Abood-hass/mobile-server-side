var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '2h' });
}

exports.tokenAuthentication = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: "no token"})

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        req.user = decoded.user
        next();
    }catch(err){
        res.status(401).json({ msg: err})
    }
}

// module.exports = auth;