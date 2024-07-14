"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("./data/index");
var app = (0, express_1.default)();
var fakeData = (0, index_1.generateProducts)();
// get all product 
app.get("/all", function (req, res) {
    res.send(fakeData);
});
// git product py id 
app.get('/product/:id', function (req, res) {
    var productId = parseInt(req.params.id);
    var products = fakeData.find(function (p) {
        return p.id === productId;
    });
    if (products) {
        res.send(products);
    }
    else {
        res.status(404).send('Product not found');
    }
});
// get data by using quary params 
app.get("/product", function (req, res) {
    var filterQuery = req.query.filter;
    console.log(filterQuery);
    var filters = filterQuery.split(",");
});
app.listen(3000, function () {
    console.log('Application started on port 3000!');
});
