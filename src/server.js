/*--------LOCAL BACKEND START-----------*/
/* import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.normalize(__dirname.split("src")[0]);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

const getPath = file => path.join(rootPath, 'public', 'json', file);

// Utility function to read JSON files
const readJsonFile = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

// Utility function to write JSON files
const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};


app.get("/", (req, res) => {
  res.send("Welcome to the Filmvisarna API");
});

// API Endpoints
app.get("/api/hello", (req, res) => {
  res.status(200).json(true);
});

app.post("/api/handle_bookings", async (req, res) => {
  const filePath = getPath('bookings.json');
  const bookings = await readJsonFile(filePath);
  bookings.push(req.body);
  await writeJsonFile(filePath, bookings);
  res.status(200).json({ status: "confirmed" });
});

app.post("/api/handle_booking/:id", async (req, res) => {
  const filePath = getPath('bookings.json');
  const bookings = await readJsonFile(filePath);
  const booking = bookings.find(book => book.id === req.params.id);
  Object.assign(booking, req.body);
  await writeJsonFile(filePath, bookings);
  res.status(200).json({ status: "updated" });
});

app.get('/api/bookings_informations', async (req, res) => {
  const bookings = await readJsonFile(getPath('bookings.json'));
  res.status(200).json(bookings);
});

app.get("/api/bookings_information/:id", async (req, res) => {
  const bookings = await readJsonFile(getPath('bookings.json'));
  res.status(200).json(bookings.find(b => b.id == req.params.id));
});

app.get('/api/movies', async (req, res) => {
  const movies = await readJsonFile(getPath('movies.json'));
  res.status(200).json(movies);
});

app.post('/api/book', async (req, res) => {
  const filePath = getPath('screening.json');
  const screenings = await readJsonFile(filePath);
  screenings.forEach(screen => {
    if (screen.id === req.body.id) {
      screen.occupiedSeats = req.body.bookedArray;
    }
  });
  await writeJsonFile(filePath, screenings);
  res.status(200).json({ data: screenings, message: "places booked" });
});

app.get('/api/saloons', async (req, res) => {
  const saloons = await readJsonFile(getPath('saloons.json'));
  res.status(200).json(saloons);
});

app.get('/api/screenings', async (req, res) => {
  const screenings = await readJsonFile(getPath('screening.json'));
  res.status(200).json(screenings);
});

app.get('/api/movie/:id', (req, res) => {
  res.status(200).json(req.params.id);
});

app.get('/api/users', async (req, res) => {
  const users = await readJsonFile(getPath('users.json'));
  res.status(200).json(users);
});

app.get('/api/user/:id', async (req, res) => {
  const users = await readJsonFile(getPath('users.json'));
  const user = users.users.find(user => user.id === Number(req.params.id));
  res.status(200).json(user);
});

app.post('/api/userbooking', async (req, res) => {
  const filePath = getPath('users.json');
  const users = await readJsonFile(filePath);
  const user = users.users.find(user => user.id === req.body.id);
  user.bookings.push(req.body.booking);
  await writeJsonFile(filePath, users);
  res.status(200).json({ status: "movie booked", data: users });
});

app.post('/api/register', async (req, res) => {
  const filePath = getPath('users.json');
  const users = await readJsonFile(filePath);
  users.users.push(req.body);
  await writeJsonFile(filePath, users);
  res.status(200).json({ status: `user: ${req.body.username} registered`, data: users });
});

app.listen(PORT, () => console.log(`Express server listening on http port: ${PORT}`));
 */
/*--------LOCAL BACKEND END-----------*/


/*----------VERCEL BACKEND START--------------*/

/*import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs/promises';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.normalize(__dirname.split("src")[0]);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Handle CORS issues

const PORT = process.env.PORT || 5000;

 const getPath = file => path.join(rootPath, 'public', 'json', file); 
/*const getPath = file => path.join(__dirname, 'public', 'json', file); */

// Utility function to read JSON files
/*const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
};

// Utility function to write JSON files
const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing JSON file at ${filePath}:`, error);
    throw error;
  }
};

// Serve a simple response for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Filmvisarna API");
});

app.get("/testtest", (req, res) => {
  res.send("Detta var test för att se om det fungerar");
});

// API Endpoints without /api prefix
app.get("/hello", (req, res) => {
  res.status(200).json(true);
});

app.post("/handle_bookings", async (req, res) => {
  try {
    const filePath = getPath('bookings.json');
    const bookings = await readJsonFile(filePath);
    bookings.push(req.body);
    await writeJsonFile(filePath, bookings);
    res.status(200).json({ status: "confirmed" });
  } catch (error) {
    console.error("Error handling bookings:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.post("/handle_booking/:id", async (req, res) => {
  const filePath = getPath('bookings.json');
  const bookings = await readJsonFile(filePath);
  const booking = bookings.find(book => book.id === req.params.id);
  Object.assign(booking, req.body);
  await writeJsonFile(filePath, bookings);
  res.status(200).json({ status: "updated" });
});

app.get('/bookings_informations', async (req, res) => {
  const bookings = await readJsonFile(getPath('bookings.json'));
  res.status(200).json(bookings);
});

app.get("/bookings_information/:id", async (req, res) => {
  const bookings = await readJsonFile(getPath('bookings.json'));
  res.status(200).json(bookings.find(b => b.id == req.params.id));
});

app.get('/movies', async (req, res) => {
  try {
    const filePath = getPath('movies.json');
    console.log(`Reading movies from ${filePath}`);
    const movies = await readJsonFile(filePath);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post('/book', async (req, res) => {
  const filePath = getPath('screening.json');
  const screenings = await readJsonFile(filePath);
  screenings.forEach(screen => {
    if (screen.id === req.body.id) {
      screen.occupiedSeats = req.body.bookedArray;
    }
  });
  await writeJsonFile(filePath, screenings);
  res.status(200).json({ data: screenings, message: "places booked" });
});

app.get('/saloons', async (req, res) => {
  const saloons = await readJsonFile(getPath('saloons.json'));
  res.status(200).json(saloons);
});

app.get('/screenings', async (req, res) => {
  const screenings = await readJsonFile(getPath('screening.json'));
  res.status(200).json(screenings);
});

app.get('/movie/:id', (req, res) => {
  res.status(200).json(req.params.id);
});

app.get('/users', async (req, res) => {
  const users = await readJsonFile(getPath('users.json'));
  res.status(200).json(users);
});

app.get('/user/:id', async (req, res) => {
  const users = await readJsonFile(getPath('users.json'));
  const user = users.users.find(user => user.id === Number(req.params.id));
  res.status(200).json(user);
});

app.post('/userbooking', async (req, res) => {
  const filePath = getPath('users.json');
  const users = await readJsonFile(filePath);
  const user = users.users.find(user => user.id === req.body.id);
  user.bookings.push(req.body.booking);
  await writeJsonFile(filePath, users);
  res.status(200).json({ status: "movie booked", data: users });
});

app.post('/register', async (req, res) => {
  const filePath = getPath('users.json');
  const users = await readJsonFile(filePath);
  users.users.push(req.body);
  await writeJsonFile(filePath, users);
  res.status(200).json({ status: `user: ${req.body.username} registered`, data: users });
});

app.listen(PORT, () => console.log(`Express server listening on http port: ${PORT}`)); 

/--------*VERCEL BACKEND END--------*/


import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Handle CORS issues

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDatabase = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db("filmvisarna");
};

// Serve a simple response for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Filmvisarna API");
});

app.get("/testtest", (req, res) => {
  res.send("Detta var test för att se om det fungerar");
});

// API Endpoints without /api prefix
app.get("/hello", (req, res) => {
  res.status(200).json(true);
});

app.post("/handle_bookings", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bookingsCollection = db.collection("bookings");
    await bookingsCollection.insertOne(req.body);
    res.status(200).json({ status: "confirmed" });
  } catch (error) {
    console.error("Error handling bookings:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.post("/handle_booking/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bookingsCollection = db.collection("bookings");
    await bookingsCollection.updateOne({ id: req.params.id }, { $set: req.body });
    res.status(200).json({ status: "updated" });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get('/bookings_informations', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bookingsCollection = db.collection("bookings");
    const bookings = await bookingsCollection.find({}).toArray();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get("/bookings_information/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bookingsCollection = db.collection("bookings");
    const booking = await bookingsCollection.findOne({ id: req.params.id });
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const moviesCollection = db.collection("movies");
    const movies = await moviesCollection.find({}).toArray();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post('/book', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const screeningsCollection = db.collection("screenings");
    await screeningsCollection.updateOne({ id: req.body.id }, { $set: { occupiedSeats: req.body.bookedArray } });
    const screenings = await screeningsCollection.find({}).toArray();
    res.status(200).json({ data: screenings, message: "places booked" });
  } catch (error) {
    console.error("Error booking places:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get('/saloons', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const saloonsCollection = db.collection("saloons");
    const saloons = await saloonsCollection.find({}).toArray();
    res.status(200).json(saloons);
  } catch (error) {
    console.error("Error fetching saloons:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get('/screenings', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const screeningsCollection = db.collection("screenings");
    const screenings = await screeningsCollection.find({}).toArray();
    res.status(200).json(screenings);
  } catch (error) {
    console.error("Error fetching screenings:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get('/movie/:id', (req, res) => {
  res.status(200).json(req.params.id);
});

app.get('/users', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ id: Number(req.params.id) });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.post('/userbooking', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    await usersCollection.updateOne({ id: req.body.id }, { $push: { bookings: req.body.booking } });
    const users = await usersCollection.find({}).toArray();
    res.status(200).json({ status: "movie booked", data: users });
  } catch (error) {
    console.error("Error booking movie:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    await usersCollection.insertOne(req.body);
    const users = await usersCollection.find({}).toArray();
    res.status(200).json({ status: `user: ${req.body.username} registered`, data: users });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Express server listening on http port: ${PORT}`));

export default app; // Export for Vercel