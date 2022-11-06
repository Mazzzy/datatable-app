import { render, screen, fireEvent } from '@testing-library/react';
import { HiOutlineMoon } from 'react-icons/hi';
import Button from './index';

describe('Component: Button', () => {
  beforeEach(() => {
    render(<Button />);
  });

  test('should have Button', () => {
    const button = document.querySelector('button');
    expect(button).toBeInTheDocument();
  });
});

describe('Component: Button with Props', () => {
  const icon = <HiOutlineMoon />;
  const mockOnClick = jest.fn();
  const btnText = 'Demo button';
  const btnClassName = 'sampleclass';

  beforeEach(() => {
    render(<Button text={btnText} icon={icon} className={btnClassName} onClick={mockOnClick} />);
  });

  test('should have text', () => {
    const buttonInverseComponent = screen.getByText(btnText);
    expect(buttonInverseComponent).toBeTruthy();
  });

  test('should have icon', () => {
    const iconButtonInverseComponent = document.querySelector('svg');
    expect(iconButtonInverseComponent).toBeTruthy();
  });

  test('should have classname', () => {
    const classButtonInverseComponent = document.querySelector('.sampleclass');
    if (classButtonInverseComponent)
      expect(classButtonInverseComponent.classList.contains(btnClassName)).toBeTruthy();
  });

  test('should call onClick on click of button', () => {
    // Typescript's non-null assertion "!" used to make sure that the value is never null
    const button = document.querySelector('button')!;
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
