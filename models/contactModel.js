const mongoose =require("mongoose");

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"please add the email name"],
    },
    phone:{
        type:String,
        required:[true,"please add the phone name"],
    },

},
{
timestamps:true,
}

);
module.exports=mongoose.model("Contact",contactSchema);