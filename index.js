import  express  from "express";
import bodyParser from "body-parser";
import Mongoose from "mongoose";
import cors from "cors"
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
const app=express();
dotenv.config();

//setting Body-parser so that we can properly send request
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

//Cors Setup
app.use(cors());
app.use('/posts',postRoutes);

app.get('/',(req,res)=>{
        res.send("Hello to my app")
})
//MONGOOSE CONNECTION
//Connecting url string of Mongodb Atlas
const CONNECTION_URL='mongodb+srv://abc:abc@cluster0.6rrqm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT=process.env.PORT||4000;

Mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>app.listen(PORT,()=>console.log(`server running on port: ${PORT}`)))
        .catch((error)=>console.log(error.message));
