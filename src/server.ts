import express from "express";
import { generateProducts } from "../data/fakeData";

const app = express();
const products = generateProducts();


app.get("/",(req,res)=>{
  res.send("hallo world")
})
app.get("/product", (req, res) => {
   res.send(products)
    
});


app.get("/product/:id", (req, res) => {
  
     const productId = parseInt(req.params.id);
      const product   = products.find(p => p.id === productId)
      if (product) {
        res.send(products);
      } else {
        res.status(404).send("Product not found");
      }
})

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000/");
});
