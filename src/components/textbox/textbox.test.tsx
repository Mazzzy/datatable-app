import { render, screen, fireEvent } from '@testing-library/react';
import Textbox from './index';

describe('Component: Textbox', () => {
  beforeEach(() => {
    render(<Textbox />);
  });

  test('should have Textbox', () => {
    const textbox = document.querySelector('input');
    expect(textbox).toBeInTheDocument();
  });
});

describe('Component: Textbox with Props', () => {
  const mockOnChange = jest.fn();
  const txtName = 'textboxname';
  const txtValue = 'somevalue';
  const txtPlaceholder = 'Enter text placeholder';
  const txtClassName = 'sampleclass';

  beforeEach(() => {
    render(
      <Textbox
        name={txtName}
        value={txtValue}
        placeholder={txtPlaceholder}
        className={txtClassName}
        onChange={mockOnChange}
      />
    );
  });

  test('should have name', () => {
    const txtElement = document.querySelector('input')!;
    expect(txtElement.name).toBe(txtName);
  });

  test('should have value', () => {
    const txtElement = document.querySelector('input')!;
    expect(txtElement.value).toBe(txtValue);
  });

  test('should have placeholder', () => {
    const txtElement = document.querySelector('input')!;
    expect(txtElement.placeholder).toBe(txtPlaceholder);
  });

  test('should have classname', () => {
    const classTextboxInverseComponent = document.querySelector('.sampleclass');
    if (classTextboxInverseComponent)
      expect(classTextboxInverseComponent.classList.contains('sampleclass')).toBeTruthy();
  });

  test('should call onChange on value change of textbox', async () => {
    // Typescript's non-null assertion "!" used to make sure that the value is never null
    const textbox = document.querySelector('input')!;
    fireEvent.change(textbox);
    await (() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  test('should focus after click', async () => {
    const handleFocus = jest.fn();
    const textbox = document.querySelector('input')!;
    fireEvent.click(textbox);
    await (() => {
      expect(textbox).toEqual(document.activeElement);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });
});
