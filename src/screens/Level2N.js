import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const IMAGE_WIDTH = 100;

const AnimatedImageLoop = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');
  const [done, setDone] = useState(false);
  const leftToRightValue = new Animated.Value(-IMAGE_WIDTH);
  const rightToLeftValue = new Animated.Value(width);

  const topToBottomValue = new Animated.Value(-IMAGE_WIDTH);
  const bottomToTopValue = new Animated.Value(height + IMAGE_WIDTH);

  const animMoveHor = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(leftToRightValue, {
          toValue: width,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(rightToLeftValue, {
          toValue: -IMAGE_WIDTH,
          duration: 5000,
          useNativeDriver: false,
        })
      ]),
      { iterations: -1 }
    ).start();
  };

  const animMoveVer = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(topToBottomValue, {
          toValue: height + IMAGE_WIDTH,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(bottomToTopValue, {
          toValue: -IMAGE_WIDTH,
          duration: 5000,
          useNativeDriver: false,
        })
      ]),
      { iterations: -1 }
    ).start();
  };

  useEffect(() => {
    if (data.length === 0) {
      animMoveHor();
    } else if (data.length === 1) {
      animMoveVer();
    } else if (data.length === 2) {
      animMoveHor();
    } else if (data.length === 3) {
      animMoveVer();
    } else if (data.length === 4) {
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i] == 1) {
          count++;
        }
      }
      setResult(`Nearsightedness Level 02 Results ${count} / ${data.length}`)
      setDone(true);
    }
    console.log(data);
  }, [data]);

  const press1 = (value) => {
    setData([...data, value]);
  };

  const press0 = (value) => {
    setData([...data, value]);
  };

  const tryAgain = () => {
    setDone(false);
    setData([]);
  }

  const next = async () => {
    try {
      await AsyncStorage.setItem(
        'L2N',
        result,
      );
      console.log('Result ', result);
      navigation.navigate('FinalScore');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      {done ?
        <View style={styles.finalContainer}>
          <TouchableOpacity onPress={tryAgain}>
            <Text style={styles.Txt}>Try Again?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={next}>
            <Text style={styles.Txt}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate('First') }}>
            <Text style={styles.Txt}>Home</Text>
          </TouchableOpacity>
        </View>
        :
        <>
          {data.length === 0 && (
            <View style={styles.firstContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: leftToRightValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: rightToLeftValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/1.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {data.length === 1 && (
            <View style={styles.secondContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: topToBottomValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: bottomToTopValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/1.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {data.length === 2 && (
            <View style={styles.firstContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: leftToRightValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/1.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: rightToLeftValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {data.length === 3 && (
            <View style={styles.secondContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: topToBottomValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/1.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: bottomToTopValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAF7F0',
  },
  finalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  secondContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },
  Txt: {
    padding: 20,
    fontFamily: 'DreamingOutloudPro',
    color: '#A36A00',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default AnimatedImageLoop;
