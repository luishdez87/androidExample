import {StyleSheet} from 'react-native';

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
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
  },
  rowImage: {
    height: 80,
    width: 60,
  },
});

export default style;
