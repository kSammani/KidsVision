import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Linking, PermissionsAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

import Lottie from 'lottie-react-native';

const FinalScore = ({ navigation }) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isCbAvailable, setIsCbAvailable] = useState(false);
  const [isNsAvailable, setIsNsAvailable] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [cbl1, setCbl1] = useState('');
  const [cbl2, setCbl2] = useState('');
  const [cbl3, setCbl3] = useState('');

  const [nl1, setNl1] = useState('');
  const [nl2, setNl2] = useState('');

  const [sumOfCB, setSumOfCB] = useState(0);
  const [sumOfCBTime, setSumOfCBTime] = useState(0);

  const [sumOfNS, setSumOfNS] = useState(0);
  const [sumOfNSTime, setSumOfNSTime] = useState(0);

  const [cbThreatLevel, setCbThreatLevel] = useState('');
  const [nsThreatLevel, setNsThreatLevel] = useState('');

  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const getEnab = async () => {
      try {
        const nm = await AsyncStorage.getItem("name");
        const ag = await AsyncStorage.getItem("age");

        const cb1 = await AsyncStorage.getItem("L1CB");
        const cb1Time = await AsyncStorage.getItem("L1CBTime");

        const cb2 = await AsyncStorage.getItem("L2CB");
        const cb2Time = await AsyncStorage.getItem("L2CBTime");

        const cb3 = await AsyncStorage.getItem("L3CB");
        const cb3Time = await AsyncStorage.getItem("L3CBTime");

        const n1 = await AsyncStorage.getItem("L1N");
        const n1Time = await AsyncStorage.getItem("L1NTime");

        const n2 = await AsyncStorage.getItem("L2N");
        const n2Time = await AsyncStorage.getItem("L2NTime");

        if ((cb1 !== null && cb2 !== null && cb3 !== null) || (n1 !== null && n2 !== null)) {
          setName(nm);
          setAge(ag);
          setAnim(true);

          if (cb1 !== null) {
            setIsCbAvailable(true);

            setCbl1(`Color Blindness Level 01 Results ${cb1} / 5 ( spent ${cb1Time} seconds )`);
            setCbl2(`Color Blindness Level 02 Results ${cb2} / 5 ( spent ${cb2Time} seconds )`);
            setCbl3(`Color Blindness Level 03 Results ${cb3} / 5 ( spent ${cb3Time} seconds )`);

            setSumOfCB(parseInt(cb1) + parseInt(cb2) + parseInt(cb3));
            setSumOfCBTime(parseInt(cb1Time) + parseInt(cb2Time) + parseInt(cb3Time));

            if (sumOfCB >= 11 && sumOfCBTime < 360) {
              setCbThreatLevel('Vision is very good');
            }
            else if (sumOfCB >= 8 && sumOfCB <= 10 && sumOfCBTime < 360) {
              setCbThreatLevel('Vision has low threat');
            }
            else if (sumOfCB >= 4 && sumOfCB <= 7 && sumOfCBTime < 360) {
              setCbThreatLevel('Vision has medium threat');
            }
            else if (sumOfCB < 4 && sumOfCBTime < 360) {
              setCbThreatLevel('Vision has high threat');
            }
            else if (sumOfCB >= 11 && sumOfCBTime == 360) {
              setCbThreatLevel('Vision has low threat');
            }
            else if (sumOfCB >= 8 && sumOfCB <= 10 && sumOfCBTime == 360) {
              setCbThreatLevel('Vision has medium threat');
            }
            else if (sumOfCB >= 4 && sumOfCB <= 7 && sumOfCBTime == 360) {
              setCbThreatLevel('Vision has high threat');
            }
            else if (sumOfCB < 4 && sumOfCBTime == 360) {
              setCbThreatLevel('Vision has very high threat');
            }
          }

          if (n1 !== null) {
            setIsNsAvailable(true);

            setNl1(`Nearsightedness Level 01 Results ${n1} / 6 ( spent ${n1Time} seconds )`);
            setNl2(`Nearsightedness Level 02 Results ${n2} / 5 ( spent ${n2Time} seconds )`);

            setSumOfNS(parseInt(n1) + parseInt(n2));
            setSumOfNSTime(parseInt(n1Time) + parseInt(n2Time));

            if (sumOfNS >= 8 && sumOfNSTime < 240) {
              setNsThreatLevel('Vision is very good');
            }
            else if (sumOfNS >= 5 && sumOfNS <= 7 && sumOfNSTime < 240) {
              setNsThreatLevel('Vision has low threat');
            }
            else if (sumOfNS >= 3 && sumOfNS <= 5 && sumOfNSTime < 240) {
              setNsThreatLevel('Vision has medium threat');
            }
            else if (sumOfNS < 3 && sumOfNSTime < 240) {
              setNsThreatLevel('Vision has high threat');
            }
            else if (sumOfNS >= 8 && sumOfNSTime == 240) {
              setNsThreatLevel('Vision has low threat');
            }
            else if (sumOfNS >= 5 && sumOfNS <= 7 && sumOfNSTime == 240) {
              setNsThreatLevel('Vision has medium threat');
            }
            else if (sumOfNS >= 3 && sumOfNS <= 5 && sumOfNSTime == 240) {
              setNsThreatLevel('Vision has high threat');
            }
            else if (sumOfNS < 3 && sumOfNSTime == 240) {
              setNsThreatLevel('Vision has very high threat');
            }
          }
        } else {
          setIsAvailable(false);
          console.log("No saved state");
        }
      } catch (error) {
        console.log("Error getting the state", error);
      }
    };
    getEnab();
  });

  const [location, setLocation] = useState({ latitude: null, longitude: null });

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

  const getOpticalsLocations = async () => {
    await requestLocationPermission();
    const urlPha = `geo:${location.latitude},${location.longitude}?q=optical`;
    Linking.openURL(urlPha).then(supported => {
      if (supported) {
        Linking.openURL(urlPha);
      } else {
        console.log("Can't Find, maybe Your don't gave Google Maps in your mobile or Did not enable");
      }
    });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {anim ?
        <>
          <View style={styles.ltView}>
            <Lottie
              style={styles.lottie}
              source={require('../anim/celeb2.json')}
              autoPlay
              loop />
          </View>
        </> : <></>}
      {!isAvailable ?
        <>
          <Text style={styles.threatTxt}>Your Child Must Complete One Game Before Get the Results.</Text>
          <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('First')}>
              <Text style={styles.buttonText}>Start Playing</Text>
            </TouchableOpacity>
          </View>
        </>
        :
        <>
          <View style={styles.txtView}>
            <Text style={styles.Txt}>Name - {name}</Text>
            <Text style={styles.Txt}>Age - {age}</Text>
          </View>
          {isCbAvailable && (
            <>
              <Text style={styles.tlTxt}>Color Blindness Threat Level</Text>
              <Text style={styles.threatTxt}>{cbThreatLevel}</Text>

              <Text style={styles.rTxt}>{cbl1}</Text>
              <Text style={styles.rTxt}>{cbl2}</Text>
              <Text style={styles.rTxt}>{cbl3}</Text>
            </>
          )}
          {isNsAvailable && (
            <>
              <Text style={styles.tlTxt}>Nearsightedness Threat Level</Text>
              <Text style={styles.threatTxt}>{nsThreatLevel}</Text>

              <Text style={styles.rTxt}>{nl1}</Text>
              <Text style={styles.rTxt}>{nl2}</Text>
            </>
          )}
          <View>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('First')}>
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={getEyeCareLocations}>
                <Text style={styles.buttonText}>Find Nearest Eye Care</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={getOpticalsLocations}>
                <Text style={styles.buttonText}>Find Nearest Opticals</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#FAF7F0',
    alignItems: 'center',
    justifyContent: 'center',
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
  rTxt: {
    textAlign: 'center',
    padding: 20,
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 20,
  },
  tlTxt: {
    textAlign: 'center',
    padding: 20,
    fontFamily: 'DreamingOutloudPro',
    color: '#B68D40',
    fontSize: 25,
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

export default FinalScore;