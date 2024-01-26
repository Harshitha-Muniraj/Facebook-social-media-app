import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/instaDb",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("error connecting mongodb"))

