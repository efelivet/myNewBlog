 const express = require('express');
 const mongoose = require('mongoose');
 const dotenv = require("dotenv");
 const cors = require('cors');
 const authRoute = require('./routes/auth.js');
 dotenv.config();

 const app =express();

 app.use(express.json());
 app.use(cors());

 mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
 }).then(()=>console.log("mongoDB Connected Sucessfully")
).catch((err)=>console.error("Mongodb connection error"))


// Use the router here

app.use("/api",authRoute)

app.get('/',(req,res)=>{
    res.send("server is running and connected to MongoDB")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))