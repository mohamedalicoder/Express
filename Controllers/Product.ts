import { Request, Response } from "express";

import { ProductServices } from "services/ProductServices";
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
        const productBody =req.body

         this.productService.addProduct(productBody);
        res.status(200).send({
            id: this.productService.findAll().length+1,
            name: productBody.productName,
            description: productBody.productDescription,
            price: +productBody.productPrice,
        })
        res.redirect('/')

    }

    updateProduct(req:Request , res:Response){
        const productId = +req.params.id
        const productIndex: number | undefined = this.productService.findAll().findIndex(product=>product.id === productId)
      const productBody = req.body
      if(productIndex !== -1){
        this.productService.updateProductByIndex(productIndex,productBody)
        return res.status(200).send({
            massage:"product has been updated"
        })
        } else {
            return res.status(404).send("Product not found")
            
      }
    }
    // delete product by id
    deleteProduct(req:Request , res:Response){
        const productId = +req.params.id
        if(isNaN(productId)){
          return res.status(400).send('Invalid product id');  
        }
        const productIndex = this.productService.findAll().findIndex(product=> product.id == productId)
        if(productIndex === -1){
          return res.status(404).send('Product not found');
        }
        this.productService.deleteProductByIndex(productIndex,1)
        res.send(this.productService.findAll());
}


}
