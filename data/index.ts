import { faker } from '@faker-js/faker';
import { IProduct } from 'interface';


export const generateProducts = () : IProduct[] =>{
    return Array.from({length:30},(_,idx)=>{
        return{
        id: idx+1,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({min:10, max:1000}),

        }   
    })
}