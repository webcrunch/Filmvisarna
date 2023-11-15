import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.normalize(__dirname.split("src")[0]);

const app = express();
// import mysql from "mysql";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 5000;

const getPath = file => path.normalize(path.join(rootPath, 'public', 'json', file));

app.get("/api/hello", (req, res) => {
  res.status(200).json(true);
});

app.post("/api/handle_bookings", async (req, res) => {
  let bookings = await fs.readFile(getPath('bookings.json'), 'utf8');
  bookings = JSON.parse(bookings);
  bookings.push(req.body)
  const writingStatus = await fs.writeFile(getPath('bookings.json'), JSON.stringify(bookings, null, 2));
  !writingStatus ? res.status(200).json({status: "confimed"}) : res.status(400).json(writingStatus);
});

app.post("/api/handle_booking/:id", async (req, res) => {
  let bookings = await fs.readFile(getPath('bookings.json'), 'utf8');
  bookings = JSON.parse(bookings);
  let booking = bookings.find(book => book.id === req.params.id)
  let updateObj = Object.assign(booking, req.body)
  const writingStatus = await fs.writeFile(getPath('bookings.json'), JSON.stringify(bookings, null, 2));
  !writingStatus ? res.status(200).json({status: "updated"}) : res.status(400).json(writingStatus); 
});

app.get('/api/bookings_informations', async (req, res) => {
  let bookings = await fs.readFile(getPath('bookings.json'), 'utf8');
  bookings = JSON.parse(bookings);
  res.status(200).json(bookings);
})

app.get("/api/bookings_information/:id", async (req, res) => {
  let bookings = await fs.readFile(getPath('bookings.json'), 'utf8');
  bookings = JSON.parse(bookings);
  res.status(200).json(bookings.find(b => b.id == req.params.id ));
});


app.get('/api/movies', async (req, res) => {
  let movies = await fs.readFile(getPath('movies.json'), 'utf8');
  movies = JSON.parse(movies);
  res.status(200).json(movies);
})

app.post('/api/book', async (req, res) => {
  let screenings = await fs.readFile(getPath('screening.json'), 'utf8');
  screenings = JSON.parse(screenings);
  screenings.forEach(screen => {
    if (screen.id === req.body.id) {
      screen.occupiedSeats = req.body.bookedArray;
    }
  });
  const writingStatus = await fs.writeFile(getPath('screening.json'), JSON.stringify(screenings, null, 2));
  res.status(200).json({ data: screenings, message: "places booked" });
})

app.get('/api/saloons', async (req, res) => {
  let saloons = await fs.readFile(getPath('saloons.json'), 'utf8');
  saloons = JSON.parse(saloons);
  res.status(200).json(saloons);
})

app.get('/api/screenings', async (req, res) => {
  let screenings = await fs.readFile(getPath('screening.json'), 'utf8');
  screenings = JSON.parse(screenings);
  res.status(200).json(screenings);
})

app.get('/api/movie/:id', async (req, res) => {
  res.status(200).json(req.params.id);
} )

app.get('/api/users', async(req, res) => {
  let users = await fs.readFile(getPath('users.json'), 'utf8');
  users = JSON.parse(users);
  res.status(200).json(users);
})

app.get('/api/user/:id', async (req, res) => {
  let id = Number(req.params.id);
  let users = await fs.readFile(getPath('users.json'), 'utf8');
  users = JSON.parse(users);
  let user = users.users.filter(user => user.id === id);
  res.status(200).json(user[0]);
})

app.post('/api/userbooking', async (req, res) => {
  let users = await fs.readFile(getPath('users.json'), 'utf8');
  users = JSON.parse(users);
  users.users.forEach(user => {
    if (user.id === req.body.id) {
      user.bookings.push(req.body.booking)
    }
  })
  const writingStatus = await fs.writeFile(getPath('users.json'), JSON.stringify(users, null, 2));
  !writingStatus ? res.status(200).json({status: `movie booked`, data: users}) : res.status(400).json(writingStatus);
});

// register a new user. 
app.post('/api/register', async (req, res) => {
  let users = await fs.readFile(getPath('users.json'), 'utf8');
  users = JSON.parse(users);
  users.users.push(req.body);
  const writingStatus = await fs.writeFile(getPath('users.json'), JSON.stringify(users, null, 2));
  !writingStatus ? res.status(200).json({status: `user: ${req.body.username} registered`, data: users}) : res.status(400).json(writingStatus);
})

app.listen(PORT, () =>
  console.log("Express server listening on http port: " + PORT)
);
