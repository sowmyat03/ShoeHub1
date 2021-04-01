var express = require('express');
var data = require('./data');
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

app.get("/api/products", (req, res) => {
    res.send(data);
});
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.find(x => x._id == productId);
    if (product)
        res.send(product);
    else
        res.status(404).send({ msg: "product not found" });
});

app.listen(5000,()=>{
    console.log("server started");
})