import React, { FC, useState, useEffect } from 'react';

import { useFetch, parseLinkHeader } from '../../utils';
import { GET_PHOTOS_URL } from '../../config/constants';

import Loading from '../../components/loading';
import Error from '../../components/error';
import Table from '../../components/table';
import Pagination from '../../components/pagination';

import './dashboard.scss';

const Dashboard: FC = () => {
  const [currentUrl, setCurrentUrl] = useState(`${GET_PHOTOS_URL}?_page=1&_limit=10`);
  const [parsedLinkHeaders, setParsedLinkHeaders] = useState<any>({});
  const { status, data, error, linkHeaders } = useFetch(currentUrl);

  const theadData = ['id', 'albumId', 'title', 'url', 'thumbnailUrl'];

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

  const renderPhotos = () => {
    const photoList = data;
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
          {renderPhotos()}
          {data.length > 0 && <Pagination onPaginate={paginate} />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
