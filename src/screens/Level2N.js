import React, { useEffect, useState } from 'react';
import { View, Image, Animated, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Timer from './helpComp/Timer';
import Summary from './Summary';
import Constants from './helpComp/Constants';

const { width, height } = Dimensions.get('window');
const IMAGE_WIDTH = 180;

const AnimatedImageLoop = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState('');
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [seconds, setSeconds] = useState(Constants.INITIAL_TIME);

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
      setSeconds(0);
    }
    console.log(data);
  }, [data]);

  const handleDataLengthFive = (currentSeconds) => {
    setTimeSpent(currentSeconds);
  };

  useEffect(() => {
    if (done) {
      setTimeSpent(Constants.INITIAL_TIME - timeSpent);
      setSeconds(0);
    }
  }, [done]);

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

  return (
    <View style={styles.mainContainer}>
      <View style={{ width: `${progress}%`, height: '5%', backgroundColor: '#000000' }}></View>
      {done ?
        <>
          <Summary isOver={true} whichGame='L2N' results={result} playTime={timeSpent} navigation={navigation} nextScreen='FinalScore' />
        </>
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
          <View style={styles.timerContainer}>
            <Timer setDone={setDone} initialSeconds={seconds} updatedTime={setTimeSpent} onDataLengthFive={handleDataLengthFive} data={data} />
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '80%',
    padding: 10
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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  finalSubContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
    padding: 20,
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
  endTxt: {
    textAlign: 'center',
    fontFamily: 'DreamingOutloudPro',
    color: '#000',
    fontSize: 30,
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
  ltView: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
});

export default AnimatedImageLoop;
