require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
console.log(process.env.DB_USER,process.env.DB_PASSWORD);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@recipebookserver.ef8t2ty.mongodb.net/?appName=recipeBookServer`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true
});

async function run() {
  try {
    // await client.connect();

    const myDB = client.db("myDB");
    const myColl = myDB.collection("myRecipes");

    // console.log("Connected to MongoDB!");

    app.get("/", (req, res) => {
      res.send("Welcome to the Pizza Menu API");
    });

    app.post("/addRecipe", async (req, res) => {
      const result = await myColl.insertOne(req.body);
      res.send(result);
    });

    app.get("/allRecipes", async (req, res) => {
      const result = await myColl.find().toArray();
      res.send(result);
    });

    app.listen(port, () => {
      // console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Connection error:", error);
  }
}

run();