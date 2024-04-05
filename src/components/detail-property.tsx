import React from 'react';
import {Text} from 'react-native';
import style from '../styles/text.styles';

type DetailPropertyProp = {
  label: string;
  value: string;
};

const DetailProperty: React.FC<DetailPropertyProp> = ({label, value}) => {
  return (
    <Text>
      <Text style={style.statusText}>{label}</Text>
      {value}
    </Text>
  );
};

export default DetailProperty;
