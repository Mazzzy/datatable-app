import { render, screen } from '@testing-library/react';
import Loading from './index';

describe('Component: Loading', () => {
  beforeEach(() => {
    render(<Loading />);
  });

  test('should have Loading', () => {
    const errorComp = document.querySelector('.loader');
    expect(errorComp).toBeInTheDocument();
  });
});

describe('Component: Loading with Props', () => {
  const loadingText = 'Loading text';

  beforeEach(() => {
    render(<Loading text={loadingText} />);
  });

  test('should have text', () => {
    // RegExp as loadingText is part of whole string which is inside loader component
    const loadingTextInverseComponent = screen.getByText(RegExp(loadingText, 'i'));
    expect(loadingTextInverseComponent).toBeTruthy();
  });

  test('should have loader icon', () => {
    const loadingIconContainer = document.querySelector('.loading');
    expect(loadingIconContainer).toBeTruthy();
  });
});
