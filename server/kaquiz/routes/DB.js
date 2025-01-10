const pool = require('../database');

exports.someRoute = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).send('Database error');
      return;
    }
    
    connection.query('SELECT * FROM users', (err, results) => {
      connection.release(); // Release the connection back to the pool
      if (err) {
        res.status(500).send('Database error');
        return;
      }
      
      res.json(results);
    });
  });
};
