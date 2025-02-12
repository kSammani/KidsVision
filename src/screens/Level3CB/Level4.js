import React from 'react';
import MainComp from './Level3CB';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Level4 = ({ navigation, route }) => {
  const quote = 'Simply Outstanding!';
  const startTime = route.params?.startTime;
  const saveValue = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem(
        'L3CB-L4',
        value.toString(),
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainComp  startTime={startTime} imageSource={require('../../images/level3CB/ish4.png')} pathValue={saveValue} quote={quote} navigation={navigation} nextScreen="Level3CBLevel5" />
  );
};

export default Level4;