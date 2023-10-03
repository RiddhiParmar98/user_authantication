import { error_message, status_code } from "../helper/constant.js";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../Models/user.js";
dotenv.config();

export const authanticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(status_code.UNATHORISED).json({ message: error_message.UNATHORISED })
        }
        const decodeToken = Jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decodeToken.id);
        if (!user) {
            return res.status(status_code.NOT_FOUND).json({ message: error_message.NOT_FOUND })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(status_code.UNATHORISED).json({ message: error_message.UNATHORISED })
    }
}