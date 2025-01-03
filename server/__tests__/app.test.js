const request = require('supertest');
const app = require('../index');

// Test for the root route
describe('GET /', () => {
    it('should return "Server is running!"', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Server is running!');
    });
});
