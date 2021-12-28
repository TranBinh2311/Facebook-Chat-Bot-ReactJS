

import { ModulesOption } from "@babel/preset-env/lib/options";
import express from "express";
import homeController from '../controllers/HomeController'
let router = express.Router();

let initWebRoute = (app) =>{
    router.get("/", homeController.getHomePage);
    router.post("/setup-profile", homeController.setUpProfile);
    router.post("/setup-prersistent-menu", homeController.setUpPersistentMenu)
    router.post("/webhook",  homeController.postWebhook);
    router.get("/webhook", homeController.getWebhook);
    return app.use('/', router);
}


module.exports = initWebRoute;
