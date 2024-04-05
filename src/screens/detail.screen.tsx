import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {calculateRunTime, parsePremieredDate} from '../utils/moment';
import {summaryParser} from '../utils/summary';
import axios from 'axios';
import {url} from '../utils/constants';
import {Episode, ParsedEpisodes} from '../models/episode';
import {Show} from '../models/show';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFavoritesStore} from '../stores/useFavorites';
import DetailProperty from '../components/detail-property';
import DetailImage from '../components/detail-image';
import containerStyles from '../styles/container.styles';

const Detail = ({route, navigation}: any) => {
  const {item} = route.params;
  const [seasons, setSeasons] = useState<ParsedEpisodes[]>([]);
  const {checkIsInFavorites, onAddFavorite, onRemoveFavorite} =
    useFavoritesStore();

  useEffect(() => {
    navigation.setOptions({title: ''});
    const getEpisodes = async () => {
      const data = await axios.get(`${url}/shows/${item.id}/episodes`);
      const reduced = data.data.reduce((prev: any, current: Episode) => {
        prev[`season ${current.season}`] =
          prev[`season ${current.season}`] || [];
        prev[`season ${current.season}`].push(current);
        return prev;
      }, {});
      let stack = [];
      for (const [key, value] of Object.entries(reduced)) {
        stack.push({name: key, episodes: value as Episode[]});
      }
      setSeasons(stack);
    };

    getEpisodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showEpisode = (episode: Episode) => {
    navigation.navigate('Episode', {item: episode});
  };

  const handleFavoriteTap = (show: Show) => {
    if (checkIsInFavorites(show.id)) {
      onRemoveFavorite(show.id);
    } else {
      onAddFavorite(show);
    }
  };

  return (
    <View style={containerStyles.mainContainer}>
      <DetailImage image={item.image.original} />
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.headerRow}>
            <Text style={style.name}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleFavoriteTap(item)}>
              <MaterialCommunityIcons
                name={checkIsInFavorites(item.id) ? 'heart' : 'heart-outline'}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={style.headerDetails}>
            <View style={style.statusCard}>
              <DetailProperty label="Status: " value={`${item.status} `} />
              <DetailProperty
                label="Duration: "
                value={`${calculateRunTime(item)} on air. `}
              />
              <DetailProperty
                label="Premiered date: "
                value={`${parsePremieredDate(item.premiered)} `}
              />
            </View>
            <View style={style.genreContainer}>
              {item.genres.map((genre: string, index: number) => (
                <Text key={index} style={style.genreChip}>
                  {genre}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <ScrollView style={style.scroll}>
          <View>
            <DetailProperty
              label="Network/countr: "
              value={`${item.network.name}/${item.network.country.name}`}
            />

            <View style={{height: 10}} />
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
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flex: 0.5,
  },
  name: {
    fontWeight: '800',
    fontSize: 25,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 20,
    flex: 2,
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
  headerDetails: {
    flexDirection: 'column',
    flex: 0.5,
    gap: 10,
  },
  genreContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  genreChip: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderColor: '#ddd',
    textAlign: 'center',
    marginBottom: 5,
    backgroundColor: 'white',
  },
  statusText: {
    fontWeight: 'bold',
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
  summaryTitle: {
    fontStyle: 'italic',
    fontWeight: '700',
  },
  summary: {
    textAlign: 'justify',
    fontSize: 15,
  },
});

export default Detail;
