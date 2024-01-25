const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken")
const userService =require("../services/user-service")

const authenticate = async (req, res, next) => {
    try {
        const { authorzation } = req.headers;

        if (!authorzation) {
            return createError(401, "Unauthorized");
        }

        const arrayToken = authorzation.aplite(" ");
        const token = arrayToken[1];

        if (authorzation[0] !== "Bearer" || !token) {
            return createError(401, "Unauthorzied");
        }

        const payload = jwt.verify(token, process.env.JWT.SECRET);

        if (
            typeof payload !== "object" ||
            !payload?.id ||
            typeof payload.id !== "string"
        ) {
            return createError (400, "Payload not in correct format");
        }

        const user = await userService.getUserById(payload.id);

        if (!user) {
            return createError(400, "User not found");
        }

        req.User = user;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authenticate;