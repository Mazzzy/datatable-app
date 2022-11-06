import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from './index';

describe('View: Filter', () => {
  beforeEach(() => {
    render(<Filter />);
  });

  test('should have Filter', () => {
    const filterElement = document.querySelector('.filter-container');
    expect(filterElement).toBeInTheDocument();
  });
});

describe('View: Filter with Props', () => {
  const mockOnTextChange = jest.fn();
  const mockOnSelectChange = jest.fn();
  const filterQueryTxt = 'officia';
  const filterColumn = 'title';
  const filterClassName = 'sampleclass';
  const filterMockColumnOptions = [
    { name: 'albumId', value: 'albumId' },
    { name: 'title', value: 'title' },
    { name: 'url', value: 'url' }
  ];
  beforeEach(() => {
    render(
      <Filter
        queryText={filterQueryTxt}
        columnName={filterColumn}
        selectColumnList={filterMockColumnOptions}
        className={filterClassName}
        handleTextChange={mockOnTextChange}
        handleSelectChange={mockOnSelectChange}
      />
    );
  });

  test('should have queryText as input text value', () => {
    const txtElement = document.querySelector('input')!;
    expect(txtElement.value).toBe(filterQueryTxt);
  });

  test('should have columnName as selectbox value', () => {
    const selectElement = document.querySelector('select')!;
    expect(selectElement.value).toBe(filterColumn);
  });

  test('should have classname', () => {
    const classFilterInverseComponent = document.querySelector('.sampleclass');
    if (classFilterInverseComponent)
      expect(classFilterInverseComponent.classList.contains('sampleclass')).toBeTruthy();
  });

  test('should call onChange on value change of textbox', async () => {
    // Typescript's non-null assertion "!" used to make sure that the value is never null
    const textbox = document.querySelector('input')!;
    fireEvent.change(textbox);
    await (() => {
      expect(mockOnTextChange).toHaveBeenCalled();
      expect(textbox.value).toBe(filterQueryTxt);
    });
  });

  test('should display the correct number of passed filter options in selectbox', () => {
    const selectOptions = screen.getAllByRole('option');
    expect(selectOptions.length).toBe(filterMockColumnOptions.length);
  });

  test('should correctly set default(first) option in selectbox', () => {
    const optionElement = screen.getByRole('option', { name: 'title' }) as HTMLOptionElement;
    expect(optionElement.selected).toBeTruthy();
  });

  test('should allow user to change option in filter by column selectbox and call onChange', async () => {
    const optionElement = screen.getByRole('option', { name: 'url' }) as HTMLOptionElement;
    userEvent.selectOptions(
      // Find the select element, like a real user would.
      screen.getByRole('combobox'),
      // Find and select the url option, like a real user would.
      optionElement
    );
    await (() => {
      expect(mockOnSelectChange).toHaveBeenCalled();
      expect(optionElement.selected).toBeTruthy();
    });
  });
});
