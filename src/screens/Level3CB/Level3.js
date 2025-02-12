import React from 'react';
import MainComp from './Level3CB';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Level3 = ({ navigation, route }) => {
  const quote = 'Undeniably Impressive!';
  const startTime = route.params?.startTime;
  const saveValue = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem(
        'L3CB-L3',
        value.toString(),
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainComp  startTime={startTime} imageSource={require('../../images/level3CB/ish3.png')} pathValue={saveValue} quote={quote} navigation={navigation} nextScreen="Level3CBLevel4" />
  );
};

export default Level3;