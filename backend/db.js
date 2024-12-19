const mongoose = require('mongoose');
require('dotenv').config();


// define the mongoDB connection url
const mongourl=process.env.MONGODB_URL_LOCAL;  //replace database name wit the new one  
//const mongourl = process.env.MONGODB_URL;


//seetup mongodb connection
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection
//mongoose maintains a default connection object representing the mongoDB connection 
const db = mongoose.connection;

//Define event lisntners for database connection 
db.on('error', () => {
    console.log("error connecting to mongoDB")
});

db.on('connected', () => {
    console.log("connected to mongoDB")
})

db.on('disconnected', () => {
    console.log("disconnected from mongoDB")
})

//export the database connection
module.exports = db;      