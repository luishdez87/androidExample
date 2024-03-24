import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import People from '../screens/people.screen';
import PersonDetail from '../screens/person_detail.screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const PeopleNavigation = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.dispatch(StackActions.replace('people-home'));
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="people-home" component={People} />
      <Stack.Screen
        name="person-detail"
        component={PersonDetail}
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

export default PeopleNavigation;
