import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type : String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg",
    }

},{timestamps:true} // to reduce time for users
);

const User = mongoose.model('User',userSchema);

export default User;