import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BlockedScreen from '../screens/blocked.screen';
import BottomNavigator from './tabs.navigation';
import EncryptedStorage from 'react-native-encrypted-storage';
import {StackActions, useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkRoute = async () => {
      try {
        const regex = new RegExp('true');
        const blocked = await EncryptedStorage.getItem('blocked');
        if (blocked && regex.test(blocked)) {
          navigation.dispatch(StackActions.replace('blocked-screen'));
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkRoute();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="homepage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="homepage" component={BottomNavigator} />
      <Stack.Screen
        name="blocked-screen"
        component={BlockedScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
