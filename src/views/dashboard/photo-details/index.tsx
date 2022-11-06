import React, { FC } from 'react';

import { PhotoType } from '../../../types';
import './photo-details.scss';

interface PhotoDetailsProps {
  photoDetails: PhotoType;
  className?: string;
}

const PhotoDetails: FC<PhotoDetailsProps> = ({ photoDetails, className = '' }) => {
  const { id, albumId, title, thumbnailUrl } = photoDetails;
  return (
    <div className={`photo-details-container ${className}`}>
      <ul>
        <li>{id}</li>
        <li>{albumId}</li>
        <li>{title}</li>
        <li>{thumbnailUrl}</li>
      </ul>
    </div>
  );
};

export default PhotoDetails;
