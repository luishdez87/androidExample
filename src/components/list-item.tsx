import React from 'react';
import {Text, View} from 'react-native';
import style from '../styles/text.styles';
import {parsePremieredDate} from '../utils/moment';

type ListItemProps = {
  title: string;
  subtitle: string;
};

const ListItem: React.FC<ListItemProps> = ({title, subtitle}) => (
  <View>
    <Text style={style.listItemTitle}>{title}</Text>
    <Text style={style.listItemSubtitle}>{parsePremieredDate(subtitle)}</Text>
  </View>
);

export default ListItem;
