"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var ProductController = /** @class */ (function () {
    function ProductController(productService) {
        this.productService = productService;
    }
    ProductController.prototype.getAllProducts = function () {
        return this.productService.findAll();
    };
    return ProductController;
}());
exports.ProductController = ProductController;
