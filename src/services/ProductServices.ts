
import { generateProducts } from "../data";
import { IProduct } from "src/interface";

const fakeData = generateProducts()
export class ProductServices{


    constructor(private products : IProduct[]){
        this.products = products;

    }

    findAll():IProduct[]{
        return this.products
    }
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

}