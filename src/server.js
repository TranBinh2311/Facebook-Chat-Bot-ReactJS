import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine"
import webRoute from  "./routes/web"
require('dotenv').config()


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//config view engine
viewEngine(app);


//config wrb route
webRoute(app);


let port = process.env.PORT || 8080;


app.listen(port, ()=>{
    console.log("App running in port: " + port);
})




