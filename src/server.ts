import express, { query } from "express";
import { generateProducts } from "../data/fakeData";
import { IProduct } from "./interfaces";

const app = express();
const products = generateProducts(); // Add parentheses to call the function

app.get("/", (req, res) => {
  res.send("hallo world");
});

app.get("/product",(req,res)=>{
  res.send(products)
const Params = req.query
 const filter =
 
console.log(Params)
})

// find by params 
app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product : IProduct | undefined = products.find(p => p.id === productId);
  if (product) {
    res.send({id: productId , name:product.name , description:product.description , price:product.price});
  } else {
    res.status(404).send("Product not found");
  }
})



// find py query params 


app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000/");
});