const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://atikur_rahaman:16nov2025safEEr@recipebookserver.ef8t2ty.mongodb.net/?appName=recipeBookServer";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect once when the server starts 
    await client.connect();
    const myDB = client.db("myDB");
    const myColl = myDB.collection("pizzaMenu");

    console.log("Connected to MongoDB!");

    // Route definition [cite: 7, 24]
    app.get("/", (req, res) => {
      res.send("Welcome to the Pizza Menu API");
    });

    app.post("/addPizza", async (req, res) => {
      const newPizza = req.body;
      const result = await myColl.insertOne(newPizza);
      res.send(result);
    });

    // Start the Express server inside the try block
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Connection error:", error);
  } 
  // REMOVED: The finally { client.close() } block. 
  // In a web server, we want the connection to stay open.
}

run().catch(console.dir);