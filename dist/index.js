"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("./data/index");
var body_parser_1 = __importDefault(require("body-parser"));
var Product_1 = require("./Controllers/Product");
var ProductServices_1 = require("./services/ProductServices");
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.use(express_1.default.static('public')); // use public folder for static files
// Set EJS as the templating engine
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, 'views'));
var fakeData = (0, index_1.generateProducts)();
var productServices = new ProductServices_1.ProductServices(fakeData);
var productController = new Product_1.ProductController(productServices);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// static files 
app.use(express_1.default.static('public'));
app.get("/products", function (req, res) { return productController.renderProductList(req, res); });
app.get("/product/:id", function (req, res) { return productController.renderProduct(req, res); });
app.get("/", function (req, res) {
    res.render("index");
});
// get all product 
app.get("/all", function (req, res) { return res.send(productController.getAllProducts(req)); });
// git product py id 
app.get("api/products/:id", function (req, res) { return res.send(productController.getProductById(req, res)); });
// get data by using quary params 
app.get("/products", function (req, res) { return res.send(productController.getAllProducts(req)); });
// add product 
app.post("/add-product", function (req, res) { return res.send(productController.addNewProduct(req, res)); });
// ,v update product
app.patch("/update/:id", function (req, res) { return productController.updateProduct(req, res); });
//dlkkdjlkjdklj
// delete product
app.delete("/delete/:id", function (req, res) { return productController.deleteProduct(req, res); });
app.get("*", function (req, res) {
    res.render("notFound");
});
// Start the server on port 3000
app.listen(3000, function () {
    console.log('Application started on port 3000!');
});
