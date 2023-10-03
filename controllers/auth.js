import User from "../Models/user.js";
import { error_message, status_code, success_message } from "../helper/constant.js";
import dotenv from 'dotenv';
import { v4 as uuidv4, v4 } from 'uuid';
import { generateToken, genratePassword, serverError, verifyPassword } from "../helper/function.js";
import { sendEmail } from "../Mailer/reset-password-mail.js";
import { now } from "mongoose";
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;



export const createUser = async (req, res, next) => {
    try {
        const { email, user_role, user_name, password } = req.body;
        const alreadyExisted = await User.findOne({ email })
        if (alreadyExisted) {
            return res.status(status_code.CONFLICT).json({ message: error_message.ALREADY_EXISTED })
        }

        const secretPassword = await genratePassword(password);
        const userData = new User({
            email, user_name, user_role, password: secretPassword
        })

        await userData.save();
        const token = generateToken(userData, secretKey);
        return res.status(status_code.CREATED).json({ message: success_message.USER_CREATED })

    } catch (error) {
        next(error)
        return serverError(res, error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { user_name, password } = req.body;
        const user = await User.findOne({ user_name })
        if (!user) {
            return res.status(status_code.NOT_FOUND).json({ message: error_message.NOT_FOUND })
        } else {
            const isPasswordValid = await verifyPassword(password, user.password)
            if (!isPasswordValid) {
                return res.status(status_code.UNATHORISED).json({ message: error_message.INVALID_USER })
            }
            else {
                const token = generateToken(user, secretKey);
                return res.status(status_code.SUCCESS).json({ message: success_message.LOGIN, token })
            }
        }
    } catch (error) {
        next(error);
        return serverError(res, error)
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(status_code.NOT_FOUND).json({ message: error_message.NOT_FOUND })
        } else {
            const resetToken = {
                token: uuidv4(),
                tokenExpired: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }

            await sendEmail(user.email, "https://www.google.com/")
            await User.updateOne({ _id: user._id }, { resetToken }) 
        res.json({ message: success_message.MAIL_RESET_PASSWORD })
        }

    } catch (error) {
        return serverError(res, error)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { userId, resetToken } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(status_code.NOT_FOUND).json({ message: error_message.NOT_FOUND })
        }
        if (user.resetToken.tokenExpired < Date.now()) {
            return res.status(status_code.BAD_REQUEST).json({ message: error_message.LINK_EXPRIED })
        }
        if (!user.resetToken.token || user.resetToken.token !== resetToken) {
            return res.status(status_code.BAD_REQUEST).json({ message: error_message.LINK_EXPRIED })
        }
        const secretPassword = await genratePassword(password);
        await User.updateOne({ _id: user._id }, { password: secretPassword, resetToken: null })
        
        return res.json({message : success_message.RESET_PASSWORD})
    } catch (error) {
        return serverError(res,error)
    }
}