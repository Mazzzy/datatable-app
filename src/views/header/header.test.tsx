import { render, screen, fireEvent } from '@testing-library/react';
import Header from './index';

describe('View: Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('should have Header', () => {
    const headerContainer = document.querySelector('.header');
    expect(headerContainer).toBeInTheDocument();
  });
});

describe('View: Header with Child elements', () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('should have logo container, image and text', () => {
    const logoContainer = document.querySelector('.logo-container');
    const logoImg = document.querySelector('.logo-img') as HTMLImageElement;
    const childLogoText = screen.getByText(RegExp('Photos list', 'i'));

    expect(logoContainer).toBeInTheDocument();
    expect(logoContainer).toContainElement(childLogoText);
    expect(logoContainer).toContainElement(logoImg);
  });

  test('should have theme switch button and switch theme on click', async () => {
    const themeButton = document.querySelector('.header-btn') as HTMLButtonElement;
    const mockBtnClick = themeButton.click;
    expect(themeButton).toBeInTheDocument();
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem = jest.fn();

    fireEvent.click(themeButton);
    await (() => {
      expect(mockBtnClick).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(themeButton.classList.contains('active')).toBeTruthy();
    });
  });
});
