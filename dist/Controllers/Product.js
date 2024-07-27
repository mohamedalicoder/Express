"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var ProductController = /** @class */ (function () {
    function ProductController(productService) {
        this.productService = productService;
    }
    // get data by using quary params   
    ProductController.prototype.getAllProducts = function (req) {
        var filterQuery = req.query.filter;
        if (filterQuery) {
            return this.productService.filterdByQuary(filterQuery);
        }
        return this.productService.findAll();
    };
    // git product py id 
    ProductController.prototype.getProductById = function (req, res) {
        var productId = +req.params.id;
        if (isNaN(productId)) {
            res.status(404).send("Invalid product id");
        }
        var product = this.productService.findById(productId);
        if (product) {
            res.send(product);
        }
        else {
            res.status(404).send("Product not found");
        }
    };
    // add product 
    ProductController.prototype.addNewProduct = function (req, res) {
        var productBody = req.body;
        this.productService.addProduct(productBody);
        res.status(200).send({
            id: this.productService.findAll().length + 1,
            name: productBody.productName,
            description: productBody.productDescription,
            price: +productBody.productPrice,
        });
        res.redirect('/');
    };
    ProductController.prototype.updateProduct = function (req, res) {
        var productId = +req.params.id;
        var productIndex = this.productService.findAll().findIndex(function (product) { return product.id === productId; });
        var productBody = req.body;
        if (productIndex !== -1) {
            this.productService.updateProductByIndex(productIndex, productBody);
            return res.status(200).send({
                massage: "product has been updated"
            });
        }
        else {
            return res.status(404).send("Product not found");
        }
    };
    // delete product by id
    ProductController.prototype.deleteProduct = function (req, res) {
        var productId = +req.params.id;
        if (isNaN(productId)) {
            return res.status(400).send('Invalid product id');
        }
        var productIndex = this.productService.findAll().findIndex(function (product) { return product.id == productId; });
        if (productIndex === -1) {
            return res.status(404).send('Product not found');
        }
        this.productService.deleteProductByIndex(productIndex, 1);
        res.send(this.productService.findAll());
    };
    ProductController.prototype.renderProductList = function (req, res) {
        res.render("product", {
            "product": this.productService.findAll(),
            "title": "this is products"
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
