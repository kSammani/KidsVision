import React from 'react';
import { Button, StyleSheet, View, Image,Text, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Info = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  const save = async () => {
    try {
      await AsyncStorage.setItem(
        '1name',
        text,
      );
      await AsyncStorage.setItem(
        'age',
        number,
      );
      navigation.navigate('First');
    } catch (error) {
      // Error saving data
    }
  };
      return (
        <View style={styles.container}>
           <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter Child Name"
              placeholderTextColor='#808080'
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Enter Child Age"
              keyboardType="numeric"
              placeholderTextColor='#808080'
            />
           <View style={styles.buttonContainer}>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={save}>
                <Text style={styles.buttonText}>Go!!!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        );     
}

export default Info; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2DFBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width:330,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    color:'#000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  touchContainer: {
    height: 60,
    width: 330,
    margin: 50,
  },
  tch: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    padding: 10,
    backgroundColor: '#FFB52E',
  },
  buttonText:{
    fontSize:24,
    color:'#ffffff',
  },
  Txt: {
    padding: 20,
    fontFamily: 'Cochin',
    color: '#000',
    fontSize: 20,
  },
});