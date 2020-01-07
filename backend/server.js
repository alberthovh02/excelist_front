const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors")

const lessonRoute = require("./routes/index");
//Configurations
const { server, database } = require("./config/config");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(bodyParser.json())

//Database connection
mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser :"false"});

//Handle database connection error
mongoose.connection.on("error",(err)=>{
    console.log("err",err);
});

//Database successfull connection
mongoose.connection.on("connected",(err,res) => {
    console.log("mongoose is connected");
});

// app.use("/login/admin", authRoute);
app.use("/create-lesson", lessonRoute)
;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is running in port ${PORT}`))
