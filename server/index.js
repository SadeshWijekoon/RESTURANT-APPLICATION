const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
