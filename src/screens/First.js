import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const First = ({ navigation }) => {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const getExistChild = async () => {
      try {
        const exsChild = await AsyncStorage.getItem("existChild");
        const cb1 = await AsyncStorage.getItem("L1CB");
        const cb2 = await AsyncStorage.getItem("L2CB");
        const cb3 = await AsyncStorage.getItem("L3CB");
        const n1 = await AsyncStorage.getItem("L1N");
        const n2 = await AsyncStorage.getItem("L2N");

        if (exsChild != null && ((cb1 !== null && cb2 !== null && cb3 !== null) || (n1 !== null && n2 !== null))) {
          setAvailable(true);
        }
      } catch (error) {
        console.log("Error getting the state", error);
      }
    };
    getExistChild();
  });

  return (
    <View style={styles.container}>
      <View style={styles.touchContainer}>
        <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('InstructionL1CB')}>
          <Text style={styles.buttonText}>Color Blindness Test</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.touchContainer}>
        <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('Instructions')}>
          <Text style={styles.buttonText}>Nearsightedness Test</Text>
        </TouchableOpacity>
      </View>
      {available && (
        <View style={styles.touchContainer}>
          <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('FinalScore')}>
            <Text style={styles.buttonText}>Final Score</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default First;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
    alignItems: 'center',
    justifyContent: 'center',
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