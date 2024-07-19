
import { generateProducts } from "../data";
import { IAdd, IProduct } from "interface";

const fakeData = generateProducts()
export class ProductServices{


    constructor(private products : IProduct[]){
        this.products = products;

    }

    findAll():IProduct[]{
        return this.products
    }

    // get data by using quary params 
    filterdByQuary(filterQuery?:string){
       

  if(filterQuery){
    const propertisToFilter = filterQuery.split(",")
    let filterProduct = [];
    filterProduct =  this.findAll().map(product =>{
      const filteredProduct: any = {};

       propertisToFilter.forEach(property=>{
         if(product.hasOwnProperty(property as keyof typeof product)){
            filteredProduct[property]=product[property as keyof typeof product]
         }
       })
       return { id: product.id, ...filteredProduct };
    })
    return filterProduct

  }else{
    return this.findAll()
  }
    }

    // git product py id 
    findById(productId?:number){
  if(productId){
    const product = this.findAll().find(product=> product.id == productId)
   return product
  }

    }

    // post new product 
    addProduct(productBody:IAdd){
     
        return  this.findAll().push({id:this.findAll().length + 1, ...productBody})
    }

    updateProductByIndex(index:number,productBody:IAdd){
   return   this.findAll()[index] = {...this.findAll()[index],...productBody}
    }
    deleteProductByIndex(index:number,s){
        this.findAll().splice(index,1)
    }

}