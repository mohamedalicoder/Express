import { IProduct } from "src/interface";
import { ProductServices } from "src/services/ProductServices";

export class ProductController{

    constructor(private productService :ProductServices ){}
    getAllProducts(){

        return this.productService.findAll();
    }
}

