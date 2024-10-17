const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Change this line to use port 5000

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/quiz', quizRoutes);

// Start Server
app.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);
});
