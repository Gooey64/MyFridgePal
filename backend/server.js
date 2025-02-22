const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser:HkL67mVXTSwL7jki@myfridgepal.ngs96.mongodb.net/?retryWrites=true&w=majority&appName=MyFridgePal";

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
    
    const database = client.db("MyFridgePal");
    const usersCollection = database.collection("Users");

    //TODO: remove
    //this just tests that we can add new users
    const newUser = {
      username: "HelloWorld",
      password: "12345678",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    console.log(`Added new user with ID: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);