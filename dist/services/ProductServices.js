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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
var data_1 = require("../data");
// هنا بنجيب الداتا الوهميه اللي هنشتغل عليها
var fakeData = (0, data_1.generateProducts)();
// دي الكلاس اللي بنعمل فيها الخدمات المختلفه للمنتجات
var ProductServices = /** @class */ (function () {
    // الكونستركتور بتاع الكلاس بياخد ارراي من المنتجات وبيحفظها في الخاصية products
    function ProductServices(products) {
        this.products = products;
        this.products = products;
    }
    // دي فانكشن بترجع كل المنتجات اللي عندنا
    ProductServices.prototype.findAll = function () {
        return this.products;
    };
    // دي فانكشن بتفلتر المنتجات بناءً على الكويري اللي بتيجي في الريكوست
    ProductServices.prototype.filterdByQuary = function (filterQuery) {
        // لو فيه كويري
        if (filterQuery) {
            // بنقسم الكويري اللي جايه على اساس الكوما
            var propertisToFilter_1 = filterQuery.split(",");
            var filterProduct = [];
            // بنعمل ماب على المنتجات وبنفلترها
            filterProduct = this.findAll().map(function (product) {
                var filteredProduct = {};
                propertisToFilter_1.forEach(function (property) {
                    // لو المنتج فيه الخاصيه اللي بنفلتر عليها
                    if (product.hasOwnProperty(property)) {
                        filteredProduct[property] = product[property];
                    }
                });
                return __assign({ id: product.id }, filteredProduct);
            });
            return filterProduct;
        }
        else {
            return this.findAll();
        }
    };
    // دي فانكشن بتجيب المنتج على اساس الايدي بتاعه
    ProductServices.prototype.findById = function (productId) {
        if (productId) {
            var product = this.findAll().find(function (product) { return product.id == productId; });
            return product;
        }
    };
    // دي فانكشن بتضيف منتج جديد
    ProductServices.prototype.addProduct = function (productBody) {
        return this.findAll().push(__assign({ id: this.findAll().length + 1 }, productBody));
    };
    // دي فانكشن بتعمل تحديث للمنتج بناءً على الانديكس بتاعه
    ProductServices.prototype.updateProductByIndex = function (index, productBody) {
        return this.findAll()[index] = __assign(__assign({}, this.findAll()[index]), productBody);
    };
    // دي فانكشن بتحذف المنتج بناءً على الانديكس بتاعه
    ProductServices.prototype.deleteProductByIndex = function (index) {
        this.findAll().splice(index, 1);
    };
    return ProductServices;
}());
exports.ProductServices = ProductServices;
