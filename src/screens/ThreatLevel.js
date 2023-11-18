import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Animated, StyleSheet, Linking, PermissionsAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

const ThreatLevel = ({ navigation }) => {
  const [isCbAvailable, setIsCbAvailable] = useState(false);
  const [isNsAvailable, setIsNsAvailable] = useState(false);

  const [cbThreatLevel, setCbThreatLevel] = useState('');
  const [nsThreatLevel, setNsThreatLevel] = useState('');

  const [isAlertNeeded, setIsAlertNeeded] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [cbValue, setCbValue] = useState('');
  const [nsValue, setNsValue] = useState('');

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const getRes = async () => {
      try {
        const cbtl = await AsyncStorage.getItem("CBTL");
        const nstl = await AsyncStorage.getItem("NSTL");

        if (cbtl !== '') {
          setIsCbAvailable(true);
          setCbThreatLevel(cbtl);

          switch (true) {
            case cbtl.includes('low'):
              setCbValue('low');
              break;
            case cbtl.includes('medium'):
              setCbValue('medium');
              break;
            case cbtl.includes('good'):
              setCbValue('good');
              break;
            case cbtl.includes('high'):
              setCbValue('high');
              break;
            default:
              setCbValue('default');
          }
        }

        if (nstl !== '') {
          setIsNsAvailable(true);
          setNsThreatLevel(nstl);

          switch (true) {
            case nstl.includes('low'):
              setNsValue('low');
              break;
            case nstl.includes('medium'):
              setNsValue('medium');
              break;
            case nstl.includes('good'):
              setNsValue('good');
              break;
            case nstl.includes('high'):
              setNsValue('high');
              break;
            default:
              setNsValue('default');
          }
        }

        if (cbtl === 'Vision has medium threat' || cbtl === 'Vision has high threat' || nstl === 'Vision has medium threat' || nstl === 'Vision has high threat') {
          setIsAlertNeeded(true);
          setAlertText('Please Take Your Child to the Eye Doctor!');
        }

      } catch (error) {
        console.log("Error getting the state", error);
      }
    };
    getRes();
  });

  // animation
  const animatedValueCB = useRef(new Animated.Value(0)).current;
  const animatedValueNS = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateToLevel(animatedValueCB, cbValue);
  }, [cbValue]);

  useEffect(() => {
    animateToLevel(animatedValueNS, nsValue);
  }, [nsValue]);

  const animateToLevel = (animatedValue, level) => {
    let toValue = 0;

    switch (level) {
      case 'low':
        toValue = 0.25;
        break;
      case 'medium':
        toValue = 0.5;
        break;
      case 'good':
        toValue = 0.75;
        break;
      case 'high':
        toValue = 1;
        break;
      default:
        break;
    }

    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case 'low':
        return 'yellow';
      case 'medium':
        return 'orange';
      case 'good':
        return 'green';
      case 'high':
        return 'red';
      default:
        return 'gray';
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getLocation();
        } else {
          console.log('Location permission denied');
        }
      } else if (Platform.OS === 'ios') {
        const status = Geolocation.requestAuthorization();
        if (status === 'granted') {
          console.log('Location permission granted');
          getLocation();
        } else {
          console.log('Location permission denied');
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  const getEyeCareLocations = async () => {
    await requestLocationPermission();
    const urlPha = `geo:${location.latitude},${location.longitude}?q=eye+care`;
    Linking.openURL(urlPha).then(supported => {
      if (supported) {
        Linking.openURL(urlPha);
      } else {
        console.log("Can't Find, maybe Your don't gave Google Maps in your mobile or Did not enable");
      }
    });
  };

  return (
    <View style={styles.container}>
      {isCbAvailable && (
        <>
          <Text style={styles.tlTxt}>Color Blindness Test Threat Level</Text>
          <Text style={styles.threatTxt}>{cbThreatLevel}</Text>
          <Animated.View
            style={[
              styles.indicator,
              {
                width: animatedValueCB.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getBackgroundColor(cbValue),
              },
            ]}
          />
        </>
      )}
      <View style={styles.divider}></View>
      {isNsAvailable && (
        <>
          <Text style={styles.tlTxt}>Nearsightedness Test Threat Level</Text>
          <Text style={styles.threatTxt}>{nsThreatLevel}</Text>
          <Animated.View
            style={[
              styles.indicator,
              {
                width: animatedValueNS.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getBackgroundColor(nsValue),
              },
            ]}
          />
        </>
      )}
      <View style={styles.divider}></View>
      {isAlertNeeded && (
        <>
          <Text style={styles.alertTxt}>{alertText}</Text>
          <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={getEyeCareLocations}>
              <Text style={styles.buttonText}>Find Nearest Eye Care</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.touchContainer}>
        <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('First')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FAF7F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 10,
    borderRadius: 5, 
    borderWidth: 1,
    borderColor: 'gray',
  },
  divider: {
    marginVertical: 20,
  },
  txtView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  threatTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 20,
    color: '#B68D40',
    fontSize: 30,
  },
  Txt: {
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 30,
    margin: 10,
  },
  tlTxt: {
    textAlign: 'center',
    padding: 20,
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 25,
  },
  alertTxt: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
    fontSize: 20,
  },
  touchContainer: {
    height: 60,
    width: 330,
    margin: 10,
  },
  tch: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    padding: 10,
    backgroundColor: '#565b64',
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'DreamingOutloudPro',
    color: '#fff'
  },
  ltView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  lottie: {
    flex: 1,
  },
});

export default ThreatLevel;