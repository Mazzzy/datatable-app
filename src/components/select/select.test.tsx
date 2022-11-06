import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './index';

describe('Component: Select', () => {
  const optionsData = [
    { name: 'albumId', value: 'albumId' },
    { name: 'title', value: 'title' },
    { name: 'url', value: 'url' }
  ];

  beforeEach(() => {
    render(<Select options={optionsData} />);
  });

  test('should have Select', () => {
    const selectContainer = document.querySelector('.select-wrapper');
    expect(selectContainer).toBeInTheDocument();
  });
});

describe('Component: Select with Props', () => {
  const mockOnChange = jest.fn();
  const selectName = 'selectname';
  const selectValue = 'title';
  const selectClassName = 'sampleclass';
  const optionsData = [
    { name: 'albumId', value: 'albumId' },
    { name: 'title', value: 'title' },
    { name: 'url', value: 'url' }
  ];

  beforeEach(() => {
    render(
      <Select
        name={selectName}
        value={selectValue}
        className={selectClassName}
        options={optionsData}
        onChange={mockOnChange}
      />
    );
  });

  test('should have name', () => {
    const selectElement = document.querySelector('select')!;
    expect(selectElement.name).toBe(selectName);
  });

  test('should have value', () => {
    const selectElement = document.querySelector('select')!;
    expect(selectElement.value).toBe(selectValue);
  });

  test('should have classname', () => {
    const classSelectInverseComponent = document.querySelector('.sampleclass');
    if (classSelectInverseComponent)
      expect(classSelectInverseComponent.classList.contains('sampleclass')).toBeTruthy();
  });

  test('should display the correct number of options', () => {
    const selectOptions = screen.getAllByRole('option');
    expect(selectOptions.length).toBe(optionsData.length);
  });

  test('should correctly set default(first) option', () => {
    const optionElement = screen.getByRole('option', { name: 'title' }) as HTMLOptionElement;
    expect(optionElement.selected).toBeTruthy();
  });

  test('should allow user to change option and call onChange', async () => {
    const optionElement = screen.getByRole('option', { name: 'url' }) as HTMLOptionElement;
    userEvent.selectOptions(
      // Find the select element, like a real user would.
      screen.getByRole('combobox'),
      // Find and select the url option, like a real user would.
      optionElement
    );
    await (() => {
      expect(mockOnChange).toHaveBeenCalled();
      expect(optionElement.selected).toBeTruthy();
    });
  });

  test('should focus after click', async () => {
    const handleFocus = jest.fn();
    const selectElement = document.querySelector('select')!;
    fireEvent.click(selectElement);
    await (() => {
      expect(selectElement).toEqual(document.activeElement);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });
});
