import React from 'react';
import {Image} from 'react-native';
import containerStyles from '../styles/container.styles';

type RowImageProps = {
  image: string;
};

const RowImage: React.FC<RowImageProps> = ({image}) => (
  <Image
    style={containerStyles.rowImage}
    source={{
      uri: image
        ? image
        : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
    }}
    alt="row image"
  />
);

export default RowImage;
