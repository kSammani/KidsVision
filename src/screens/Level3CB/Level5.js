import React from 'react';
import MainComp from './MainComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Level5 = ({ navigation }) => {
  const saveValue = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem(
        'L3CB-L5',
        value.toString(),
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainComp imageSource={require('../../images/level3CB/ish5.png')} pathValue={saveValue} navigation={navigation} nextScreen="FinalScore" />
  );
};

export default Level5;