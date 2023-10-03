import { status_code } from "../helper/constant.js"
import { serverError } from "../helper/function.js"

export const userProfile = async (req, res) => {
    try {
        return res.status(status_code.SUCCESS).json({message : `Welcome ${req.user.user_name}`})
    } catch (error) {
        return serverError(res, error);
    }
}