const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const uri = process.env.MONGODB_URI;
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require('path');

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

/*Connect to database*/ 
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

/*Create a session to store username information*/ 
app.use(session({
  secret: "xfk091nrbufpeghe235slw6oisl", // Change this to a strong, random string
  resave: false, // Don't save if nothing changed
  saveUninitialized: false, // Don't create session until something is stored
  store: MongoStore.create({
      mongoUrl: uri, // Your MongoDB connection
      collectionName: "sessions" // (optional) Name of the session collection
  }),
  cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevents access from JavaScript (more secure)
      maxAge: 1000 * 60 * 60 * 24 // Session lasts for 1 day
  }
}));

app.use(express.static(path.join(__dirname, '../Frontend')));

/*Direct you to the login page*/ 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'login.html'));
});

/*Sign up*/ 
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

/*Log in*/ 
app.post("/login", cors({
  origin: "https://salty-island-68864-4dea84da182c.herokuapp.com",
  credentials: true,
}),

async (req, res) => {
  console.log("Login request received");
  const { username, password } = req.body;

  const db = app.locals.db;
  const usersCollection = db.collection("Users");
  
  const existingUser = await usersCollection.findOne({ username });

  if (!existingUser) {
    console.log("No account exists with that username");
    return res.json({ success: false, message: "No account exists with that username." });
  }

  if (existingUser.password !== password) {
    return res.json({ success: false, message: "Incorrect password." });
  }

  req.session.user = { username: existingUser.username, id: existingUser._id};
  console.log("Session set:", req.session);
  return res.json({ success: true, message: "Successful Login" });
});

/*Retrieve username*/ 
app.get("/getUser", (req, res) => {
  console.log('Session:', req.session);
  if (req.session.user) {
    res.json({ username: req.session.user.username });
  } else {
    res.json({ username: null });
  }
});

/*Add food*/
app.post("/addFood", async (req, res) => {
  const {foodName, purchaseDate, openedDate, expirDate, fridgeNum, username} = req.body;

  const db = app.locals.db;
  const foodsCollection = db.collection("Foods");

  const newFood = { foodName, purchaseDate, openedDate, expirDate, fridgeNum, username, createdAt: new Date()};

  try {
    const result = await foodsCollection.insertOne(newFood);
    res.json({success: true, message: `Food inserted with ID: ${result.insertedId}`});
  } catch (error) {
    res.status(500).json({success: false, message: "Error adding food"});
  }
});

/*Retrieve foods TODO: Complete (retrieve foods from database)*/
app.post("/retrieveFoods", async (req, res) => {
  const {username} = req.body;

  const db = app.locals.db;
  const foodsCollection = db.collection("Foods");

  const userFoods = [foodsCollection.find(username)];

  try {
    res.json({userFoods});
  } catch (error) {
    res.status(500).json({success: false, message: "Error retrieving foods"});
  }
});

/*Remove food TODO: Complete (there may be a bug where you delete a food with the same information and all those foods get deleted)*/
app.post("/deleteFood", async (req, res) => {
  const {foodName, purchaseDate, openedDate, expirDate, fridgeNum, username} = req.body;
  
  try {
  const db = app.locals.db;
  const foodsCollection = db.collection("Foods");

  const existingFood = await foodsCollection.findOne({ foodName, purchaseDate, openedDate, expirDate, fridgeNum, username });
  if (!existingFood) {
    return res.status(404).json({ success: false, message: "Food item not found" });
  }

  // Delete the found food item
  const result = await foodsCollection.deleteOne({ _id: existingFood._id });
    if (result.deletedCount === 1) {
      res.json({ success: true, message: "Food item deleted successfully" });
      console.log("Deleted food item.");
    } else {
      res.status(500).json({ success: false, message: "Failed to delete food item" });
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({success: false, message: "Error deleting food"});
  }
});

/*Retrieve fridges TODO: Complete*/
app.post("/getFridges", async (req, res) => {
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

// app.get("/profile", (req, res) => {
//   if (!req.session.user) {
//       return res.status(401).json({ message: "Not logged in" });
//   }
//   res.json({ user: req.session.user });
// });

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