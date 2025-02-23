const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const uri = "mongodb+srv://dbUser:HkL67mVXTSwL7jki@myfridgepal.ngs96.mongodb.net/?retryWrites=true&w=majority&appName=MyFridgePal";
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: '*', // Allow requests from front-end port
  methods: "GET, POST",
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("MyFridgePal");
    app.locals.db = database;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

app.post("/signup", async (req, res) => {
  const {username, password } = req.body;

  const db = app.locals.db;
  const usersCollection = db.collection("Users");
  const existingUser = await usersCollection.findOne({ username });

  if (existingUser) { 
    return res.json({ success: false, message: "Username already taken!"});
  }

  const newUser = { username, password, createdAt: new Date()};

  try {
    const result = await usersCollection.insertOne(newUser);
    res.json({success: true, message: `User created with ID: ${result.insertedId}`});
  } catch (error) {
    res.status(500).json({success: false, message: "Error creating user"});
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const db = app.locals.db;
  const usersCollection = db.collection("Users");
  
  const existingUser = await usersCollection.findOne({ username });

  if (!existingUser) { 
    return res.json({ success: false, message: "No account exists with that username." });
  }

  if (existingUser.password !== password) {
    return res.json({ success: false, message: "Incorrect password." });
  }

  return res.json({ success: true, message: "Welcome back!" });
});


process.on('SIGINT', async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

connectDB().then(() => {
  app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
  });
});