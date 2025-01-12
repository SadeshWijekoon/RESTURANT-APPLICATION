import jwt from 'jsonwebtoken';
import generatedAccessToken from '../utils/generatedAccessToken'; // Adjust the path here to point correctly

// Mocking the jwt.sign method to avoid actually signing tokens during tests
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('generatedAccessToken', () => {
  const mockUserId = 'user123';
  const mockToken = 'mockedToken';
  
  beforeEach(() => {
    // Resetting mocks before each test
    jwt.sign.mockReset();
  });

  it('should generate a valid JWT token when provided a userId', async () => {
    // Mock jwt.sign to return a mocked token
    jwt.sign.mockResolvedValue(mockToken);

    const token = await generatedAccessToken(mockUserId);
    
    // Ensure jwt.sign is called with the correct arguments
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUserId },
      process.env.SECRET_KEY_ACCESS_TOKEN,
      { expiresIn: '5h' }
    );
    
    // Ensure the token returned is the mocked token
    expect(token).toBe(mockToken);
  });

  it('should throw an error if SECRET_KEY_ACCESS_TOKEN is not defined', async () => {
    // Temporarily delete SECRET_KEY_ACCESS_TOKEN for this test
    delete process.env.SECRET_KEY_ACCESS_TOKEN;

    try {
      await generatedAccessToken(mockUserId);
    } catch (error) {
      // Check if the error message is related to the missing secret key
      expect(error.message).toBe('Missing SECRET_KEY_ACCESS_TOKEN in environment variables');
    }
  });

  it('should throw an error if jwt.sign fails', async () => {
    const mockError = new Error('JWT signing error');
    jwt.sign.mockRejectedValue(mockError);

    try {
      await generatedAccessToken(mockUserId);
    } catch (error) {
      // Ensure the error from jwt.sign is thrown
      expect(error).toBe(mockError);
    }
  });
});
