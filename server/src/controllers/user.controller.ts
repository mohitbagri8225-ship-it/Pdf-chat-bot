import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import type { IUser } from "../models/user.model.js";
import type { Response } from "express";


interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}
interface Request {
    user?: IUser;
}
interface LoginuserData {
    email: string;
    password: string;
    username: string
}

const generateAccessAndRefreshTokens = async (
    userId: string
): Promise<TokenResponse> => {
    try {
        // User.findById() can return User OR null
        const user = await User.findById(userId);

        // TypeScript now knows user is not null after this check
        if (!user) {
            throw new apiError("User not found", 404);
        }

        // These methods should be defined in your User model
        const accessToken: string = user.generateAccessToken();
        const refreshToken: string = user.generateRefreshToken();

        // Store refresh token in database
        user.refreshToken = refreshToken;

        // Skip validation because we are only updating refreshToken
        await user.save({
            validateBeforeSave: false
        });

        return {
            accessToken,
            refreshToken
        };

    } catch (error) {
        console.log(error);

        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(
            "Error while generating access and refresh tokens",
            500
        );
    }
};


const regesterUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body;


    if (!fullName || !email || !username || !password) {
        throw new apiError("All fields are required", 400);
    }

    //find based on email or username 
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new apiError("User already exists with the given email or username", 400);
    }
    const user = await User.create({
        fullName,
        email,
        username: username,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new apiError("Error in creating user", 500);
    }

    return res.status(201).json(
        new ApiResponse(201, "User created successfully", createdUser)
    );
});

const loginUser = async (req: any, res: Response): Promise<any> => {
    const { email, username, password } = req.body;

    if (!(email || username) || !password) {
        throw new apiError("All fields are required", 400);
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new apiError("Invalid credentials", 400);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new apiError("Invalid credentials", 401);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id.toString());

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {//security for cookie
        httpOnly: true,
        secure: true
    }

    return res.
        status(200).
        cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "", {
                accessToken,//sending access token and refresh token in the response as well as in the cookie so that frontend can access it from either place
                refreshToken,
                user: loggedInUser
            })
        );
};


const logOutUser = asyncHandler(async (req, res: Response) => {
    const user = req.user as IUser// we have attached the user to the req object in the auth middleware so we can access it here
    if (!user || typeof user === "string") {
        throw new apiError("Unauthorized request", 400);
    }

    await User.findOneAndUpdate(
        { _id: user._id },
        {
            $unset: {
                accessToken: 1
            }
        },
        {
            new: true,
            runValidators: true
        }
    );
    const options = {//security for cookie
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, "User logged out successfully", {})
        )
});



export  {
    generateAccessAndRefreshTokens,
    logOutUser,
    regesterUser,
    loginUser
};