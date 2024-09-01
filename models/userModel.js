const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user"],
    },

    password:{
        type:String,
        required:[true,"Please add the password"],
    },
    email:{
        type:String,
        required:[true,"Please add the password"],
        unique:[true,"email address already taken"]
    },
},
{
    timestamps:true,
}

);

module.exports=mongoose.model("User",userSchema);