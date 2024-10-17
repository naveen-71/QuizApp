const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',        // Your database host
  user: 'root',    // Your database username
  password: 'naveen71', // Your database password
  database: 'quiz_db',      // Your database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = db; // Export the db connection
