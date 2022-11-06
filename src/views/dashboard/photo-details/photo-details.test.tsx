import { render, fireEvent } from '@testing-library/react';

import PhotoDetails from './index';

const mockPhotoDetails = {
  id: 1,
  albumId: 2,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952'
};

describe('View: PhotoDetails', () => {
  beforeEach(() => {
    render(<PhotoDetails photoDetails={mockPhotoDetails} />);
  });

  test('should have PhotoDetails', () => {
    const photoDetailsContainer = document.querySelector('.photo-details-container');
    expect(photoDetailsContainer).toBeInTheDocument();
  });
});

describe('View: PhotoDetails with Props', () => {
  const mockCloseView = jest.fn();
  const sampleClassName = 'sampleclass';

  beforeEach(() => {
    render(
      <PhotoDetails
        photoDetails={mockPhotoDetails}
        className={sampleClassName}
        closePhotoDetailsView={mockCloseView}
      />
    );
  });

  test('should have classname', () => {
    const classSidebarInverseComponent = document.querySelector('.sampleclass');
    if (classSidebarInverseComponent)
      expect(classSidebarInverseComponent.classList.contains(sampleClassName)).toBeTruthy();
  });

  test('should call closeView on click of cross icon (close option)', async () => {
    const sidebarComponent = document.querySelector('.sidebar-container');
    if (sidebarComponent) {
      const closeContainer = sidebarComponent.querySelector('.close') as HTMLSpanElement;
      fireEvent.click(closeContainer);
      await (() => {
        expect(mockCloseView).toHaveBeenCalled();
      });
    }
  });
});

describe('View: PhotoDetails in respective components', () => {
  test('should have photo info components', () => {
    const component = render(<PhotoDetails photoDetails={mockPhotoDetails} />);
    const photoInfoContainer = document.querySelector('.photo-info');
    expect(photoInfoContainer).toBeInTheDocument();

    const photoIdElement = component.getByText(RegExp(String(mockPhotoDetails.id), 'i'));
    expect(photoIdElement).toBeInTheDocument();
    expect(photoIdElement.textContent).toBe(String(mockPhotoDetails.id));

    const albumIdElement = component.getByText(RegExp(String(mockPhotoDetails.albumId), 'i'));
    expect(albumIdElement).toBeInTheDocument();
    expect(albumIdElement.textContent).toBe(String(mockPhotoDetails.albumId));

    const titleElement = component.getByText(RegExp(mockPhotoDetails.title, 'i'));
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe(mockPhotoDetails.title);

    const thumbnailElement: HTMLImageElement | null = document.querySelector('.info-thumbnail');
    expect(thumbnailElement).toBeInTheDocument();
    if (thumbnailElement) expect(thumbnailElement.src).toBe(mockPhotoDetails.thumbnailUrl);
  });
});
