import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useShows} from '../hooks/useShows';
import {Show} from '../models/show';
import {parsePremieredDate} from '../utils/moment';

const Home = ({navigation}: any) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const {shows, query, setQuery, loading, getShows} = useShows(page);

  const renderItem = ({item}: {item: Show}) => {
    const goToDetail = () => {
      navigation.navigate('Detail', {item});
    };

    return (
      <TouchableOpacity style={style.itemRow} onPress={goToDetail}>
        <Image
          style={style.itemImage}
          source={{
            uri: item.image
              ? item.image.medium
              : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
          }}
          alt="image"
        />
        <View>
          <Text style={style.title}>{`${item.name}`}</Text>
          <Text>{parsePremieredDate(item.premiered)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loader = () => {
    return (
      <View style={style.loader}>
        <ActivityIndicator size="large" color="#ddd" />
      </View>
    );
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const onRefresh = () => {
    setPage(1);
    setQuery('');
    let cancel;
    setRefreshing(true);
    getShows(1, cancel);
    setRefreshing(false);
  };

  return (
    <View>
      <TextInput placeholder="Buscar" value={query} onChangeText={setQuery} />
      {loading ? (
        <ActivityIndicator size="large" color="aaa" />
      ) : shows.length > 0 ? (
        <FlatList
          data={shows}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={loader}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      ) : (
        <Text>No series found</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
  },
  itemImage: {
    height: 80,
    width: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginVertical: 15,
    alignItems: 'center',
  },
});

export default Home;
