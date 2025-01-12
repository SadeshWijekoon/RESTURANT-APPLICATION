import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test } from '@jest/globals';
import App from './App';

test('renders hello world and test', () => {
  render(<App />);
  
  // Check if "hello world" is rendered
  const helloWorldElement = screen.getByText(/hello world/i);
  expect(helloWorldElement).toBeInTheDocument();

  // Check if "test" is rendered
  const testElement = screen.getByText(/test/i);
  expect(testElement).toBeInTheDocument();
});
