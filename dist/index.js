"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("./data/index");
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
app.use(express_1.default.static('public')); // use public folder for static files
// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');
var fakeData = (0, index_1.generateProducts)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
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
// Define a GET route for /product
app.get("/product", function (req, res) {
    // Extract the 'filter' query parameter from the request
    var filterQuery = req.query.filter;
    // Check if there is a filter query
    if (filterQuery) {
        // Split the filter query into an array of properties to filter by
        var propertiesToFilter_1 = filterQuery.split(",");
        // Initialize an array to hold the filtered products
        var filterProduct = [];
        // Iterate over the fake data to filter the products
        filterProduct = fakeData.map(function (product) {
            // Create an empty object to hold the filtered product properties
            var filteredProduct = {};
            // Iterate over the properties to filter by
            propertiesToFilter_1.forEach(function (property) {
                // Check if the product has the current property
                if (product.hasOwnProperty(property)) {
                    // Add the property to the filtered product
                    filteredProduct[property] = product[property];
                }
            });
            // Return the filtered product with its id
            return __assign({ id: product.id }, filteredProduct);
        });
        // Send the filtered products as the response
        res.send(filterProduct);
    }
    else {
        // If no filter query, send all the fake data as the response
        res.send(fakeData);
    }
});
app.get("/", function (req, res) {
    res.render('index', { products: fakeData });
});
app.post("/add-product", function (req, res) {
    var reqs = req.body;
    var newProduct = {
        id: fakeData.length + 1,
        name: reqs.productName,
        description: reqs.description,
        price: +reqs.productPrice,
    };
    fakeData.push(newProduct);
    res.status(201).send(newProduct);
});
// update the name 
app.patch("/update:id", function (req, res) {
    var productId = +req.params.id;
    if (isNaN(productId)) {
        return res.status(400).send('Invalid product id');
    }
    var reqs = req.body;
    var productIndex = fakeData.findIndex(function (p) { return p.id === productId; });
    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }
    fakeData[productIndex] = __assign(__assign({}, fakeData[productIndex]), reqs);
    res.send(fakeData[productIndex]);
});
// delete product
app.delete("/delete:id", function (req, res) {
    var productId = +req.params.id;
    if (isNaN(productId)) {
        return res.status(400).send('Invalid product id');
    }
    var productIndex = fakeData.findIndex(function (p) { return p.id === productId; });
    if (productIndex === -1) {
        return res.status(404).send('Product not found');
    }
    fakeData.splice(productIndex, 1);
    res.send(fakeData);
});
// Start the server on port 3000
app.listen(3000, function () {
    console.log('Application started on port 3000!');
});
