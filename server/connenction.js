const mongoose = require ("mongoose")

async function ConnectionDB(params) {
    return(
    //  await mongoose.connect(process.env.MONGODB_URI).then(()=>{
     await mongoose.connect("mongodb://localhost:27017/MyDatabases").then(()=>{
        console.log("Mongoose Connected Succesfully");
        
        }).catch((error)=>{
        console.log("Something Went Wrong" ,error);
        })

    )
}


module.exports = ConnectionDB


// const mongoose = require('mongoose');

// const ConnectionDB = async () => {
//   try {
//     const URL = process.env.MONGODB_URI; // use env variable here
//     await mongoose.connect(URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully.");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//   }
// };

// module.exports = ConnectionDB;
