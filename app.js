const express=require('express')
const bodyparse =require("body-parser")
const mongoose=require('mongoose')
const app=express()
const port=5000
const connectDB=require('./db/connectdb')
const path = require('path')
//const {create_task}=require('./controller/tasks')
const user=require('./db/register_schema')
const living_room=require("./db/living_room")
const bed1_room=require("./db/bed1")
const bed2_room=require("./db/bed2")
const kitchen=require("./db/kitchen")
const cors=require('cors')


console.clear()
app.use(cors())
app.use(express.json())
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))


const salt = "499b76bb1df1d79938bea87b41b2bc71"
const { randomBytes, scryptSync } = require('crypto')





app.get("/",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/index.html");
})



//***********/ register *************//

// get
app.get("/vm/register",(req,res)=>{
   res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/register.html");
})

//post
app.post("/vm/register",(req,res,next)=>{
    console.log(req.body)
   
    
    const cryptpassword = () => {
        const hashedpassword = scryptSync(req.body.password, salt, 64).toString('hex');
        req.body.password = hashedpassword
    }

    cryptpassword()


    const userdata = new user(
        req.body
    )

    userdata.save()
    console.log(userdata)
    res.redirect('/vm/login')
    next()
})


//***********/ Login *************//


app.post('/vm/login', async (req, res, next) => {
    const doc = await user.findOne({ email: req.body.email })
    console.log(doc)
    if(!doc){
        res.send("password is not matched");
    }
    const actual_password = doc.password
    var enter_password = req.body.password
    const cryptpassword = () => {
        const hashedpassword = scryptSync(enter_password, salt, 64).toString('hex');
        enter_password = hashedpassword
    }
    cryptpassword()
    console.log(actual_password)
    console.log(enter_password)

    if (enter_password == actual_password) {     
        res.json({email:req.body.email});
    }
    else {
        res.json({"message":"password is not matched"});
    }
})


app.get("/vm/login",(req,res)=>{
   res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/login.html")
})


//***********/ Simulator *************//


app.get("/vm/simulator",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/package.html")
})


app.get("/vm/simulator/bed1",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/bed1.html")
})

app.post("/vm/simulator/bed1",async(req,res)=>{
    //  console.log(req.body.arr.len)
                                                                             
        for(let i=0;i<req.body.arr.length;i++){
            console.log(req.body.arr[i])
            // console.log(arr[i].arr)    
          const bed1_room_data = new bed1_room(
              req.body.arr[i]
          )
        //  console.log(arr[i])
         await bed1_room_data.save()
          console.log(bed1_room_data)
           }
         
    res.json({"lesss go":"true"})
})




app.get("/vm/simulator/bed2",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/bed2.html")
})


app.post("/vm/simulator/bed2",async(req,res)=>{
    //  console.log(req.body.arr.len)
    
        for(let i=0;i<req.body.arr.length;i++){
            console.log(req.body.arr[i])
            // console.log(arr[i].arr)    
          const bed2_room_data = new bed2_room(
              req.body.arr[i]
          )
        //  console.log(arr[i])
         await bed2_room_data.save()
          console.log(bed2_room_data)
           }
         
    res.json({"lesss go":"true"})
})




app.get("/vm/simulator/kitchen",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/kitchen.html")
})


app.post("/vm/simulator/kitchen",async(req,res)=>{
    //  console.log(req.body.arr.len)
    
        for(let i=0;i<req.body.arr.length;i++){
            console.log(req.body.arr[i])
            // console.log(arr[i].arr)    
          const kitchen_room_data = new kitchen(
              req.body.arr[i]
          )
        //  console.log(arr[i])
         await kitchen_room_data.save()
          console.log(kitchen_room_data)
           }
         
    res.json({"lesss go":"true"})
})



app.get("/vm/simulator/living",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/living.html")
})


app.post("/vm/simulator/living",async(req,res)=>{
    //  console.log(req.body.arr.len)
    
        for(let i=0;i<req.body.arr.length;i++){
            console.log(req.body.arr[i])
            // console.log(arr[i].arr)    
          const living_room_data = new living_room(
              req.body.arr[i]
          )
        //  console.log(arr[i])
         await living_room_data.save()
          console.log(living_room_data)
           }
         
    res.json({"lesss go":"true"})
})


//***********/ user *** **********//


app.get("/vm/user",(req,res)=>{``
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/user.html")
})


app.post("/vm/user_data",async(req,res)=>{
   const bed1= await bed1_room.find({email:req.body.email});
   const bed2 =await bed2_room.find({email:req.body.email});
   const kitchenn=await kitchen.find({email:req.body.email});
   const living=await living_room.find({email:req.body.email})
 

   console.log([bed1,bed2,kitchenn,living])
   res.json([bed1,bed2,kitchenn,living])
})


//***********/ help *************//

app.use("/vm/help/",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/help.html")
})

//***********/ custom *************//

app.get("/vm/simulator/custom",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/custom.html")
})



//***********/ standard *************//
app.get("/vm/simulator/standard",(req,res)=>{
    res.sendFile("D:/NODE_PROJECT/Virtual_Smart_Home/public/custom.html")
})



//***********/ server *************//




const start=async()=>{
    await connectDB()
     app.listen(port,()=>{
         console.log(`server is listning on ${port}`)
     })  
 }
 
 start()


