const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// We need to create the instance of our mongooseSchema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
})

// json web token
userSchema.methods.generateToken = async function(){
    try {
        // console.log("i am in usermodel ",this,);
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,  //secret key or Signature which know by server only
        {
            expiresIn:"30d",  //Expires the token after 30days
        }

    );
    } catch (error) {
        console.error(error);
    }
}

// We need to define the model or the collection name
const User = new mongoose.model('User', userSchema);

module.exports = User;
