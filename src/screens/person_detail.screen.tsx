import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {url} from '../utils/constants';
import {Episode} from '../models/episode';
import {EmbeddedCast} from '../models/embeded_cast';
import { Show } from '../models/show';

const {height, width} = Dimensions.get('screen');

const PersonDetail = ({route, navigation}: any) => {
  const {item} = route.params;
  const [shows, setShows] = useState<EmbeddedCast[]>([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const data = await axios.get(
        `${url}/people/${item.id}/crewcredits?embed=show`,
      );
      setShows(data.data);
    };

    getEpisodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToShow = (show: Show) => {
    navigation.navigate('Detail', {item: show});
  };

  const renderItem = ({item: renderedItem}: {item: EmbeddedCast}) => {
    return (
      <TouchableOpacity
        style={style.card}
        onPress={() => goToShow(renderedItem._embedded.show)}>
        <Image
          source={{uri: renderedItem._embedded.show.image.medium}}
          style={style.showImage}
        />
        <Text style={style.showName}>{renderedItem._embedded.show.name}</Text>
        <Text style={style.showRole}>{renderedItem.type} </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.imageContainer}>
        <Image source={{uri: item.image.original}} style={style.image} />
      </View>
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.headerRow}>
            <Text style={style.name}>{item.name}</Text>
          </View>
        </View>
        <View style={style.listContainer}>
          <FlatList
            data={shows}
            numColumns={2}
            columnWrapperStyle={style.columns}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
        {/* <ScrollView style={style.scroll}>
          <View>
            <Text style={style.summaryTitle}>Summary</Text>
            <Text style={style.summary}>{summaryParser(item.summary)}</Text>
          </View>
          <View>
            {seasons.map((season, i) => (
              <View>
                <Text key={i} style={style.season}>
                  {season.name}
                </Text>
                {season.episodes.map((episode, epIndex) => (
                  <TouchableOpacity
                    style={style.episode}
                    key={`${i}${epIndex}`}
                    onPress={() => showEpisode(episode)}>
                    <Image
                      source={{
                        uri: episode.image
                          ? episode.image.medium
                          : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
                      }}
                      style={style.episodeImage}
                    />
                    <Text>{episode.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView> */}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  header: {
    flex: 0.2,
  },
  name: {
    fontWeight: '800',
    fontSize: 25,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 20,
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
  },
  statusCard: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  scroll: {
    flex: 0.5,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  image: {
    flex: 1,
    height: height * 0.45,
  },

  season: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '700',
  },
  episode: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  episodeImage: {
    height: 100,
    width: 80,
  },
  columns: {
    flex: 0.4,
    justifyContent: 'space-between',
    gap: 10,
  },
  showImage: {
    width: width * 0.4,
    height: width * 0.7,
  },
  listContainer: {
    flex: 1,
  },
  showName: {
    fontWeight: '700',
    fontSize: 18,
  },
  showRole: {
    fontStyle: 'italic',
    color: '#ddd',
  },
  card: {
    flexDirection: 'column',
    maxWidth: width * 0.4,
    marginBottom: 30,
  }
});

export default PersonDetail;
