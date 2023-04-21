import React from 'react';
import { Button, StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Splash = ({navigation}) => {
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={require('../images/bg/splash_bg.png')} resizeMode="cover" style={styles.image}> */}
          <Image source= {require('../images/logo.png')} style={styles.img}/>
          <View style={styles.button}></View>
          <View style={styles.buttonContainer}>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('Info')}>
                <Text style={styles.buttonText}>Let's Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        {/* </ImageBackground> */}
      </View>
    );
  }

  export default Splash;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FBE7C6',
      alignItems: 'center',
      justifyContent: 'center',
    },

    img: {
        width: 330,
        height: 330,
        marginBottom: 80
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
