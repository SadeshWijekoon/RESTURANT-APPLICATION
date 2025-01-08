import request from 'supertest'; // For HTTP testing
import dotenv from 'dotenv';
import connectDB from '../config/connectDB.js'; // Import your DB connection
import express from 'express';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables

// Create a test instance of your app
const app = express();
app.use(express.json());

// Sample route to test
app.get('/', (req, res) => {
    res.json({
        message: `Server is running ${process.env.PORT || 5000}`,
    });
});

// Mock database connection
beforeAll(async () => {
    jest.setTimeout(10000); // Increase timeout for database connection and setup

    try {
        await connectDB();
        console.log('✅ Connected to the test database.');
    } catch (error) {
        console.error('❌ Failed to connect to the test database.', error);
        throw error; // Fail the test if DB connection fails
    }
});

// Test cases for the server
describe('Server Tests', () => {
    it('GET / should return the server status message', async () => {
        const response = await request(app).get('/'); // Make a GET request to "/"
        expect(response.status).toBe(200); // Check HTTP status
        expect(response.body.message).toBeTruthy(); // Ensure the message exists
        expect(response.body.message).toContain('Server is running'); // Check the message content
    });
});

// Optional cleanup after tests
afterAll(async () => {
    console.log('🔄 Cleaning up after tests.');
    // Example: Close DB connection if needed
    await mongoose.connection.close();
});
