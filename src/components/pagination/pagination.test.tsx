import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './index';

describe('Component: Pagination', () => {
  beforeEach(() => {
    render(<Pagination onPaginate={(btnText: string) => console.log(btnText)} />);
  });

  test('should have Pagination', () => {
    const paginationContainer = document.querySelector('.pagination');
    expect(paginationContainer).toBeInTheDocument();
  });
});

describe('Component: Pagination with Props', () => {
  const mockOnClick = jest.fn();
  const paginationClassName = 'sampleclass';

  beforeEach(() => {
    render(<Pagination className={paginationClassName} onPaginate={mockOnClick} />);
  });

  test('should have classname', () => {
    const classPaginationInverseComponent = document.querySelector('.sampleclass');
    if (classPaginationInverseComponent)
      expect(classPaginationInverseComponent.classList.contains(paginationClassName)).toBeTruthy();
  });

  test('should paginate to respective direction on button click', async () => {
    const nextButton = screen.getByText('next') as HTMLButtonElement;
    fireEvent.click(nextButton);
    await (() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });
});
