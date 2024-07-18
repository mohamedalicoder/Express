import express from 'express';
import { Request, Response } from 'express';
import {  generateProducts } from './data/index';
import { IProduct } from './interface';
import bodyParser from 'body-parser';
import { ProductController } from './Controllers/Product';
import { ProductServices } from './services/ProductServices';






const app = express();


app.use(express.static('public'));  // use public folder for static files
// Set EJS as the templating engine

app.set('view engine', 'ejs');
app.set('views', './views');





const fakeData = generateProducts()
const productServices = new ProductServices(fakeData)
const productController = new ProductController(productServices)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// get all product 
app.get("/all",(req,res)=>  res.send(productController.getAllProducts(req)))






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
app.get("/products",(req,res)=>res.send(productController.getAllProducts(req)))




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


//dlkkdjlkjdklj
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