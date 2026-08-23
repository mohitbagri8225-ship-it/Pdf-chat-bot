import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

 export interface IUser extends Document {
    username: string;
    email: string;
    fullName: string; 
    password: string; 
    refreshToken?: string | null;

    generateAccessToken(): string;
    generateRefreshToken(): string;
    isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        }, 

        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return ;
    }
    this.password = await bcrypt.hash(this.password, 10);
});


// Compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};


// Generate access token
userSchema.methods.generateAccessToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: "15m"
        }
    );
};


// Generate refresh token
userSchema.methods.generateRefreshToken = function (): string {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: "7d"
        }
    );
};


export const User = mongoose.model<IUser>("User", userSchema);