import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name: {
            type: String,
            required : true
    },
    email: {
        type: String,
      required : true  
    },
    password: {
        type: String,
         required : true
    },
    user_role: {
        type: String, 
        enum : ['user','admin'],
        default : 'user'
    },
    resetToken: {
        type: Object,
        default: null
    }
}, {
    timestamps : true
})
const User = mongoose.model("user", userSchema);
export default User;