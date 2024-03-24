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
import {parsePremieredDate} from '../utils/moment';
import {usePeople} from '../hooks/usePeople';
import {Person} from '../models/person';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const People = ({navigation}: any) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const {people, query, setQuery, getPeople} = usePeople(page);

  const renderItem = ({item}: {item: Person}) => {
    const goToPersonDetail = () => {
      navigation.navigate('person-detail', {item});
    };

    return (
      <TouchableOpacity style={style.itemRow} onPress={goToPersonDetail}>
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
          {item.birthday && (
            <View style={style.row}>
              <MaterialCommunityIcons name="cake-variant-outline" size={20} />
              <Text>{parsePremieredDate(item.birthday)}</Text>
            </View>
          )}
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
    let cancel;
    setRefreshing(true);
    getPeople(page, cancel);
    setRefreshing(false);
  };

  return (
    <View>
      <TextInput placeholder="Buscar" value={query} onChangeText={setQuery} />
      {people.length > 0 ? (
        <FlatList
          data={people}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={loader}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      ) : (
        <Text>No people found</Text>
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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

export default People;
