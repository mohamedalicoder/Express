import express from 'express';
import { Request, Response } from 'express';
import {  generateProducts } from './data/index';
import { IProduct } from './interface';
import bodyParser from 'body-parser';
import { ProductController } from './Controllers/Product';
import { ProductServices } from './services/ProductServices';
import path from 'path';






const app = express();


app.use(express.static('public'));  // use public folder for static files
// Set EJS as the templating engine

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'))






const fakeData = generateProducts()
const productServices = new ProductServices(fakeData)
const productController = new ProductController(productServices)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files 
app.use(express.static('public'));



app.get("/product",(req,res)=>{
  res.render("product")
})
app.get("/",(req,res)=>{
  res.render("index")
})
// get all product 
app.get("/all",(req,res)=>  res.send(productController.getAllProducts(req)))
 
// git product py id 
app.get("/products/:id",(req,res)=>res.send(productController.getProductById(req,res)))

// get data by using quary params 
app.get("/products",(req,res)=>res.send(productController.getAllProducts(req)))

// add product 

app.post("/add-product",(req,res)=>res.send(productController.addNewProduct(req,res)))

// ,v update product
app.patch("/update/:id",(req,res)=> productController.updateProduct(req,res))


//dlkkdjlkjdklj
// delete product
app.delete("/delete/:id",(req,res)=>productController.deleteProduct(req,res))


app.get("*",(req,res)=>{
  res.render("notFound")
})


// Start the server on port 3000

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});