const mongoose=require('mongoose')
const connectionstring = "mongodb://0.0.0.0:27017/virtual_smart_home"



const connectDB = async() => {
    return mongoose.connect(connectionstring).then(() => {
        console.log(`connected to db`)
    }).catch((e)=>console.log(e.message))
} 


module.exports=connectDB;