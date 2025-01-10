const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const userRoutes = require('./routes/users');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use('/api', userRoutes);

// MySQL connection
const db = mysql.createConnection({
    host: "%",
    user: "kochela",
    password: "4307",
    database: "user_db"
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });
  

// Example route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Serve static files (HTML)
app.use(express.static('public'));

// Serve index.html on the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
