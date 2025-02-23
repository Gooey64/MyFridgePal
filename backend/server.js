const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const uri = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(express.json());
app.use(cors({
  origin: ["https://salty-island-68864-4dea84da182c.herokuapp.com",
           'http://localhost:3000'],
  methods: "GET, POST",
  allowedHeaders: ["Content-Type"],
  credentials: true
}));


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

app.use(session({
  secret: "xfk091nrbufpeghe235slw6oisl", // Change this to a strong, random string
  resave: false, // Don't save if nothing changed
  saveUninitialized: false, // Don't create session until something is stored
  store: MongoStore.create({
      mongoUrl: uri, // Your MongoDB connection
      collectionName: "sessions" // (optional) Name of the session collection
  }),
  cookie: {
      secure: true, // Set to true if using HTTPS
      httpOnly: true, // Prevents access from JavaScript (more secure)
      maxAge: 1000 * 60 * 60 * 24 // Session lasts for 1 day
  }
}));

app.get('/', (req, res) => {
  res.send('Welcome to My Website!');
});

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

app.post("/login", cors({
  origin: "https://salty-island-68864-4dea84da182c.herokuapp.com",
  credentials: true,
}),

async (req, res) => {
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

  req.session.user = { username: existingUser.username, id: existingUser._id};
  return res.json({ success: true, message: "Successful Login" });
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
      return res.status(401).json({ message: "Not logged in" });
  }
  res.json({ user: req.session.user });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
  });
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