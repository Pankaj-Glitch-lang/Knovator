
const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const cors = require('cors');
dotenv.config()

const app=express()
const uri=process.env.mongodb_uri
const PORT=process.env.PORT

app.use(express.json())
app.use(cors())
const atlasDb= ()=>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

}
app.use("/api/jobs", require("./routes/jobRoutes"));



app.listen(PORT,(err)=>{
    if(!err){
        console.log('Server Started..');
        atlasDb()
    }else{
        console.log('Something Went wrong',err);
    }
})