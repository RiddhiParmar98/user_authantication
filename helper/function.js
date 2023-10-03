import Jwt from "jsonwebtoken";
import bcrypt, { hash } from 'bcrypt';
import { error_message, status_code } from "./constant.js";
const salt = await bcrypt.genSalt(10);



export const generateToken = (payload, secretKey) => {
    try {
      const token = Jwt.sign({id : payload._id}, secretKey, {expiresIn : '1 hour'});
      return token;
    } catch (error) {
      console.error('JWT signing error:', error);
      throw error; // Rethrow the error for further handling
    }
  }

export const serverError = (res,error) => {
    return res.status(status_code.SERVER_ERROR).json({message : error_message.SERVER_ERROR, type : error.name, error : error.message })
}

export const genratePassword = async (password) => {
 try {
  return await bcrypt.hash(password, salt);
 } catch (error) {
   console.log('gernrate password error', error)
    throw error
 }
}

export const verifyPassword = async (password, hasPassword) => {
  try {
    return await bcrypt.compare(password, hasPassword);
  } catch (error) {
    console.log('password error', error)
    throw error
  }
}
