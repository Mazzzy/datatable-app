import React, { FC } from 'react';

import { isEmptyObject } from '../../../utils';
import { PhotoType } from '../../../types';

import Button from '../../../components/button';
import Sidebar from '../../../components/sidebar';

import './photo-details.scss';

interface PhotoDetailsProps {
  photoDetails: PhotoType;
  className?: string;
  closePhotoDetailsView?: () => void;
}

const PhotoDetails: FC<PhotoDetailsProps> = ({
  photoDetails,
  className = '',
  closePhotoDetailsView
}) => {
  const renderPhotoDetails = () => {
    const { id, albumId, title, thumbnailUrl } = photoDetails;
    const naText = 'Not Available';
    return (
      <>
        <div className="photo-info">
          <h2 className="info-head">Photo Details</h2>
          <ul>
            <li>
              <span className="info-label">Id</span>
              <span className="info-text">{id ?? naText}</span>
            </li>
            <li>
              <span className="info-label">Album Id</span>
              <span className="info-text">{albumId ?? naText}</span>{' '}
            </li>
            <li>
              <span className="info-label">Title</span>
              <span className="info-text">{title ?? naText}</span>
            </li>
            <li>
              <span className="info-label">Thumbnail</span>
              <img
                src={thumbnailUrl}
                alt={`thumbnail-for-${title ?? naText}`}
                className="info-thumbnail"
              />
            </li>
            <li>
              <div className="info-footer">
                <Button
                  text="Update"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Update photo item', id);
                  }}
                />
                <Button
                  text="Delete"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Delete photo item', id);
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <Sidebar showSidebar={true} closeSidebar={closePhotoDetailsView}>
      <div className={`photo-details-container ${className}`}>
        {!isEmptyObject(photoDetails) && renderPhotoDetails()}
      </div>
    </Sidebar>
  );
};

export default PhotoDetails;
