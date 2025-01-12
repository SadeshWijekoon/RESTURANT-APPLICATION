import request from 'supertest'; // For HTTP testing
import dotenv from 'dotenv'; // Load environment variables
import mongoose from 'mongoose'; // For database connection
import app from '../index.js'; // Import the app directly
import connectDB from '../config/connectDB.js'; // Import your DB connection

dotenv.config(); // Load environment variables from .env

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
        expect(response.body.message).toContain(`Server is running on port ${process.env.PORT || 5000}`); // Check the message content
    });

    it('GET /api/user should return 404 for missing implementation', async () => {
        const response = await request(app).get('/api/user'); // Testing the user route
        expect(response.status).toBe(404); // Ensure the route is not implemented
    });

    it('POST /api/user should return 404 for missing implementation', async () => {
        const response = await request(app).post('/api/user').send({}); // Testing the user route
        expect(response.status).toBe(404); // Ensure the route is not implemented
    });
});

// Optional cleanup after tests
afterAll(async () => {
    console.log('🔄 Cleaning up after tests.');
<<<<<<< HEAD
    // Example: Close DB connection if needed
    await mongoose.connection.close();
});
=======
    await mongoose.connection.close(); // Properly close the database connection
});
>>>>>>> dev
