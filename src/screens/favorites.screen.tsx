import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useFavoritesStore} from '../stores/useFavorites';
import {Show} from '../models/show';
import {parsePremieredDate} from '../utils/moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const Favorites = ({navigation}) => {
  const {favorites} = useFavoritesStore();

  const renderItem = ({item}: {item: Show}) => {
    const handleOnTap = () => {
      navigation.navigate('Detail', {item, fromFavorites: true});
    };

    return (
      <TouchableOpacity style={style.card} onPress={handleOnTap}>
        <Image
          style={style.image}
          source={{
            uri: item.image
              ? item.image.medium
              : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
          }}
          alt="image"
        />
        <View style={style.cardDetails}>
          <View style={style.row}>
            <MaterialCommunityIcons name="star" color="#FFD700" size={25} />
            <Text>{item.rating.average} </Text>
          </View>
          <Text style={style.title}>{`${item.name}`}</Text>
          <Text>{parsePremieredDate(item.premiered)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={favorites.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={style.cardContainer}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    height: width * 0.6,
    width: width * 0.45,
  },
  card: {
    flexDirection: 'column',
    maxWidth: width * 0.4,
    marginBottom: 50,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  cardContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    gap: 10,
  },
  cardDetails: {
    flex: 1,
    flexDirection: 'column',
    // margin: 5,
  },
});

export default Favorites;
