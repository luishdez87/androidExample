import React from 'react';
import {Image} from 'react-native';
import containerStyles from '../styles/container.styles';

type DetailImageProps = {
  image: string;
};

const DetailImage: React.FC<DetailImageProps> = ({image}) => {
  return (
    <Image
      style={[containerStyles.imageContainer, containerStyles.image]}
      source={{
        uri: image
          ? image
          : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
      }}
    />
  );
};

export default DetailImage;
