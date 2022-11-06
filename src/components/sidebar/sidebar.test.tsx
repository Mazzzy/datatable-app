import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './index';

describe('Component: Sidebar', () => {
  beforeEach(() => {
    render(<Sidebar />);
  });

  test('should have Sidebar', () => {
    const sidebarContainer = document.querySelector('.sidebar-container');
    expect(sidebarContainer).toBeInTheDocument();
  });
});

describe('Component: Sidebar with Props', () => {
  const mockOnClick = jest.fn();
  const flagShowSidebar = true;
  const sidebarClassName = 'sampleclass';
  const childElemText = 'Sidebar Child';
  const showClassName = 'show';

  beforeEach(() => {
    render(
      <Sidebar
        showSidebar={flagShowSidebar}
        className={sidebarClassName}
        closeSidebar={mockOnClick}>
        <p>{childElemText}</p>
      </Sidebar>
    );
  });

  test('should show sidebar when flag:true', () => {
    const classSidebarInverseComponent = document.querySelector('.sidebar-container');
    if (classSidebarInverseComponent)
      expect(classSidebarInverseComponent.classList.contains(showClassName)).toBeTruthy();
  });

  test('should have classname', () => {
    const classSidebarInverseComponent = document.querySelector('.sampleclass');
    if (classSidebarInverseComponent)
      expect(classSidebarInverseComponent.classList.contains(sidebarClassName)).toBeTruthy();
  });

  test('should render Child component', () => {
    const contentWrapper = document.querySelector('.sidebar-content') as HTMLElement;
    const childElement = screen.getByText(childElemText);
    expect(contentWrapper).toContainElement(childElement);
  });

  test('should have close icon', () => {
    const iconCrossInverseComponent = document.querySelector('svg');
    expect(iconCrossInverseComponent).toBeTruthy();
  });

  test('should hide sidebar on closeSidebar click', async () => {
    const classSidebarInverseComponent = document.querySelector('.sidebar-container');
    const closeContainer = document.querySelector('.close') as HTMLSpanElement;

    fireEvent.click(closeContainer);
    await (() => {
      expect(mockOnClick).toHaveBeenCalled();
      if (classSidebarInverseComponent)
        expect(classSidebarInverseComponent.classList.contains(showClassName)).toBeFalsy();
    });
  });
});
