import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {summaryParser} from '../utils/summary';

const EpisodeScreen = ({route}: any) => {
  const {item} = route.params;

  return (
    <View style={style.mainContainer}>
      <Image
        style={[style.imageContainer, style.image]}
        source={{
          uri: item.image
            ? item.image.original
            : 'https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg',
        }}
      />
      <View style={style.container}>
        <View style={style.header}>
          <Text style={style.name}>{item.name}</Text>
          <View style={style.seasonEpisodeRow}>
            <Text>
              <Text style={style.bold}>Season: </Text>
              {item.season}
            </Text>
            <Text>
              <Text style={style.bold}>Number: </Text>
              {item.number}
            </Text>
          </View>
        </View>
        <View style={style.scroll}>
          <ScrollView>
            <View>
              <Text style={style.summaryTitle}>Summary</Text>
              <Text style={style.summary}>{summaryParser(item.summary)}</Text>
            </View>
          </ScrollView>
        </View>
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
  image: {
    flex: 1,
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
  header: {
    flex: 0.5,
  },
  scroll: {
    flex: 1,
  },
  name: {
    fontWeight: '800',
    fontSize: 25,
  },
  bold: {
    fontWeight: '800',
  },
  seasonEpisodeRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
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

export default EpisodeScreen;
