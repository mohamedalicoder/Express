"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fakeData_1 = require("../data/fakeData");
const app = (0, express_1.default)();
const products = (0, fakeData_1.generateProducts)();
app.get("/", (req, res) => {
    res.send("hallo world");
});
app.get("/product", (req, res) => {
    res.send(products);
});
app.get("/product/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.send(products);
    }
    else {
        res.status(404).send("Product not found");
    }
});
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000/");
});
