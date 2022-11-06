import React, { FC, useState, useEffect, FormEvent } from 'react';

import { useFetch, parseLinkHeader, filterDataByColumnNameAndText } from '../../utils';
import { GET_PHOTOS_URL } from '../../config/constants';

import Loading from '../../components/loading';
import Error from '../../components/error';
import Filter from '../../components/filter';
import Table from '../../components/table';
import Pagination from '../../components/pagination';

import './dashboard.scss';

const Dashboard: FC = () => {
  const [currentUrl, setCurrentUrl] = useState(`${GET_PHOTOS_URL}?_page=1&_limit=10`);
  const [parsedLinkHeaders, setParsedLinkHeaders] = useState<any>({});
  const [columnName, setColumnName] = useState('title');
  const [queryText, setQueryText] = useState('');

  const { status, data, error, linkHeaders } = useFetch(currentUrl);

  const theadData = ['id', 'albumId', 'title', 'url', 'thumbnailUrl'];
  const filterSelectColumnList = [
    { name: 'albumId', value: 'albumId' },
    { name: 'title', value: 'title' },
    { name: 'url', value: 'url' },
    { name: 'thumbnailUrl', value: 'thumbnailUrl' }
  ];

  useEffect(() => {
    if (linkHeaders) {
      const updatedParsedLinkHeaders = parseLinkHeader(linkHeaders);
      setParsedLinkHeaders(updatedParsedLinkHeaders);
    }
  }, [linkHeaders]);

  // paginate through link headers (first, prev, next and last )
  const paginate = (direction: string) => {
    if (parsedLinkHeaders[direction]) {
      const currentUrl = parsedLinkHeaders[direction];
      setCurrentUrl(currentUrl);
    }
  };

  // filter related event handlers
  const handleTextChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQueryText(value);
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    if (value) setColumnName(value);
  };

  // render data (photos) in the grid
  const renderPhotos = () => {
    const photoList = filterDataByColumnNameAndText(data, columnName, queryText);
    return (
      <div className="table-container">
        <Table heading="Photos" theadItems={theadData} data={photoList} />
      </div>
    );
  };

  return (
    <div className="dashboard-contents">
      {status === 'error' && (
        <Error text="Error in loading Photos" msg={error?.message} code={error?.code} />
      )}
      {status === 'fetching' && <Loading text="photos" />}
      {status === 'fetched' && (
        <>
          {data.length === 0 && <div> No photos fetched! :( </div>}
          {data.length > 0 && (
            <>
              <Filter
                selectColumnList={filterSelectColumnList}
                queryText={queryText}
                columnName={columnName}
                handleTextChange={handleTextChange}
                handleSelectChange={handleSelectChange}
              />
              {renderPhotos()}
              <Pagination onPaginate={paginate} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
