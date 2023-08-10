import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Splash = ({ navigation }) => {
  return (
    <>
      <StatusBar translucent backgroundColor="#D3D3D3" />
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} style={styles.img} />
          <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('Info')}>
              <Text style={styles.buttonText}>Let's Start</Text>
            </TouchableOpacity>
          </View>
      </View>
    </>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
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
    width: '100%',
    height: '100%',
  },
  touchContainer: {
    height: 60,
    width: 180,
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
