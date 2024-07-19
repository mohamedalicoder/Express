"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
var data_1 = require("../data");
var fakeData = (0, data_1.generateProducts)();
var ProductServices = /** @class */ (function () {
    function ProductServices() {
        this.products = fakeData;
    }
    ProductServices.prototype.findAll = function () {
        return this.products;
    };
    return ProductServices;
}());
exports.ProductServices = ProductServices;
