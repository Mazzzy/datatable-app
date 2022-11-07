import { render, act, renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../../utils';
import Dashboard from './index';

const sampleUrl = 'https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10';
const mockData = [
  {
    albumId: 1,
    id: 1,
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952'
  },
  {
    albumId: 1,
    id: 2,
    thumbnailUrl: 'https://via.placeholder.com/150/771796',
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796'
  },
  {
    albumId: 1,
    id: 3,
    thumbnailUrl: 'https://via.placeholder.com/150/24f355',
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    url: 'https://via.placeholder.com/600/24f355'
  }
];

const fetchMock: any = (url: string) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        json: () =>
          Promise.resolve({
            data: mockData
          })
      });
    }, 200 + Math.random() * 300)
  );
};

describe('View: Dashboard', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  test('should have Dashboard', () => {
    const dashboardContainer = document.querySelector('.dashboard-contents');
    expect(dashboardContainer).toBeInTheDocument();
  });

  test('should have Table inside Dashboard', async () => {
    const tableElement = document.querySelector('.table');
    await (() => {
      expect(tableElement).toBeInTheDocument();
    });
  });

  test('should have Pagination inside Dashboard', async () => {
    const paginationElement = document.querySelector('.pagination');
    await (() => {
      expect(paginationElement).toBeInTheDocument();
    });
  });

  test('should have PhotoDetails inside Dashboard', async () => {
    const phoeDetailsElement = document.querySelector('.photo-details-container');
    await (() => {
      expect(phoeDetailsElement).toBeInTheDocument();
    });
  });
});

describe('View: Dashboard with API call and render table component', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  test('should have fetching state and loading component', () => {
    const { result } = renderHook(({ url }) => useFetch(url), {
      initialProps: {
        url: sampleUrl
      }
    });
    // for loading state
    expect(result.current?.status).toBe('fetching');

    act(async () => {
      await (() => {
        const component = render(<Dashboard />);
        const loadingElement = component.getByText(RegExp('photos', 'i'));
        expect(loadingElement).toBeInTheDocument();
      });
    });
  });

  test('should have error state and error component', () => {
    const { result } = renderHook(({ url }) => useFetch(url), {
      initialProps: {
        url: sampleUrl
      }
    });

    // for error state
    act(async () => {
      await (() => {
        const component = render(<Dashboard />);
        expect(result.current?.status).toBe('error');
        const errorElement = component.getByText(RegExp('Error in loading Photos', 'i'));
        expect(errorElement).toBeInTheDocument();
      });
    });
  });

  test('should have fetched state and photo list render in table component', () => {
    act(async () => {
      /* fire events that update state */
      const { result } = renderHook(({ url }) => useFetch(url), {
        initialProps: {
          url: sampleUrl
        }
      });
      // for successfull fetched state and data
      const component = render(<Dashboard />);
      await waitFor(
        () => {
          expect(result.current.data.length).toBe(mockData.length);

          const tableElement = document.querySelector('table');
          expect(tableElement).toBeInTheDocument();

          const trElements = tableElement?.querySelectorAll('tr');
          if (trElements) {
            expect(trElements).toHaveLength(mockData.length);
          }

          const charTitleElement = component.getByText(RegExp(mockData[2].title, 'i'));
          expect(charTitleElement).toBeInTheDocument();
          expect(charTitleElement.textContent).toBe(mockData[2].title);
        },
        {
          timeout: 500
        }
      );
    });
  });
});
