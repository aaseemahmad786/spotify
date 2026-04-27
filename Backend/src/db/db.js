const mongoose=require('mongoose');

async function connectedDB(){
    try{
await mongoose.connect(process.env.MONGO_URI)
console.log("database connected sucessfully");
    }

    catch(err)
{
    console.log("databae connected error",err);
}
}
module.exports=connectedDB;