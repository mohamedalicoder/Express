import { faker } from '@faker-js/faker';

export const generateProducts = ()=>{
    return Array.from({length:25},(_,idx)=>{
        return{
        id: idx+1,
        name: faker.commerce.productName(),

        }   
    })
}