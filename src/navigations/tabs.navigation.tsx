import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainNavigation from './main.navigation';
import Favorites from '../screens/favorites.screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PeopleNavigation from './people.navigation';
import SecureScreen from '../screens/secure.screen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="main"
        component={MainNavigation}
        options={{
          tabBarLabel: 'Series',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="movie" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="people"
        component={PeopleNavigation}
        options={{
          tabBarLabel: 'People',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          title: 'Favorites',
          headerTitleAlign: 'center',
          headerShown: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Secure"
        component={SecureScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Security',
          title: 'Security',
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="lock" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
