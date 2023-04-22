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
  const [nl1, setNl1] = useState('');

  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const getEnab = async () => {
      try {
        const nm = await AsyncStorage.getItem("name");
        const ag = await AsyncStorage.getItem("age");
        const cb1 = await AsyncStorage.getItem("L1CB");
        const cb2 = await AsyncStorage.getItem("L2CB");
        const n1 = await AsyncStorage.getItem("L1N");
        if (nm !== null && ag !== null && cb1 !== null && cb2 !== null && n1 !== null) {
          setName(nm);
          setAge(ag);
          setCbl1(cb1);
          setCbl2(cb2);
          setNl1(n1);
          // setAnim(true);
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
          <Text style={styles.rTxt}>{nl1}</Text>
          <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('First')}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </>}

      {/* // {anim ?
      //               <>
      //                   <View style={styles.lt}>
      //                       <Lottie
      //                           style={{ height: '100%' }}
      //                           source={require('../anim/celeb2.json')}
      //                           autoPlay
      //                           loop />
      //                       <Lottie
      //                           source={require('../anim/celeb1.json')}
      //                           autoPlay
      //                           loop />
      //                   </View>
      //               </> : <></>} */}
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
});

export default FinalScore;