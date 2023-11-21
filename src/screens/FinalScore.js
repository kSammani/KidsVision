import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

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

  const [cbThreatLevel, setCbThreatLevel] = useState(null);
  const [nsThreatLevel, setNsThreatLevel] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getEnab = async () => {
      if (isFocused) {
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

            if (cb1 !== null) {
              setIsCbAvailable(true);

              setCbl1(`Level 01 : ${cb1} / 5 ( Time spent : ${cb1Time} seconds )`);
              setCbl2(`Level 02 : ${cb2} / 5 ( Time spent : ${cb2Time} seconds )`);
              setCbl3(`Level 03 : ${cb3} / 5 ( Time spent : ${cb3Time} seconds )`);

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

              setNl1(`Level 01 : ${n1} / 6 ( Time spent : ${n1Time} seconds )`);
              setNl2(`Level 02 : ${n2} / 5 ( Time spent : ${n2Time} seconds )`);

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
      }
    };
    getEnab();
  }, [isFocused]);

  useEffect(() => {
    const removeTLData = async () => {
      if (isFocused) {
        try {
          // keys to remove
          const keysToRemove = ['CBTL', 'NSTL'];

          // wait for all removals to complete
          await Promise.all(
            keysToRemove.map(async (key) => {
              await AsyncStorage.removeItem(key);
              console.log(`${key} removed successfully`);
            })
          );
          console.log('Saved data removed successfully');
        } catch (error) {
          console.error('Error removing values:', error);
        }
      }
    };
    removeTLData();
  }, [isFocused]);

  const next = async () => {
    try {
      if (cbThreatLevel != null) {
        await AsyncStorage.setItem(
          'CBTL',
          cbThreatLevel,
        );
      }
      if (nsThreatLevel != null) {
        await AsyncStorage.setItem(
          'NSTL',
          nsThreatLevel,
        );
      }
      navigation.navigate('ThreatLevel');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
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
              <Text style={styles.tlTxt}>Color Blindness Test Results</Text>
              <Text style={styles.rTxt}>{cbl1}</Text>
              <Text style={styles.rTxt}>{cbl2}</Text>
              <Text style={styles.rTxt}>{cbl3}</Text>
            </>
          )}

          {isNsAvailable && (
            <>
              <Text style={styles.tlTxt}>Nearsightedness Test Results</Text>
              <Text style={styles.rTxt}>{nl1}</Text>
              <Text style={styles.rTxt}>{nl2}</Text>
            </>
          )}
          <View>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={next}>
                <Text style={styles.buttonText}>Threat Level</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>}
    </View>
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
  Txt: {
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 30,
    margin: 10,
  },
  rTxt: {
    textAlign: 'center',
    padding: 10,
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 20,
  },
  threatTxt: {
    textAlign: 'center',
    padding: 10,
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 20,
  },
  tlTxt: {
    textAlign: 'center',
    padding: 10,
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
  }
});

export default FinalScore;