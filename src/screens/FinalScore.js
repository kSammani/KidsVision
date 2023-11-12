import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Lottie from 'lottie-react-native';

const FinalScore = ({ navigation }) => {
  const [available, isAvailable] = useState(false);
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

  const [threatLevel, setThreatLevel] = useState('');

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
        
        if (nm !== null || ag !== null || cb1 !== null || cb2 !== null || n1 !== null || n2 !== null || cb3 !== null) {
          setName(nm);
          setAge(ag);
          setAnim(true);

          setCbl1(`Color Blindness Level 01 Results ${cb1} / 5 ( spent ${cb1Time} seconds )`);
          setCbl2(`Color Blindness Level 02 Results ${cb2} / 5 ( spent ${cb2Time} seconds )`);
          setCbl3(`Color Blindness Level 03 Results ${cb3} / 5 ( spent ${cb3Time} seconds )`);
          setNl1(`Nearsightedness Level 01 Results ${n1} / 6 ( spent ${n1Time} seconds )`);
          setNl2(`Nearsightedness Level 02 Results ${n2} / 5 ( spent ${n2Time} seconds )`);     

          setSumOfCB( parseInt(cb1) + parseInt(cb2) + parseInt(cb3));
          setSumOfCBTime( parseInt(cb1Time) + parseInt(cb2Time) + parseInt(cb3Time));

          setSumOfNS(parseInt(n1) + parseInt(n2));
          setSumOfNSTime(parseInt(n1Time) + parseInt(n2Time));

          if ( sumOfCB >= 11 && sumOfCBTime < 360 ){
            setThreatLevel('Vision is very good');
          }
          else if ( sumOfCB >= 8 && sumOfCB <= 10 && sumOfCBTime < 360 ){
            setThreatLevel('Vision has low threat level');
          }

        } else {
          isAvailable(true);
          console.log("No saved state");
        }
      } catch (error) {
        console.log("Error getting the state", error);
      }
    };
    getEnab();
  });

  return (
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
      {available ?
        <>
          <Text style={styles.Txt}>No Prevoius Saved Data</Text>
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
          <Text style={styles.threatTxt}>{threatLevel}</Text>
          <Text style={styles.rTxt}>{cbl1}</Text>
          <Text style={styles.rTxt}>{cbl2}</Text>
          <Text style={styles.rTxt}>{cbl3}</Text>
          <Text style={styles.rTxt}>{nl1}</Text>
          <Text style={styles.rTxt}>{nl2}</Text>
          <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('First')}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
    fontFamily: 'DreamingOutloudPro',
    color: '#B68D40',
    fontSize: 25,
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