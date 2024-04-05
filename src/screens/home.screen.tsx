import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useShows} from '../hooks/useShows';
import {Show} from '../models/show';
import containerStyles from '../styles/container.styles';
import RowImage from '../components/row-image';
import ListItem from '../components/list-item';

const Home = ({navigation}: any) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const {shows, query, setQuery, loading, getShows} = useShows(page);

  const renderItem = ({item}: {item: Show}) => {
    const goToDetail = () => {
      navigation.navigate('Detail', {item});
    };

    return (
      <TouchableOpacity style={containerStyles.itemRow} onPress={goToDetail}>
        <RowImage image={item.image.medium} />
        <ListItem title={item.name} subtitle={item.premiered} />
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
      <TextInput
        placeholder="Kitchen...."
        value={query}
        onChangeText={setQuery}
      />
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
  loader: {
    marginVertical: 15,
    alignItems: 'center',
  },
});

export default Home;
