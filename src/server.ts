import express from "express";

const app = express();
const product = [{
    id: 1,
    name: "Product 1",
    price: 100,
    description: "This is product 1 description"
},
{
    id: 2,
    name: "Product 2",
    price: 200,
    description: "This is product 2 description"
},
{
    id: 3,
    name: "Product 3",
    price: 300,
    description: "This is product 3 description"
}
]
app.get("/", (req, res) => {
    
const jsonString = JSON.stringify(product);
    res.send(
         jsonString
    );
});

app.get("/product/:id", (req, res) => {
  
     const productId = parseInt(req.params.id);
      const products = product.find(p => p.id === productId)
      if (products) {
        res.send(JSON.stringify(products));
      } else {
        res.status(404).send("Product not found");
      }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
