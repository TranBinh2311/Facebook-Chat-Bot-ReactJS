

import { ModulesOption } from "@babel/preset-env/lib/options";
import express from "express";
import homeController from '../controllers/HomeController'
let router = express.Router();

let initWebRoute = (app) =>{
    router.get("/", (req, res)=>{
        return homeController.getHomePage(req, res);
    })

    router.post("/webhook", (req, res) => homeController.postWebhook(req, res));
    router.get("/webhook", (req, res) => homeController.getWebhook(req,res));
    return app.use('/', router);
}


module.exports = initWebRoute;
