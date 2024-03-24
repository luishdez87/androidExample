import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const SWIPE_DISTANCE = Platform.OS === 'android' ? 50 : 100;

const SecureScreen = ({navigation}) => {
  const touchX = useRef(0);
  const touchY = useRef(0);
  const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'X'];
  const [pinExists, setPinExists] = useState(false);
  const [pin, setPin] = useState<string>('');
  const [pinToShow, setPinToshow] = useState('');
  const [swiperStyle, setSwiperStyle] = useState({});
  useEffect(() => {
    const retrievePin = () => {
      EncryptedStorage.getItem('security_pin')
        .then(pin => {
          setPinExists(!!pin);
        })
        .catch(_ => setPinExists(false));
    };

    retrievePin();
  }, []);

  const savePin = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const onlySavePin = async () => {
      await EncryptedStorage.setItem('security_pin', pin);
      setPinExists(true);
    };

    const savePinAndUseCredentials = async () => {
      try {
        const resultObject = await rnBiometrics.simplePrompt({
          promptMessage: 'Confirm fingerprint',
        });
        const {success} = resultObject;
        if (success) {
          await EncryptedStorage.setItem('security_pin', pin);
          await EncryptedStorage.setItem(
            'use_biometrics',
            JSON.stringify(true),
          );
          setPinExists(true);
        } else {
          console.log('user cancelled biometric prompt');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const storePin = async () => {
      try {
        const {biometryType} = await rnBiometrics.isSensorAvailable();
        if (
          biometryType === BiometryTypes.Biometrics ||
          biometryType === BiometryTypes.FaceID
        ) {
          Alert.alert('Do you want to use your biometrics?', '', [
            {
              text: 'Dismiss',
              onPress: onlySavePin,
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: savePinAndUseCredentials,
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    storePin();
  };

  const touchStart = useCallback((e: any) => {
    // this handles a swipe to right event
    const {pageX, pageY} = e.nativeEvent;
    touchX.current = pageX;
    touchY.current = pageY;
  }, []);

  const touchEnd = useCallback(
    (e: any) => {
      const {pageX} = e.nativeEvent;
      const diffX = pageX - touchX.current;
      if (diffX > SWIPE_DISTANCE) {
        // I was trying to set an animation, but it seems very ugly hahaha
        setSwiperStyle({marginLeft: diffX});
        navigation.navigate('blocked-screen');
      }
    },
    [navigation],
  );

  const handlePinChange = (num: number) => {
    let pinCopy = (' ' + pin).slice(1);
    if (isNaN(num)) {
      pinCopy = pinCopy.substring(0, pinCopy.length - 1);
    } else {
      if (pin.length < 4) {
        pinCopy += `${num}`;
      }
    }
    setPin(pinCopy);
    setPinToshow(new Array(pinCopy.length + 1).join('*'));
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        disabled={item === ''}
        style={style.dialItem}
        onPress={() => handlePinChange(item)}>
        {item === 'X' ? (
          <MaterialCommunityIcons
            name="backspace-outline"
            size={30}
            color="#ddd"
          />
        ) : (
          <Text style={item !== '' ? style.dialNumber : null}>{item}</Text>
        )}
      </TouchableOpacity>
    );
  };

  if (pinExists) {
    return (
      <View style={style.container}>
        <Text style={style.title}>Desliza para bloquear</Text>
        <View
          style={[style.slider]}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}>
          <MaterialCommunityIcons
            name="chevron-double-right"
            size={40}
            color="#000"
            style={swiperStyle}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={style.container}>
      <Text style={style.title}>
        Define a PIN and block your app to prevent unwanted intruders
      </Text>
      <View>
        <Text style={style.pinToShow}>{pinToShow}</Text>
        <FlatList
          numColumns={3}
          data={dialPadContent}
          columnWrapperStyle={style.dialpad}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
        <TouchableOpacity
          onPress={savePin}
          style={style.saveButton}
          disabled={pin.length < 4}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dialpad: {
    flex: 0.35,
    justifyContent: 'space-around',
    gap: 10,
    marginTop: 20,
  },
  dialItem: {
    marginBottom: 30,
    borderRadius: 20,
  },
  dialNumber: {
    fontSize: 35,
    backgroundColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
  },
  pinToShow: {
    fontSize: 35,
    textAlign: 'center',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 18,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  slider: {
    borderRadius: 30,
    height: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
    marginTop: 'auto',
    marginBottom: 50,
    justifyContent: 'center',
  },
});

export default SecureScreen;
