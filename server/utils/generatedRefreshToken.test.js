import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import generatedRefreshToken from './generatedRefreshToken.js'; // Adjust the path accordingly

// Mocking jwt.sign and UserModel.updateOne methods
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('../models/user.model.js', () => ({
  updateOne: jest.fn(),
}));

describe('generatedRefreshToken', () => {
  const mockUserId = 'user123';
  const mockToken = 'mockedRefreshToken';
  
  beforeEach(() => {
    // Resetting mocks before each test
    jwt.sign.mockReset();
    UserModel.updateOne.mockReset();
  });

  it('should generate a refresh token and update the user with it', async () => {
    // Mock jwt.sign to return a mocked refresh token
    jwt.sign.mockResolvedValue(mockToken);

    // Mock UserModel.updateOne to return a mocked update result
    UserModel.updateOne.mockResolvedValue({ nModified: 1 });

    // Call the function to test
    const token = await generatedRefreshToken(mockUserId);
    
    // Ensure jwt.sign is called with the correct arguments
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUserId },
      process.env.SECRET_KEY_REFRESH_TOKEN,
      { expiresIn: '7d' }
    );
    
    // Ensure the user was updated with the refresh token
    expect(UserModel.updateOne).toHaveBeenCalledWith(
      { _id: mockUserId },
      { refresh_token: mockToken }
    );
    
    // Ensure the token returned is the mocked token
    expect(token).toBe(mockToken);
  });

  it('should throw an error if SECRET_KEY_REFRESH_TOKEN is not defined', async () => {
    // Temporarily delete SECRET_KEY_REFRESH_TOKEN for this test
    delete process.env.SECRET_KEY_REFRESH_TOKEN;

    try {
      await generatedRefreshToken(mockUserId);
    } catch (error) {
      // Check if the error message is related to the missing secret key
      expect(error.message).toBe('Missing SECRET_KEY_REFRESH_TOKEN in environment variables');
    }
  });

  it('should throw an error if jwt.sign fails', async () => {
    const mockError = new Error('JWT signing error');
    jwt.sign.mockRejectedValue(mockError);

    try {
      await generatedRefreshToken(mockUserId);
    } catch (error) {
      // Ensure the error from jwt.sign is thrown
      expect(error).toBe(mockError);
    }
  });

  it('should throw an error if UserModel.updateOne fails', async () => {
    const mockError = new Error('Database update error');
    jwt.sign.mockResolvedValue(mockToken);
    UserModel.updateOne.mockRejectedValue(mockError);

    try {
      await generatedRefreshToken(mockUserId);
    } catch (error) {
      // Ensure the error from UserModel.updateOne is thrown
      expect(error).toBe(mockError);
    }
  });
});
