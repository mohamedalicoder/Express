"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProducts = void 0;
var faker_1 = require("@faker-js/faker");
var generateProducts = function () {
    return Array.from({ length: 30 }, function (_, idx) {
        return {
            id: idx + 1,
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: faker_1.faker.number.int({ min: 10, max: 1000 }),
        };
    });
};
exports.generateProducts = generateProducts;
