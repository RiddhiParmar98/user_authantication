import Jwt from "jsonwebtoken";

export const status_code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CREATED: 201, 
    UNATHORISED: 401,
    FOR_BIDDEN: 403, 
    SERVER_ERROR: 500,
    CONFLICT : 409
}

export const  error_message= {
    ALREADY_EXISTED: "User already existed.",
    SERVER_ERROR: "Something went wrong.",
    INVALID_USER: 'Invalid username and password.',
    INVALID_CREDENTIAL: "Invalid Credential",
    UNATHORISED: 'User authantication required',
    NOT_FOUND: "User not found",
    LINK_EXPRIED: "Invalid link or expired"

}

export const success_message = {
    USER_CREATED: "User registerd successfully.",
    LOGIN: "User login successfully",
    MAIL_RESET_PASSWORD: "An email has been sent with instructions on how to reset password.",
    RESET_PASSWORD : "Your password has been reset"
}

