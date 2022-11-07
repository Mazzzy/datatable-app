import React, { FC, useState, useEffect, FormEvent } from 'react';

import {
  useFetch,
  parseLinkHeader,
  filterDataByColumnNameAndText,
  isEmptyObject
} from '../../utils';
import { GET_PHOTOS_URL } from '../../config/constants';
import { PhotoType } from '../../types';
import TableColumnsData from './table-columns';

import Loading from '../../components/loading';
import Error from '../../components/error';
import Filter from '../../components/filter';
import Table from '../../components/table';
import Pagination from '../../components/pagination';
import PhotoDetails from './photo-details';

import './dashboard.scss';

const Dashboard: FC = () => {
  // get photos API related
  const initCurrentUrl = `${GET_PHOTOS_URL}?_page=1&_limit=3`;
  const [currentUrl, setCurrentUrl] = useState(initCurrentUrl);
  const [parsedLinkHeaders, setParsedLinkHeaders] = useState<any>({});
  // filter related
  const [columnName, setColumnName] = useState('title');
  const [queryText, setQueryText] = useState('');
  // selected photo item related
  const [selectedPhotoDetails, setSelectedPhotoDetails] = useState<any>({});
  const { status, data, error, linkHeaders } = useFetch(currentUrl);

  // table column data
  // const theadData = ['id', 'albumId', 'title', 'url', 'thumbnailUrl'];
  // filter data
  const filterSelectColumnList = [
    { name: 'id', value: 'id' },
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

  // filter related event handlers
  const handleTextChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQueryText(value);
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    if (value) setColumnName(value);
  };

  // table related event handlers
  const handleRowClick = (photoDetails: PhotoType) => {
    const { title } = photoDetails;
    if (title && title.length > 0) {
      // set photo to view in detailed
      setSelectedPhotoDetails(photoDetails);
    }
  };

  // paginate through link headers (first, prev, next and last )
  const paginate = (direction: string) => {
    if (parsedLinkHeaders[direction]) {
      const currentUrl = parsedLinkHeaders[direction];
      setCurrentUrl(currentUrl);
    }
  };

  // hide photo details container (sidebar)
  const closePhotoDetailsView = () => {
    setSelectedPhotoDetails({});
  };

  // render data (photos) in the grid
  const renderPhotos = () => {
    const photoList = filterDataByColumnNameAndText(data, columnName, queryText);
    return (
      <div className="table-container">
        <Table
          heading="Photos"
          columns={TableColumnsData}
          data={photoList}
          showCheck={true}
          handleRowClick={handleRowClick}
        />
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
              {!isEmptyObject(selectedPhotoDetails) && (
                <PhotoDetails
                  photoDetails={selectedPhotoDetails}
                  closePhotoDetailsView={closePhotoDetailsView}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
