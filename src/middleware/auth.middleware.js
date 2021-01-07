import * as db from '../dbHandler.js'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = () => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                return res.status(401).send({message:'token not provided'});
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.JWT_SECRET || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            //console.log(decoded)
            const user = await db.getid( decoded.user_id, 'users');

            if (!user) {
                return res.status(401).send({message:'Authentication failed!'});
            }
            next();

        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                return res.status(401).send({message:'token expired'});
            }
            e.status = 401;
            next(e);
        }
    }
}
module.exports = auth;