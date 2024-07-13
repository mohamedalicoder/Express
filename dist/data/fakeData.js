"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProducts = void 0;
const faker_1 = require("@faker-js/faker");
const generateProducts = () => {
    return Array.from({ length: 125 }, (_, idx) => {
        return {
            id: idx + 1,
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: +faker_1.faker.datatype.number({ min: 10, max: 1000 }),
        };
    });
};
exports.generateProducts = generateProducts;
