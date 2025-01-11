import { v2 as cloudinary } from 'cloudinary';
import uploadImageClodinary from '../utils/uploadImageClodinary'; // Adjust the path as needed

// Mock Cloudinary's uploader.upload_stream method
jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

describe('uploadImageClodinary', () => {
  const mockImageBuffer = Buffer.from('mockImageData');
  const mockImage = {
    buffer: mockImageBuffer,
    arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
  };

  const mockUploadResult = {
    url: 'https://example.com/image.jpg',
    secure_url: 'https://secure.example.com/image.jpg',
  };

  beforeEach(() => {
    // Reset mocks before each test
    cloudinary.uploader.upload_stream.mockReset();
  });

  it('should upload an image and return the upload result', async () => {
    // Mock upload_stream to simulate successful upload
    cloudinary.uploader.upload_stream.mockImplementation((options, callback) => {
      callback(null, mockUploadResult);
      return {
        end: jest.fn(), // Mock the end function
      };
    });

    const result = await uploadImageClodinary(mockImage);

    // Check that upload_stream was called with correct options
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      { folder: 'binkeyit' },
      expect.any(Function)
    );

    // Verify the returned result
    expect(result).toEqual(mockUploadResult);
  });

  it('should throw an error if upload_stream fails', async () => {
    const mockError = new Error('Upload failed');

    // Mock upload_stream to simulate an error
    cloudinary.uploader.upload_stream.mockImplementation((options, callback) => {
      callback(mockError, null);
      return {
        end: jest.fn(),
      };
    });

    await expect(uploadImageClodinary(mockImage)).rejects.toThrow('Upload failed');
  });

  it('should handle cases where image.buffer is not provided', async () => {
    const mockImageWithoutBuffer = {
      arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    };

    cloudinary.uploader.upload_stream.mockImplementation((options, callback) => {
      callback(null, mockUploadResult);
      return {
        end: jest.fn(),
      };
    });

    const result = await uploadImageClodinary(mockImageWithoutBuffer);

    expect(result).toEqual(mockUploadResult);
    expect(mockImageWithoutBuffer.arrayBuffer).toHaveBeenCalled();
  });
});
