const mongoose = require('mongoose');

// MONGODB_URI=mongodb+srv://pankajjnv2005:Fi6aK8e7BXMGN7Nc@cluster0.ttje9.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0
// const URI = "mongodb://localhost:27017/mernstack";

// const URI = "mongodb://localhost:27017/mernstack";

const URI = process.env.MONGODB_URI;
const connectDb = async ()=>{
    try {
       await mongoose.connect(URI);
       console.log("Database connected successfully with server");
    }catch(error) {
        console.log("Database connection failed: ",error);
    }
}

module.exports = connectDb;