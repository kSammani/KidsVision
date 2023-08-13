import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const IMAGE_WIDTH = 180;

const AnimatedImageLoop = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  // const initialSeconds = 120;
  // const [seconds, setSeconds] = useState(initialSeconds);

  // useEffect(() => {
  //     if (seconds <= 0) {
  //         setDone(true);
  //         return;
  //     }
  //     const timeout = setTimeout(() => {
  //         setSeconds(seconds - 1);
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  // }, [seconds]);

  // const minutes = Math.floor(seconds / 60);
  // const remainingSeconds = seconds % 60;
  // const isUnderOneMinute = minutes < 1;

  const leftToRightValue = new Animated.Value(-IMAGE_WIDTH);
  const rightToLeftValue = new Animated.Value(width);

  const topToBottomValue = new Animated.Value(-IMAGE_WIDTH);
  const bottomToTopValue = new Animated.Value(height);

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
          toValue: height,
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
      animMoveHor();
    } else if (data.length === 5) {
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
    if (progress < 100) {
      setProgress(prevProgress => prevProgress + (100 / 5));
    }
  };

  const press0 = (value) => {
    setData([...data, value]);
    if (progress < 100) {
      setProgress(prevProgress => prevProgress + (100 / 5));
    }
  };

  const tryAgain = () => {
    setDone(false);
    // setSeconds(initialSeconds);
    setData([]);
    setProgress(0);
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
      <View style={{ width: `${progress}%`, height: '5%', backgroundColor: '#000000' }}></View>
      {done ?
        <View style={styles.finalContainer}>
          <Text style={styles.endTxt}>Great Job Kid {'\n'} You've Finished the Game!</Text>
          <View style={styles.finalSubContainer}>
            <Text style={styles.rTxt}>{result}</Text>

            <View style={styles.finalBtnContainer}>
            <View style={styles.touchContainer}>
              <TouchableOpacity style={styles.tch} onPress={next}>
                <Text style={styles.Txt}>Final Score</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.touchContainer}>
            <TouchableOpacity style={styles.tch} onPress={() => { navigation.navigate('First') }}>
              <Text style={styles.Txt}>Home</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
        :
        <>
          {data.length === 0 && (
            <View style={styles.firstContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: leftToRightValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: rightToLeftValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/1.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {data.length === 1 && (
            <View style={styles.secondContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: topToBottomValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: bottomToTopValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/2.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {data.length === 2 && (
            <View style={styles.firstContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: leftToRightValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/3.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: rightToLeftValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {data.length === 3 && (
            <View style={styles.secondContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: topToBottomValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/4.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateY: bottomToTopValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {data.length === 4 && (
            <View style={styles.firstContainer}>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: leftToRightValue }] }]}>
                <TouchableOpacity onPress={() => press0(0)}>
                  <Image source={require('../images/level2N/main.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.imageContainer, { transform: [{ translateX: rightToLeftValue }] }]}>
                <TouchableOpacity onPress={() => press1(1)}>
                  <Image source={require('../images/level2N/5.png')} style={styles.image} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
          {/* <View style={styles.timerContainer}>
            <Text style={[styles.intrTxt, isUnderOneMinute && styles.redTimerTxt]}>Time Remaining {minutes < 10 ? `0${minutes}` : minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</Text>
          </View> */}
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
  timerContainer: {
    paddingBottom: '5%',
  },
  finalSubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalBtnContainer: {
    flexDirection: 'row',
  },
  touchContainer: {
    margin: 10,
    height: 50,
    width: 150,
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
  Txt: {
    fontFamily: 'DreamingOutloudPro',
    color: '#fff',
    fontSize: 25,
  },
  rTxt: {
    textAlign: 'center',
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 25,
  },
  intrTxt: {
    textAlign: 'center',
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 20,
  },
});

export default AnimatedImageLoop;
