import { render, screen, fireEvent } from '@testing-library/react';
import Table from './index';

const tableMockColumns = [
  { id: 'albumId', label: 'Album Id', numeric: true, width: '10', sortable: false },
  { id: 'id', label: 'Photo Id', numeric: true, width: '10', sortable: true },
  { id: 'title', label: 'Photo Title', numeric: false, width: '30', sortable: true },
  { id: 'url', label: 'Photo URL', numeric: false, width: '20', sortable: true },
  { id: 'thumbnailUrl', label: 'Thumbnail URL', numeric: false, width: '20', sortable: true }
];

const tableMockData = [
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

describe('Component: Table', () => {
  beforeEach(() => {
    render(<Table />);
  });

  test('should have Table', () => {
    const tableComponent = document.querySelector('.table');
    expect(tableComponent).toBeInTheDocument();
  });
});

describe('Component: Table with Props', () => {
  const mockOnRowClick = jest.fn();
  const heading = 'table heading';
  const tableClassName = 'sampleclass';
  const showCheck = true;

  beforeEach(() => {
    render(
      <Table
        heading={heading}
        columns={tableMockColumns}
        data={tableMockData}
        className={tableClassName}
        showCheck={showCheck}
        handleRowClick={mockOnRowClick}
      />
    );
  });

  test('should have heading text', () => {
    const headingTableInverseComponent = screen.getByText(heading);
    expect(headingTableInverseComponent).toBeTruthy();
  });

  test('should have only 1 thead element', () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    if (tableElement) {
      const thead = tableElement.getElementsByTagName('thead');
      expect(thead).toHaveLength(1);
    }
  });

  test('should have number of th tags equal to number of columns +1 (checkbox cell)', () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    if (tableElement) {
      const thElements = tableElement.querySelector('thead')?.querySelectorAll('th');
      if (thElements) {
        const tableMockColumnsLength = tableMockColumns.length + 1; // for checkbox cell
        expect(thElements).toHaveLength(tableMockColumnsLength);
      }
    }
  });

  test('should have each th tag text equal to column name and skip checkbox cell', () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    if (tableElement) {
      const thElements = tableElement.querySelector('thead')?.querySelectorAll('th');
      if (thElements) {
        thElements.forEach((th, colIndex) => {
          const cellContent = th.textContent?.trim();
          if (cellContent && cellContent?.length > 0) {
            // for checkbox cell having empty string
            // -1 to skip checkbox cellIndex
            expect(th.textContent?.trim()).toEqual(tableMockColumns[colIndex - 1].label);
          }
        });
      }
    }
  });

  test('should have only 1 tbody element', () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    if (tableElement) {
      const tbody = tableElement.getElementsByTagName('tbody');
      expect(tbody).toHaveLength(1);
    }
  });

  test('should have number of tr tags equal to number of rows', () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    if (tableElement) {
      const trElements = tableElement.querySelector('tbody')?.querySelectorAll('tr');
      if (trElements) {
        expect(trElements).toHaveLength(tableMockData.length);
      }
    }
  });

  test('should have each td tag text equal to respective (property) content from dataItem that belongs to particular row', () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    if (tableElement) {
      const trElements = tableElement.querySelector('tbody')?.querySelectorAll('tr');
      if (trElements) {
        trElements.forEach((tr, rowIndex) => {
          const tdElements = tr?.querySelectorAll('td');
          const tdItemsLength = Object.keys(tableMockData[0]).length + 1; // for checkbox cell
          expect(tdElements).toHaveLength(tdItemsLength);
          if (tdElements) {
            tdElements.forEach((cell, cellIndex) => {
              const cellContent = cell.textContent?.trim();
              if (cellContent && cellContent?.length > 0) {
                // -1 to skip checkbox cellIndex
                const mockCellValue = String(Object.values(tableMockData[rowIndex])[cellIndex - 1]);
                expect(cell.textContent?.trim()).toEqual(mockCellValue);
              }
            });
          }
        });
      }
    }
  });

  test('should have classname', () => {
    const classTableInverseComponent = document.querySelector('.sampleclass');
    if (classTableInverseComponent)
      expect(classTableInverseComponent.classList.contains(tableClassName)).toBeTruthy();
  });

  test("should sort table by column's button click", async () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    const oneThElement = tableElement.querySelector('thead')?.querySelectorAll('th')[2]; // 2 for column 'id'
    const thButtonElement = oneThElement?.querySelector('button') as HTMLButtonElement;

    const sortedMockData = [
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
    const mockBtnClick = thButtonElement.click;

    fireEvent.click(thButtonElement);

    await (() => {
      expect(mockBtnClick).toHaveBeenCalled();
      // compare rendered contents with mockedSortedData
      const trElements = tableElement.querySelector('tbody')?.querySelectorAll('tr');
      if (trElements) {
        trElements.forEach((tr, rowIndex) => {
          const tdElements = tr?.querySelectorAll('td');
          expect(tdElements).toHaveLength(sortedMockData.length);
          if (tdElements) {
            tdElements.forEach((cell, cellIndex) => {
              const mockCellValue = Object.values(sortedMockData[rowIndex])[cellIndex];
              expect(cell.textContent?.trim()).toEqual(mockCellValue);
            });
          }
        });
      }
    });
  });

  test('should call handleRowClick on click of tableRow', async () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    const oneTrElement = tableElement
      .querySelector('tbody')
      ?.querySelectorAll('tr')[1] as HTMLTableRowElement;

    fireEvent.click(oneTrElement);
    await (() => {
      expect(mockOnRowClick).toHaveBeenCalled();
    });
  });

  test('should call handleCheckedAll on click of checkbox in head', async () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    const firstThElement = tableElement.querySelector('thead')?.querySelectorAll('th')[0];
    const thCheckboxElement = firstThElement?.querySelector('input') as HTMLInputElement;
    const mockCheckBoxClick = thCheckboxElement.click;
    const tbodyCheckBoxElements = tableElement.querySelector('tbody')?.querySelectorAll('input');
    fireEvent.click(thCheckboxElement);
    await (() => {
      expect(mockCheckBoxClick).toHaveBeenCalled();
      expect(thCheckboxElement.checked).toBeTruthy();
      if (tbodyCheckBoxElements) {
        expect(tbodyCheckBoxElements).toHaveLength(tableMockData.length);
      }
    });
  });

  test('should call handleSingleChecked on click of checkbox in particular row', async () => {
    const tableElement = document.querySelector('table') as HTMLTableElement;
    const firstTdElement = tableElement.querySelector('tbody')?.querySelectorAll('td')[0];
    const tdCheckboxElement = firstTdElement?.querySelector('input') as HTMLInputElement;
    const mockCheckBoxClick = tdCheckboxElement.click;
    //fireEvent.click(mockCheckBoxClick);
    await (() => {
      expect(mockCheckBoxClick).toHaveBeenCalled();
      expect(tdCheckboxElement.checked).toBeTruthy();
    });
  });
});
