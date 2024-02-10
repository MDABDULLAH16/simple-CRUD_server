const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// mdabdullah161036;
// vkQEzEBZIsUOTyuk

const uri =
  "mongodb+srv://mdabdullah161036:vkQEzEBZIsUOTyuk@cluster0.fszas7w.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//fist running server on localhost:5000;
app.get("/", (req, res) => {
  res.send("SIMPLE CURD SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log("curd is running port", port);
});