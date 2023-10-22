import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Lottie from 'lottie-react-native';

const FinalScore = ({ navigation }) => {
  const [done, setDone] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [cbl1, setCbl1] = useState('');
  const [cbl2, setCbl2] = useState('');
  const [cbl3, setCbl3] = useState('');
  const [nl1, setNl1] = useState('');
  const [nl2, setNl2] = useState('');

  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const getEnab = async () => {
      try {
        const nm = await AsyncStorage.getItem("name");
        const ag = await AsyncStorage.getItem("age");
        const cb1 = await AsyncStorage.getItem("L1CB");
        const cb2 = await AsyncStorage.getItem("L2CB");
        const n1 = await AsyncStorage.getItem("L1N");
        const n2 = await AsyncStorage.getItem("L2N");
        const cb3l1 = await AsyncStorage.getItem("L3CB-L1");
        const cb3l2 = await AsyncStorage.getItem("L3CB-L2");
        const cb3l3 = await AsyncStorage.getItem("L3CB-L3");
        const cb3l4 = await AsyncStorage.getItem("L3CB-L4");
        const cb3l5 = await AsyncStorage.getItem("L3CB-L5");
        if (nm !== null || ag !== null || cb1 !== null || cb2 !== null || n1 !== null || n2 !== null || cb3l1 !== null) {
          setName(nm);
          setAge(ag);
          setCbl1(cb1);
          setCbl2(cb2);
          setNl1(n1);
          setNl2(n2);
          setAnim(true);

          //calculate CBL3 values
          const resultsCBL3 = parseInt(cb3l1) + parseInt(cb3l2) + parseInt(cb3l3) + parseInt(cb3l4) + parseInt(cb3l5);
          setCbl3(`Colorblindness Level 03 Results ${resultsCBL3} / 5`)
        } else {
          setDone(true);
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
      {done ?
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
  Txt: {
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 30,
    margin: 10,
  },
  rTxt: {
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