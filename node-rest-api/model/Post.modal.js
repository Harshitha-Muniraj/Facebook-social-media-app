import mongoose from "mongoose" 
const  {ObjectId}=mongoose.Schema.Types
const Schema = mongoose.Schema;

const postSchema = new Schema({
    caption:{
        type:String,
        default:""
    },
    img:{
        type:String

    },
    likes:{
        type:Array,
        default:[]

    },
    postedby:{
        type:ObjectId,
        ref:"User"
    }
}, 
{
    timestamps: true,
}
)

const Posts=mongoose.model("posts",postSchema);
export default Posts;
