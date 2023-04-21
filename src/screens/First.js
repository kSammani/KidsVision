import React from 'react';
import { Button, StyleSheet, View, Image,Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const First = ({navigation}) => {
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={require('../images/bg/SelectType.png')} resizeMode="cover" style={styles.image}> */}
          <View style={styles.buttonContainer}>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('Level1CB')}>
                <Text style={styles.buttonText}>Color Blindness Test</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('Instructions')}>
                <Text style={styles.buttonText}>Nearsightedness Test</Text>
              </TouchableOpacity>
            </View>
          </View>
        {/* </ImageBackground> */}
      </View>
    );
  }

  export default First;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
    },
    buttonContainer: {
      flexDirection: 'row',
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
      backgroundColor: '#FFB52E',
    },
    buttonText:{
      fontSize:24,
      color:'#fff'
    },
    Txt: {
      padding: 20,
      fontFamily: 'Cochin',
      color: '#A36A00',
      fontSize: 20,
    },
  });