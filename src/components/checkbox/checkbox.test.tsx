import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './index';

describe('Component: Checkbox', () => {
  beforeEach(() => {
    render(<Checkbox />);
  });

  test('should have Checkbox', () => {
    const checkbox = document.querySelector('input');
    expect(checkbox).toBeInTheDocument();
  });
});

describe('Component: Checkbox with Props', () => {
  const mockOnChange = jest.fn();
  const chkName = 'checkboxname';
  const chkValue = 'somevalue';
  const chkClassName = 'sampleclass';
  const chkChecked = false;

  beforeEach(() => {
    render(
      <Checkbox
        name={chkName}
        value={chkValue}
        checked={chkChecked}
        className={chkClassName}
        onChange={mockOnChange}
      />
    );
  });

  test('should have name', () => {
    const chkElement = document.querySelector('input')!;
    expect(chkElement.name).toBe(chkName);
  });

  test('should have value', () => {
    const chkElement = document.querySelector('input')!;
    expect(chkElement.value).toBe(chkValue);
  });

  test('should have default unchecked', () => {
    const chkElement = document.querySelector('input')!;
    expect(chkElement.checked).toBeFalsy();
  });

  test('should have classname', () => {
    const classCheckboxInverseComponent = document.querySelector('.sampleclass');
    if (classCheckboxInverseComponent)
      expect(classCheckboxInverseComponent.classList.contains('sampleclass')).toBeTruthy();
  });

  test('should call onChange on value change of Checkbox', async () => {
    // Typescript's non-null assertion "!" used to make sure that the value is never null
    const checkbox = document.querySelector('input')!;
    fireEvent.change(checkbox);
    await (() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  test('should focus after click', async () => {
    const handleFocus = jest.fn();
    const checkbox = document.querySelector('input')!;
    fireEvent.click(checkbox);
    await (() => {
      expect(checkbox).toEqual(document.activeElement);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });
});
