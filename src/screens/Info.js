import React from 'react';
import { StyleSheet, View,Text, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const Info = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  const save = async () => {
    try {
      if (text !== '' && number !== '') {
        await AsyncStorage.setItem(
          'name',
          text,
        );
  
        await AsyncStorage.setItem(
          'age',
          number,
        );
        navigation.navigate('First');
      }else{
        Toast.show('Field Must Not Be Empty', Toast.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };
      return (
        <View style={styles.container}>
           <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter Child Name"
              placeholderTextColor='#9c9c9c'
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Enter Child Age"
              keyboardType="numeric"
              placeholderTextColor='#9c9c9c'
            />
           <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={save}>
              <Text style={styles.buttonText}>Go!!!</Text>
            </TouchableOpacity>
          </View>
        </View>
        );     
}

export default Info; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width:330,
    margin: 10,
    fontFamily: 'DreamingOutloudPro',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    color:'#565b64'
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