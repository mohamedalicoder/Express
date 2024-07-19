import { Request, Response } from "express";

import { ProductServices } from "src/services/ProductServices";
import { IProduct } from './../interface/index';

export class ProductController{

    constructor(private productService :ProductServices ){}

    // get data by using quary params   
    getAllProducts(req:Request):IProduct[]{
        const filterQuery = req.query.filter as string;
        if(filterQuery){
            return this.productService.filterdByQuary(filterQuery);
        }
        return this.productService.findAll();
    }
   

    // git product py id 
    getProductById(req:Request,res:Response){
        const productId = +req.params.id;
        if(isNaN(productId)){
            res.status(404).send("Invalid product id")
          } 
          const product: IProduct | undefined = this.productService.findById(productId)
          if(product){
              res.send(product)
          } else {
              res.status(404).send("Product not found")
          }
    }

    // add product 
    addNewProduct(req:Request , res:Response){
        const requstes =req.body
        const newProduct = this.productService.addProduct(requstes);
        res.redirect('/')

    }
}

