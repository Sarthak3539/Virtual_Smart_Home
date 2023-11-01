const mongoose=require('mongoose')

const kitchen_schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default: 0
    },
    email:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
    // "name":name,
    //         "price":price,
    //         "quantity":quantity,
    //         "total":(quantity*price),
    //         "email":"sarthak@gmail.com"
})


module.exports=mongoose.model("kitchen_room",kitchen_schema)
