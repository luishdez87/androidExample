import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home.screen';
import Detail from '../screens/detail.screen';
import EpisodeScreen from '../screens/episode.screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: true,
          headerTransparent: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: props => (
            <TouchableOpacity onPress={goBack}>
              <MaterialCommunityIcons
                name="arrow-left"
                {...props}
                style={style.backButton}
                size={40}
                color={'black'}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Episode"
        component={EpisodeScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: props => (
            <TouchableOpacity onPress={goBack}>
              <MaterialCommunityIcons
                name="arrow-left"
                {...props}
                style={style.backButton}
                size={40}
                color={'black'}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  backButton: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default MainNavigation;
