/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Artem Tanyhin Student ID: 107958209 Date: 22/01/2020
* Heroku Link: _______________________________________________________________
*
********************************************************************************/

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://ArtemTanyhin:itsmeArtem@webassignment.gtlfb.mongodb.net/sample_restaurants?retryWrites=true&w=majority");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.json({ message: "API Listening" });
});



db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`Server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});