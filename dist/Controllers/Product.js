"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
// دي الكلاس اللي بتتحكم في المنتجات
var ProductController = /** @class */ (function () {
    // الكونستركتور بياخد اوبجكت من الخدمات بتاعة المنتجات
    function ProductController(productService) {
        this.productService = productService;
    }
    // دي فانكشن بتجيب كل المنتجات بناءً على الكويري برامز
    ProductController.prototype.getAllProducts = function (req) {
        var filterQuery = req.query.filter;
        if (filterQuery) {
            return this.productService.filterdByQuary(filterQuery);
        }
        return this.productService.findAll();
    };
    // دي فانكشن بتجيب المنتج على اساس الايدي بتاعه
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
    // دي فانكشن بتضيف منتج جديد
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
    // دي فانكشن بتعمل تحديث للمنتج
    ProductController.prototype.updateProduct = function (req, res) {
        var productId = +req.params.id;
        var productIndex = this.productService.findAll().findIndex(function (product) { return product.id === productId; });
        var productBody = req.body;
        if (productIndex !== -1) {
            this.productService.updateProductByIndex(productIndex, productBody);
            return res.status(200).send({
                message: "Product has been updated"
            });
        }
        else {
            return res.status(404).send("Product not found");
        }
    };
    // دي فانكشن بتحذف المنتج على اساس الايدي بتاعه
    ProductController.prototype.deleteProduct = function (req, res) {
        var productId = +req.params.id;
        if (isNaN(productId)) {
            return res.status(400).send('Invalid product id');
        }
        var productIndex = this.productService.findAll().findIndex(function (product) { return product.id == productId; });
        if (productIndex === -1) {
            return res.status(404).send('Product not found');
        }
        this.productService.deleteProductByIndex(productIndex);
        res.send(this.productService.findAll());
    };
    // دي فانكشن بترندر صفحة المنتجات
    ProductController.prototype.renderProductList = function (req, res) {
        res.render("products", {
            product: this.productService.findAll(),
            title: "This is products"
        });
    };
    // دي فانكشن بترندر صفحة منتج معين
    ProductController.prototype.renderProduct = function (req, res) {
        var productId = +req.params.id;
        res.render("product", {
            product: this.productService.findById(productId)
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
