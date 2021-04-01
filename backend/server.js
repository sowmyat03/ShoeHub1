var express = require('express');
var dotenv = require('dotenv');
var config = require('./config');
var mongoose = require('mongoose');
var userRoute=require('./routes/userRoutes');
var productRoute=require('./routes/productRoute');
var bodyParser = require('body-parser');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error=>console.log(error.reason));
mongoose.set('useCreateIndex', true);

const app = express();
app.use(bodyParser.json());
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);

app.listen(5000,()=>{
    console.log("server started");
})