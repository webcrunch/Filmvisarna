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

// register a new user. 
app.post('/api/register', async (req, res) => {
  let users = await fs.readFile(getPath('users.json'), 'utf8');
  users = JSON.parse(users);
  users.push(req.body);
  const writingStatus = await fs.writeFile(getPath('users.json'), JSON.stringify(users, null, 2));
  !writingStatus ? res.status(200).json({status: `user: ${req.body.username} registered`, data: users}) : res.status(400).json(writingStatus);
})

app.listen(PORT, () =>
  console.log("Express server listening on http port: " + PORT)
);
