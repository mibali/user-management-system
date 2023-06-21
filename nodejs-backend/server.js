const express = require('express');
const app = express();
const port = 3001; // Choose your desired port number
const { Pool } = require('pg');

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user-db',
  password: 'bali',
  port: 5432, // Modify if necessary
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the User Management App');
  });

// Create a user
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
