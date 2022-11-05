import React, { FC, useState } from 'react';

import { useFetch } from '../../utils';
import { GET_PHOTOS_URL } from '../../config/constants';

import Loading from '../../components/loading';
import Error from '../../components/error';
import Table from '../../components/table';

import './dashboard.scss';

const Dashboard: FC = () => {
  const [page, setPage] = useState(1);
  const { status, data, error } = useFetch(`${GET_PHOTOS_URL}?_page=${page}&_limit=10`);

  const theadData = ['id', 'albumId', 'title', 'url', 'thumbnailUrl'];

  const renderPhotos = () => {
    const photoList = data;
    return <Table heading="Photos" theadItems={theadData} data={photoList} />;
  };

  return (
    <div>
      {status === 'error' && (
        <Error text="Error in loading Photos" msg={error?.message} code={error?.code} />
      )}
      {status === 'fetching' && <Loading text="photos" />}
      {status === 'fetched' && (
        <>
          {data.length === 0 && <div> No photos fetched! :( </div>}
          {renderPhotos()}
        </>
      )}
    </div>
  );
};

export default Dashboard;
