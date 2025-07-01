const mongoose = require ("mongoose")

async function ConnectionDB(params) {
    return(
     await mongoose.connect("mongodb://localhost:27017/MyDatabases").then(()=>{
        console.log("Mongoose Connected Succesfully");
        
        }).catch((error)=>{
        console.log("Something Went Wrong" ,error);
        })

    )
}


module.exports = ConnectionDB