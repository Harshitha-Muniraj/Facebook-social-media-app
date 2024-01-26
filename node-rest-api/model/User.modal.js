import mongoose from "mongoose" 
const {ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    
    password: {
        type: String,
        required: true,
        min:6
    },
    
    token:{
        type:String,
    },
    verificationCode:{
        type:String
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:[{
        type:ObjectId, ref:"User"
    }],
    following:[{
        type:ObjectId, ref:"User"
    }],
    desc:{
        type:String,
        max:50,
        
    },
    
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
   
}, 
{
    timestamps: true,
}
)

const User=mongoose.model("User",userSchema);
export default User;
