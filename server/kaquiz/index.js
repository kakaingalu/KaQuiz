const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use('/api', userRoutes);

// Example route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
