const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const RestaurantDB = require("./modules/restaurantDB.js");
require('dotenv').config();
const db = new RestaurantDB(process.env.MONGO_CON_STR);

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.json({ message: "API Listening" });
});

app.post("/api/restaurants", (req,res) => {
    db.addNewRestaurant(req.body).then(()=>{
        res.status(201).json({message: "restaurant added"});
    }).catch(err => res.status(500).json({message: err}));
});

app.get("/api/restaurants", (req,res) => {
    if(req.query.page && req.query.perPage) {
        db.getAllRestaurants(req.query.page,req.query.perPage,req.query.borough).then(data => {
            if (data.length > 0) res.json(data);
            else res.status(500).json({message: "not found"});
        })
    }
    else res.status(500).json({message: "page and perpage have to be present"});
});

app.get("/api/restaurants/:index", (req,res) => {
    db.getRestaurantById(req.params.index).then(data => {
        if (data) res.json(data);
        else res.status(500).json({message: "not found"});
    });
});

app.put("/api/restaurants/:index", (req,res) => {
    db.updateRestaurantById(req.body, req.params.index).then(() => {
        res.json({message: "restaurant updated"});
    }).catch(err => res.status(500).json({message: err}));
});

app.delete("/api/restaurants/:index", (req,res) => {
    db.deleteRestaurantById(req.params.index).then(() => {
        res.status(204).end();
    }).catch(err => res.status(500).json({message: err}));
});

app.use((req, res) => {
    res.status(404).send("Resource not found");
});

db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`Server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});