import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeBiometrics from 'react-native-biometrics';
import {StackActions} from '@react-navigation/native';

const BlockedScreen = ({navigation}) => {
  const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'X'];
  const [pin, setPin] = useState<string>('');
  const [pinToShow, setPinToshow] = useState('');
  const [fingerPrintAvailable, setFingerPrintAvailable] = useState(false);

  useEffect(() => {
    const checkUnlockOptions = async () => {
      await EncryptedStorage.setItem('blocked', 'true');
      const hasFingerPrint = await EncryptedStorage.getItem('use_biometrics');
      if (hasFingerPrint) {
        const regex = new RegExp('true');
        setFingerPrintAvailable(regex.test(hasFingerPrint));
      }
    };

    checkUnlockOptions();
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      if (e.data.action.payload.name === 'homepage') {
        navigation.dispatch(e.data.action);
      }
    });
  }, [navigation]);

  const submitPin = () => {
    const checkPin = async () => {
      const existingPin = await EncryptedStorage.getItem('security_pin');
      if (existingPin === pin) {
        navigation.dispatch(StackActions.replace('homepage'));
      }
    };

    checkPin();
  };

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

  const handleBiometrics = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const checkBiometrics = async () => {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint',
      });
      const {success} = result;
      if (success) {
        await EncryptedStorage.removeItem('blocked');
        navigation.dispatch(StackActions.replace('homepage'));
      }
    };

    checkBiometrics();
  };

  return (
    <View style={style.container}>
      {fingerPrintAvailable ? (
        <View style={style.fingerContainer}>
          <Text style={style.title}>Use biometrics</Text>
          <TouchableOpacity onPress={handleBiometrics}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={100}
              color="#ddd"
            />
          </TouchableOpacity>
          <Text>or</Text>
          <TouchableOpacity
            onPress={() => setFingerPrintAvailable(false)}
            style={[style.saveButton, style.toggleBtn]}>
            <Text>Use PIN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={style.title}>Enter your PIN to unlock</Text>
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
              onPress={submitPin}
              style={style.saveButton}
              disabled={pin.length < 4}>
              <Text>Unlock</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  fingerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 35,
  },
  toggleBtn: {
    minWidth: 200,
  },
});

export default BlockedScreen;
