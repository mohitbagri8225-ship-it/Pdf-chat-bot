import { asyncHandler } from "../utils/asynHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET as string;

interface JwtPayloadWithId extends jwt.JwtPayload {
    _id: string;
}

const verifyJwt = asyncHandler(async (req, res, next) => {
    const accessToken =
        req.cookies.accessToken ||
        req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
        throw new apiError("Unauthorized", 401);
    }

    const decodedToken = jwt.verify(
        accessToken,
        accessTokenSecret
    ) as JwtPayloadWithId;

    const user = await User.findById(decodedToken._id)
        .select("-password -refreshToken");

    if (!user) {
        throw new apiError("Unauthorized", 401);
    }

    req.user = user;

    next();
});

export { verifyJwt };