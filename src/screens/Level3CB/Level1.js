import React from 'react';
import MainComp from './MainComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Level1 = ({ navigation }) => {
  const quote = 'Seems like Your child is Correct!';
  const saveValue = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem(
        'L3CB-L1',
        value.toString(),
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainComp imageSource={require('../../images/level3CB/ish1.png')} pathValue={saveValue} quote={quote} navigation={navigation} nextScreen="Level3CBLevel2" />
  );
};

export default Level1;