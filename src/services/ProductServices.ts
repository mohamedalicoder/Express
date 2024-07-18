
import { generateProducts } from "../data";
import { IProduct } from "src/interface";

const fakeData = generateProducts()
export class ProductServices{
    private readonly products:IProduct[] = fakeData

    findAll(){
        return this.products
    }

}