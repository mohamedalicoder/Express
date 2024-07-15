import express from 'express';
import { Request, Response } from 'express';
import {  generateProducts } from './data/index';
import { IProduct } from './interface';
import bodyParser from 'body-parser';






const app = express();


app.use(express.static('public'));  // use public folder for static files
// Set EJS as the templating engine

app.set('view engine', 'ejs');
app.set('views', './views');





const fakeData = generateProducts()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// get all product 
app.get("/all",(req,res)=>{
  res.send(fakeData);
})






// git product py id 
app.get("/products/:id",(req,res)=>{
  const productId = +req.params.id

  if(isNaN(productId)){
    res.status(400).send("Invalid product id")
  }

  if(productId){
    const product = fakeData.find(product=> product.id == productId)
    res.send(product)
  }
  else{
    res.status(404).send("product not found")
  }



})



// get data by using quary params 
app.get("/products",(req,res)=>{
  const filterQuery = req.query.filter as string;

  if(filterQuery){
    const propertisToFilter = filterQuery.split(",")
    let filterProduct = [];
    filterProduct =  fakeData.map(product =>{
      const filteredProduct: any = {};

       propertisToFilter.forEach(property=>{
         if(product.hasOwnProperty(property as keyof typeof product)){
            filteredProduct[property]=product[property as keyof typeof product]
         }
       })
       return { id: product.id, ...filteredProduct };
    })
    res.send(filterProduct)

  }else{
    res.send(fakeData)
  }
})

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


app.get("/",(req,res)=>{
 
  res.render('index',{products: fakeData});
})

// add product 

app.post("/add-product",(req,res)=>{
  const requstes =req.body
  const newProduct = {
    id: fakeData.length+1,
    name: requstes.productName,
    description: requstes.productDescription,
    price: +requstes.productPrice,
  }
  fakeData.push(newProduct)
  res.redirect('/')
})

// update product
app.patch("/update/:id",(req,res)=>{
  const productId = +req.params.id
  if(isNaN(productId)){
    return res.status(400).send('Invalid product id');  
  }
  const reqs = req.body
  const productIndex = fakeData.findIndex(product=> product.id == productId)
  if(productIndex === -1){
    return res.status(404).send('Product not found');
  }
  fakeData[productIndex] = {...fakeData[productIndex],...reqs}
  res.send(fakeData[productIndex]);

})



// delete product
app.delete("/delete/:id",(req,res)=>{
  const productId = +req.params.id
  if(isNaN(productId)){
    return res.status(400).send('Invalid product id');  
  }
  const productIndex = fakeData.findIndex(product=> product.id == productId)
  if(productIndex === -1){
    return res.status(404).send('Product not found');
  }
  fakeData.splice(productIndex,1)
  res.send(fakeData);
  })




// Start the server on port 3000

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});