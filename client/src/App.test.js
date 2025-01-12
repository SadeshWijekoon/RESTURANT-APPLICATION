import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test } from '@jest/globals';
import App from './App';

test('renders hello world', () => {
  render(<App />);
  const helloWorldElement = screen.getByText(/hello world/i);
  expect(helloWorldElement).toBeInTheDocument();
});
