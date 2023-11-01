const mongoose=require('mongoose')

const living_room_schema=mongoose.Schema({
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


module.exports=mongoose.model("living_room",living_room_schema)
