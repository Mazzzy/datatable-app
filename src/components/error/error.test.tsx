import { render, screen, fireEvent } from '@testing-library/react';
import Error from './index';

describe('Component: Error', () => {
  beforeEach(() => {
    render(<Error />);
  });

  test('should have Error', () => {
    const errorComp = document.querySelector('.error-container');
    expect(errorComp).toBeInTheDocument();
  });
});

describe('Component: Error with Props', () => {
  const errorText = 'Error text';
  const errorMsg = 'Error msg';
  const errorCode = 404;

  beforeEach(() => {
    render(<Error text={errorText} msg={errorMsg} code={errorCode} />);
  });

  test('should have text', () => {
    const errorTextInverseComponent = screen.getByText(errorText);
    expect(errorTextInverseComponent).toBeTruthy();
  });

  test('should have message', () => {
    const errorMsgInverseComponent = screen.getByText(errorMsg);
    expect(errorMsgInverseComponent).toBeTruthy();
  });

  test('should have code', () => {
    const errorCodeInverseComponent = screen.getByText(errorCode);
    expect(errorCodeInverseComponent).toBeTruthy();
  });

  test('should have error icon', () => {
    const errorIconContainer = document.querySelector('.error');
    expect(errorIconContainer).toBeTruthy();
  });
});
