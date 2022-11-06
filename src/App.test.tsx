import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Datatable App View', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('should have App', () => {
    const appContainer = document.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();
  });

  test('should have Header inside App', () => {
    const headerElement = document.querySelector('.header');
    expect(headerElement).toBeInTheDocument();
  });

  test('should have Dashboard inside App', () => {
    const dashboardElement = document.querySelector('.dashboard-contents');
    expect(dashboardElement).toBeInTheDocument();
  });
});
