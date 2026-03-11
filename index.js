
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://atikur_rahaman:16nov2025safEEr@recipebookserver.ef8t2ty.mongodb.net/?appName=recipeBookServer";
const cors = require('cors');
// Setting up with express js
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");



    // Insert a single document into the "recipes" collection in the "recipeBook" database
    const myDB = client.db("myDB");
    const myColl = myDB.collection("pizzaMenu");
    app.post("/addPizza", async (req, res) => {
      const newPizza = req.body;
      const result = await myColl.insertOne(newPizza);
      res.send(result);
    })


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
