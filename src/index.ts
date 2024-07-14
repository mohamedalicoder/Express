import express from 'express';
import { Request, Response } from 'express';
import {  generateProducts } from './data/index';
import { IProduct } from './interface';


const app = express();
const fakeData = generateProducts()



// get all product 
app.get("/all",(req,res)=>{
  res.send(fakeData);
})






// git product py id 
app.get('/product/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  
  const products = fakeData.find(p=>{
    return p.id === productId;

  })
  if(products){
    res.send(products);
  }
  else{
    res.status(404).send('Product not found');
  }
});



// get data by using quary params 

// Define a GET route for /product
app.get("/product", (req: Request, res: Response) => {
  // Extract the 'filter' query parameter from the request
  const filterQuery = req.query.filter as string;

  // Check if there is a filter query
  if (filterQuery) {
    // Split the filter query into an array of properties to filter by
    const propertiesToFilter = filterQuery.split(",");

    // Initialize an array to hold the filtered products
    let filterProduct = [];

    // Iterate over the fake data to filter the products
    filterProduct = fakeData.map(product => {
      // Create an empty object to hold the filtered product properties
      const filteredProduct: any = {};

      // Iterate over the properties to filter by
      propertiesToFilter.forEach(property => {
        // Check if the product has the current property
        if (product.hasOwnProperty(property as keyof typeof product)) {
          // Add the property to the filtered product
          filteredProduct[property] = product[property as keyof typeof product];
        }
      });

      // Return the filtered product with its id
      return { id: product.id, ...filteredProduct };
    });

    // Send the filtered products as the response
    res.send(filterProduct);
  } else {
    // If no filter query, send all the fake data as the response
    res.send(fakeData);
  }
});

// Start the server on port 3000

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});