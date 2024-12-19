const express = require('express')
const app = express();
const db=require('./db')  
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;
const cors = require('cors');


// Enable CORS for requests from http://localhost:5173
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


 //import the router file 
 const userRoutes = require('./routes/userRoutes');
 const candidateRoutes = require('./routes/candidateRoutes');
 
 
 //use the router file
 app.use('/user',userRoutes); 
 app.use('/candidate',candidateRoutes);


app.listen(PORT,()=>{
    console.log("server is running");
})