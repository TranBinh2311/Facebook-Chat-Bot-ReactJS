import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine"
import webRoute from  "./routes/web"
require('dotenv').config()

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;


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




