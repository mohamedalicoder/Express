"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProducts = void 0;
const faker_1 = require("@faker-js/faker");
const generateProducts = () => {
    return Array.from({ length: 25 }, (_, idx) => {
        return {
            id: idx + 1,
            name: faker_1.faker.commerce.productName(),
        };
    });
};
exports.generateProducts = generateProducts;
