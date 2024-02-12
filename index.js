const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// mdabdullah161036;
// vkQEzEBZIsUOTyuk

// I8TUruRO5GyWdrkY;

const uri =
  "mongodb+srv://mdabdullah161036:I8TUruRO5GyWdrkY@cluster0.ud8aez9.mongodb.net/?retryWrites=true&w=majority";

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

    const userCollection = client.db("userDB").collection("users");

    // const database = client.db("usersDB");
    // const userCollection = database.collection("users");
    //get data from mongoDB
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    //send data to MongoDB
    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await userCollection.insertOne(users);
      res.send(result);
      console.log("get User from client", users);
      console.log(result);
    });
    //delete from db

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log("user delete", id);
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // must comment this close function.
    // await client.close();
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
