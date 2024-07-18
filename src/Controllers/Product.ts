import { Request } from "express";
import { IProduct } from "src/interface";
import { ProductServices } from "src/services/ProductServices";

export class ProductController{

    constructor(private productService :ProductServices ){}
    getAllProducts(req:Request):IProduct[]{
        const filterQuery = req.query.filter as string;
        if(filterQuery){
            return this.productService.filterdByQuary(filterQuery);
        }
        return this.productService.findAll();
    }
}

