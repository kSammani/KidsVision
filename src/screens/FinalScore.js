import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinalScore = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
          const getEnab = async () => {
            try {
              const nm = await AsyncStorage.getItem("name");
              const ag = await AsyncStorage.getItem("age");
              if (nm !== null && ag !== null) {
                setName(nm);
                setAge(ag);
              } else {
                console.log("No saved state");
              }
            } catch (error) {
              console.log("Error getting the state", error);
            }
          };
          getEnab();
      });

    return(
        <View style={styles.container}>
            <Text style={styles.Txt}>{name}</Text>
            <Text style={styles.Txt}>{age}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2DFBD',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Txt: {
      padding: 20,
      fontFamily: 'Cochin',
      color: '#000',
      fontSize: 20,
    },
  });

export default FinalScore;