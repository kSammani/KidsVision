import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Splash = ({ navigation }) => {
  return (
    <>
      <StatusBar translucent backgroundColor="#D3D3D3" />
      <View style={styles.container}>
        <Text style={styles.txt1}>Level 1</Text>
        <Text style={styles.txt2}>Instructions</Text>
        <Image source={require('../images/instructionL1N/clickFruit.png')} style={styles.img} />
        <Text style={styles.txt3}>Identify the picture & click on the picture name.</Text>
          <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={() => navigation.navigate('Level1N')}>
              <Text style={styles.buttonText}>Play Now</Text>
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
    width: 350,
    height: 350,
    marginBottom: 20
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
  txt1: {
    fontSize: 40,
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    marginTop : 20,
  },
  txt2: {
    fontSize: 30,
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    marginTop : 20,
    marginBottom : 20,
  },
  txt3: {
    fontSize: 20,
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    // marginTop : 20,
    padding : 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'DreamingOutloudPro',
    color: '#fff'
  },
});
